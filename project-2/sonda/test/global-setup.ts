// Uruchamia na czas testow:
//  1. atrapy API Stripe i Anthropic (zwykly serwer HTTP na localhost),
//  2. prawdziwego Workera przez `wrangler dev` z czysta, lokalna baza D1 (pelna konfiguracja),
//  3. drugiego Workera "na golo": bez migracji, bez Stripe i bez publicznego eksperymentu.
//     To stan, w ktorym wlasciciel jest zaraz po pierwszym wdrozeniu i przed uruchomieniem testu.
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
const BARE_PORT = 8793;

const workers: ChildProcess[] = [];
const dirs: string[] = [];
let mock: Server | undefined;

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
  // Sterowanie atrapa z testow: czy Stripe "dziala na prawdziwych pieniadzach" i co dostal w ostatnim zapytaniu.
  let livemode = false;
  let lastCheckout: Record<string, string> = {};
  const server = createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const send = (status: number, data: unknown) => {
        res.writeHead(status, { 'Content-Type': 'application/json', 'request-id': 'req_mock' });
        res.end(JSON.stringify(data));
      };
      if (req.method === 'POST' && req.url === '/__control/livemode/on') {
        livemode = true;
        return send(200, { livemode });
      }
      if (req.method === 'POST' && req.url === '/__control/livemode/off') {
        livemode = false;
        return send(200, { livemode });
      }
      if (req.method === 'GET' && req.url === '/__control/last-checkout') return send(200, lastCheckout);

      if (req.method === 'POST' && req.url === '/v1/checkout/sessions') {
        const params = new URLSearchParams(body);
        if (params.get('line_items[0][price_data][unit_amount]') === null) return send(400, { error: { message: 'missing amount' } });
        lastCheckout = Object.fromEntries(params.entries());
        sessionCounter += 1;
        const id = `cs_${livemode ? 'live' : 'test'}_mock_${sessionCounter}`;
        return send(200, { id, url: `http://127.0.0.1:${MOCK_PORT}/pay/${id}`, livemode });
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

async function waitForWorker(port: number): Promise<void> {
  for (let attempt = 0; attempt < 120; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/healthz`);
      if (res.ok) return;
    } catch {
      // jeszcze nie wstal
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Worker na porcie ${port} nie wystartowal w ciagu 60 sekund`);
}

function startWorker(port: number, vars: string[], migrate: boolean): void {
  const stateDir = mkdtempSync(join(tmpdir(), 'sonda-test-'));
  dirs.push(stateDir);
  const varsFile = join(stateDir, 'test.vars');
  writeFileSync(varsFile, vars.join('\n') + '\n');
  if (migrate) {
    const result = spawnSync('npx', ['wrangler', 'd1', 'migrations', 'apply', 'sonda_db', '--local', '--persist-to', stateDir], {
      env: { ...process.env, CI: '1' },
      encoding: 'utf8',
    });
    if (result.status !== 0) throw new Error(`Migracje nie przeszly:\n${result.stdout}\n${result.stderr}`);
  }
  workers.push(
    spawn(
      'npx',
      ['wrangler', 'dev', '--local', '--port', String(port), '--inspector-port', String(port + 1000), '--persist-to', stateDir, '--env-file', varsFile, '--show-interactive-dev-session=false'],
      { env: { ...process.env, CI: '1' }, stdio: 'ignore', detached: true },
    ),
  );
}

export async function setup(): Promise<void> {
  mock = await startMock();

  startWorker(
    WORKER_PORT,
    [
      `ADMIN_TOKEN=${ADMIN_TOKEN}`,
      'VISITOR_SALT=testowa-sol-do-liczenia-odwiedzin',
      // Celowo z ukosnikiem na koncu: najczestsza pomylka przy wklejaniu adresu. Sonda ma sobie z nia poradzic.
      `SITE_URL=http://127.0.0.1:${WORKER_PORT}/`,
      'LIVE_EXPERIMENTS=zamowienia-z-maila',
      'LIVE_PASTE_EXPERIMENTS=zamowienia-z-maila',
      'CONTACT_EMAIL=test@sonda.invalid',
      'STRIPE_SECRET_KEY=sk_test_mock',
      `STRIPE_WEBHOOK_SECRET=${WEBHOOK_SECRET}`,
      `STRIPE_API_BASE=http://127.0.0.1:${MOCK_PORT}`,
      'ANTHROPIC_API_KEY=sk-ant-mock',
      `ANTHROPIC_BASE_URL=http://127.0.0.1:${MOCK_PORT}`,
      'DEMO_DAILY_CAP=50',
    ],
    true,
  );
  startWorker(BARE_PORT, [`ADMIN_TOKEN=${ADMIN_TOKEN}`, 'VISITOR_SALT=testowa-sol-do-liczenia-odwiedzin', `SITE_URL=http://127.0.0.1:${BARE_PORT}`, 'CONTACT_EMAIL=test@sonda.invalid'], false);

  await Promise.all([waitForWorker(WORKER_PORT), waitForWorker(BARE_PORT)]);
  process.env.SONDA_BASE = `http://127.0.0.1:${WORKER_PORT}`;
  process.env.SONDA_BARE = `http://127.0.0.1:${BARE_PORT}`;
  process.env.SONDA_MOCK = `http://127.0.0.1:${MOCK_PORT}`;
}

export async function teardown(): Promise<void> {
  for (const worker of workers) {
    if (!worker.pid) continue;
    try {
      process.kill(-worker.pid, 'SIGTERM');
    } catch {
      // proces juz nie zyje
    }
  }
  await new Promise<void>((resolve) => (mock ? mock.close(() => resolve()) : resolve()));
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
}
