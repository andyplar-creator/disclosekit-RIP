// Minimalna obsluga Stripe przez fetch (bez SDK): jednorazowa platnosc w Stripe Checkout.
// Cena jest podawana w zapytaniu (price_data), wiec nie trzeba nic klikac w panelu Stripe.

export interface CheckoutParams {
  apiBase: string;
  secretKey: string;
  amountGrossMinor: number;
  currency: string;
  productName: string;
  locale: 'pl' | 'en';
  successUrl: string;
  cancelUrl: string;
  experiment: string;
  visitor: string;
  idempotencyKey: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  livemode: boolean;
}

export class StripeError extends Error {
  constructor(
    public status: number,
    public requestId: string,
  ) {
    super(`Stripe ${status} (request-id: ${requestId})`);
  }
}

export async function createCheckoutSession(p: CheckoutParams): Promise<CheckoutSession> {
  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('line_items[0][quantity]', '1');
  form.set('line_items[0][price_data][currency]', p.currency);
  form.set('line_items[0][price_data][unit_amount]', String(p.amountGrossMinor));
  form.set('line_items[0][price_data][product_data][name]', p.productName);
  form.set('success_url', p.successUrl);
  form.set('cancel_url', p.cancelUrl);
  form.set('locale', p.locale);
  form.set('submit_type', 'pay');
  form.set('client_reference_id', `${p.experiment}:${p.visitor}`);
  form.set('metadata[experiment]', p.experiment);
  form.set('metadata[visitor]', p.visitor);
  form.set('payment_intent_data[metadata][experiment]', p.experiment);
  // NIP zbieramy jako zwykle pole tekstowe: nie wymaga wlaczonego Stripe Tax.
  form.set('custom_fields[0][key]', 'nip');
  form.set('custom_fields[0][label][type]', 'custom');
  form.set('custom_fields[0][label][custom]', p.locale === 'pl' ? 'NIP firmy (do faktury)' : 'Company tax ID (for the invoice)');
  form.set('custom_fields[0][type]', 'text');
  form.set('custom_fields[0][optional]', 'true');

  const res = await fetch(`${p.apiBase}/v1/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${p.secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Idempotency-Key': p.idempotencyKey,
    },
    body: form.toString(),
  });
  if (!res.ok) {
    // Tresci bledu nie logujemy ani nie pokazujemy: Stripe odsyla w niej przeslane parametry.
    throw new StripeError(res.status, res.headers.get('request-id') ?? 'unknown');
  }
  const data = (await res.json()) as { id?: string; url?: string; livemode?: boolean };
  if (!data.id || !data.url) throw new StripeError(502, res.headers.get('request-id') ?? 'unknown');
  return { id: data.id, url: data.url, livemode: Boolean(data.livemode) };
}

export interface StripeEvent {
  id: string;
  type: string;
  livemode: boolean;
  data: {
    object: {
      id: string;
      payment_status?: string;
      customer_details?: { email?: string | null } | null;
      metadata?: Record<string, string> | null;
    };
  };
}

export function parseStripeEvent(rawBody: string): StripeEvent | null {
  try {
    const parsed = JSON.parse(rawBody) as Partial<StripeEvent>;
    if (typeof parsed.id !== 'string' || typeof parsed.type !== 'string') return null;
    if (!parsed.data || typeof parsed.data.object?.id !== 'string') return null;
    return parsed as StripeEvent;
  } catch {
    return null;
  }
}

/** Czy klucz Stripe jest kluczem produkcyjnym (prawdziwe pieniadze)? */
export function isLiveKey(secretKey: string | undefined): boolean {
  return Boolean(secretKey && (secretKey.startsWith('sk_live_') || secretKey.startsWith('rk_live_')));
}
