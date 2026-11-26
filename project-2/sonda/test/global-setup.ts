// Uruchamia na czas testow:
//  1. atrapy API Stripe i Anthropic (zwykly serwer HTTP na localhost),
//  2. prawdziwego Workera przez `wrangler dev` z czysta, lokalna baza D1.
// Dzieki temu testy przechodza cala sciezke tak, jak przejdzie ja przegladarka klienta.

import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const ADMIN_TOKEN = 'testowe-haslo-do-panelu-1234567890';
export const WEBHOOK_SECRET = 'whsec_test_sonda_secret';
const WORKER_PORT = 8791;
const MOCK_PORT = 8792;

let worker: ChildProcess | undefined;
let mock: Server | undefined;
let stateDir: string | undefined;
let varsFile: string | undefined;

const ORDER_JSON = {
  is_order: true,
  customer: 'Sklep Testowy <script>alert(1)</script>',
  delivery_date: 'jutro',
  delivery_address: null,
  items: [
    { product: 'espresso blend 1kg', quantity: 10, unit: 'szt', note: null },
    { product: 'filtry V60 02', quantity: 2, unit: 'opakowanie', note: null },
  ],
  to_clarify: ['Na którą godzinę ma być dostawa?'],
};

function startMock(): Promise<Server> {
  let sessionCounter = 0;
  const server = createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const send = (status: number, data: unknown) => {
        res.writeHead(status, { 'Content-Type': 'application/json', 'request-id': 'req_mock' });
        res.end(JSON.stringify(data));
      };
      if (req.method === 'POST' && req.url === '/v1/checkout/sessions') {
        const params = new URLSearchParams(body);
        if (params.get('line_items[0][price_data][unit_amount]') === null) return send(400, { error: { message: 'missing amount' } });
        sessionCounter += 1;
        const id = `cs_test_mock_${sessionCounter}`;
        return send(200, {
          id,
          url: `http://127.0.0.1:${MOCK_PORT}/pay/${id}`,
          livemode: false,
          echo: { amount: params.get('line_items[0][price_data][unit_amount]'), currency: params.get('line_items[0][price_data][currency]') },
        });
      }
      if (req.method === 'POST' && req.url?.startsWith('/v1/messages')) {
        const request = JSON.parse(body) as { model: string; messages: { content: unknown }[] };
        const text = JSON.stringify(request.messages);
        if (text.includes('WYMUS_ODMOWE')) {
          return send(200, {
            id: 'msg_mock_refusal',
            type: 'message',
            role: 'assistant',
            model: request.model,
            content: [],
            stop_reason: 'refusal',
            stop_sequence: null,
            usage: { input_tokens: 10, output_tokens: 0 },
          });
        }
        return send(200, {
          id: 'msg_mock',
          type: 'message',
          role: 'assistant',
          model: request.model,
          content: [{ type: 'text', text: JSON.stringify(ORDER_JSON) }],
          stop_reason: 'end_turn',
          stop_sequence: null,
          usage: { input_tokens: 120, output_tokens: 80 },
        });
      }
      send(404, { error: 'not found in mock' });
    });
  });
  return new Promise((resolve) => server.listen(MOCK_PORT, '127.0.0.1', () => resolve(server)));
}

async function waitForWorker(): Promise<void> {
  for (let attempt = 0; attempt < 120; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${WORKER_PORT}/healthz`);
      if (res.ok) return;
    } catch {
      // jeszcze nie wstal
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error('Worker nie wystartowal w ciagu 60 sekund');
}

export async function setup(): Promise<void> {
  mock = await startMock();
  stateDir = mkdtempSync(join(tmpdir(), 'sonda-test-'));
  varsFile = join(stateDir, 'test.vars');
  writeFileSync(
    varsFile,
    [
      `ADMIN_TOKEN=${ADMIN_TOKEN}`,
      'VISITOR_SALT=testowa-sol-do-liczenia-odwiedzin',
      `SITE_URL=http://127.0.0.1:${WORKER_PORT}`,
      'LIVE_EXPERIMENTS=zamowienia-z-maila',
      'LIVE_PASTE_EXPERIMENTS=zamowienia-z-maila',
      'CONTACT_EMAIL=test@sonda.invalid',
      'STRIPE_SECRET_KEY=sk_test_mock',
      `STRIPE_WEBHOOK_SECRET=${WEBHOOK_SECRET}`,
      `STRIPE_API_BASE=http://127.0.0.1:${MOCK_PORT}`,
      'ANTHROPIC_API_KEY=sk-ant-mock',
      `ANTHROPIC_BASE_URL=http://127.0.0.1:${MOCK_PORT}`,
      'DEMO_DAILY_CAP=50',
    ].join('\n') + '\n',
  );

  const migrate = spawnSync('npx', ['wrangler', 'd1', 'migrations', 'apply', 'sonda_db', '--local', '--persist-to', stateDir], {
    env: { ...process.env, CI: '1' },
    encoding: 'utf8',
  });
  if (migrate.status !== 0) throw new Error(`Migracje nie przeszly:\n${migrate.stdout}\n${migrate.stderr}`);

  worker = spawn(
    'npx',
    ['wrangler', 'dev', '--local', '--port', String(WORKER_PORT), '--persist-to', stateDir, '--env-file', varsFile, '--show-interactive-dev-session=false'],
    { env: { ...process.env, CI: '1' }, stdio: 'ignore', detached: true },
  );
  await waitForWorker();
  process.env.SONDA_BASE = `http://127.0.0.1:${WORKER_PORT}`;
  process.env.SONDA_MOCK = `http://127.0.0.1:${MOCK_PORT}`;
}

export async function teardown(): Promise<void> {
  if (worker?.pid) {
    try {
      process.kill(-worker.pid, 'SIGTERM');
    } catch {
      // proces juz nie zyje
    }
  }
  await new Promise<void>((resolve) => (mock ? mock.close(() => resolve()) : resolve()));
  if (stateDir) rmSync(stateDir, { recursive: true, force: true });
}
