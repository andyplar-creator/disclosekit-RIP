// Wspolne typy Sondy.

export interface Env {
  DB: D1Database;

  // Zmienne jawne (wrangler.jsonc -> vars)
  SITE_URL: string; // publiczny adres bez koncowego ukosnika, np. https://sonda.example.workers.dev
  DEFAULT_EXPERIMENT: string; // slug eksperymentu pokazywanego pod "/"
  LIVE_EXPERIMENTS?: string; // slugi po przecinku: te eksperymenty sa publiczne (status 'live')
  LIVE_PASTE_EXPERIMENTS?: string; // slugi po przecinku: wlacz pole "wklej wlasna wiadomosc" (demo na zywo)
  COMPANY_NAME: string;
  COMPANY_NIP: string;
  COMPANY_CITY: string;
  CONTACT_EMAIL: string;
  DEMO_MODEL?: string; // model Claude dla demo; domyslnie claude-opus-5-5
  DEMO_DAILY_CAP?: string; // maksymalna liczba uruchomien demo na dobe (ochrona kosztow)
  STRIPE_API_BASE?: string; // tylko do testow
  ANTHROPIC_BASE_URL?: string; // tylko do testow

  // Sekrety (wrangler secret put ...)
  ADMIN_TOKEN?: string;
  VISITOR_SALT?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  ANTHROPIC_API_KEY?: string;
}

export type Locale = 'pl' | 'en';
export type ExperimentStatus = 'draft' | 'live' | 'stopped';

export interface Thresholds {
  /** Ponizej tej liczby unikalnych wejsc z reklam nie wydajemy werdyktu. */
  minAdClicks: number;
  /** Twardy koniec testu: po tylu wejsciach z reklam zapada werdykt koncowy. */
  maxAdClicks: number;
  /** Tyle prawdziwie oplaconych pilotazy samo w sobie oznacza GO (0 = nie uzywamy tego progu). */
  goPaidOrders: number;
  /**
   * Tyle zgloszen ocenionych przez wlasciciela jako prawdziwe firmy oznacza GO,
   * pod warunkiem ze co najmniej jedna z nich przyslala dane albo odbyla rozmowe.
   * Sam adres e-mail nigdy nie liczy sie do werdyktu.
   */
  goQualifiedLeads: number;
}

/** Ocena zgloszenia nadawana recznie przez wlasciciela w panelu. */
export type LeadStatus = 'new' | 'qualified' | 'data_received' | 'disqualified';

export interface DemoExample {
  label: string;
  input: string;
  /** Gotowy, recznie przygotowany wynik. Pokazywany bez wolania modelu AI. */
  output: OrderExtraction;
}

export interface DemoConfig {
  kind: 'orders';
  title: string;
  intro: string;
  /** Przyklady z gotowym wynikiem: dzialaja zawsze, bez kosztow i bez cudzych danych. */
  examples: DemoExample[];
  /**
   * Pole "wklej wlasna wiadomosc" (demo na zywo). Domyslnie wylaczone: pokazuje te czesc pracy,
   * ktora umie tez darmowy czat, kosztuje i zaprasza do wklejania cudzych danych osobowych.
   * Dziala tylko, gdy jest tez ustawiony ANTHROPIC_API_KEY.
   */
  livePaste: boolean;
  placeholder: string;
  button: string;
  privacyNote: string;
  /** Opcjonalny link do nagrania prawdziwego panelu (za zgoda klienta). */
  videoUrl?: string;
  videoLabel?: string;
}

export interface OrderItem {
  product: string;
  quantity: number | null;
  unit: string | null;
  note: string | null;
}

export interface OrderExtraction {
  is_order: boolean;
  customer: string | null;
  delivery_date: string | null;
  delivery_address: string | null;
  items: OrderItem[];
  to_clarify: string[];
}

export interface PreorderConfig {
  title: string;
  body: string;
  button: string;
  /** Kwota BRUTTO w groszach / centach, dokladnie tyle pobierze Stripe. */
  amountGrossMinor: number;
  currency: 'pln' | 'usd' | 'eur';
  productName: string;
  guarantee: string;
  /** Tresc obowiazkowego pola wyboru przed platnoscia. */
  termsCheckbox: string;
}

export interface Experiment {
  slug: string;
  status: ExperimentStatus;
  locale: Locale;
  /** Nazwa robocza widoczna tylko w panelu. */
  internalName: string;
  /** Hipoteza, ktora test ma potwierdzic albo obalic (panel). */
  hypothesis: string;
  /** Ostrzezenie z researchu pokazywane w panelu. */
  researchWarning: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; sub: string; primaryCta: string; secondaryCta?: string };
  proof?: { text: string; linkLabel: string; linkUrl: string };
  /** Cytat z referencji. Uzywaj tylko prawdziwych, opublikowanych wypowiedzi. */
  reference?: { quote: string; author: string; source: string };
  demo?: DemoConfig;
  steps: { title: string; body: string }[];
  scope: { doesTitle: string; does: string[]; doesNotTitle: string; doesNot: string[] };
  /** Dla kogo to jest, a dla kogo nie: odsiewa zgloszenia, ktore i tak bys odrzucil. */
  fit?: { forTitle: string; for: string[]; notForTitle: string; notFor: string[] };
  offer: {
    title: string;
    /** Wiersze cennika pokazywane nad formularzem. */
    priceLines: string[];
    priceNote: string;
    /** Formularz zgloszenia firmy: glowny sygnal testu. */
    request: {
      title: string;
      body: string;
      button: string;
      success: string;
      companyLabel: string;
      nipLabel: string;
      erpLabel: string;
      volumeLabel: string;
      phoneLabel: string;
      /** Pole wyboru "chce platny pilotaz na fakture pro forma" (puste = brak pola). */
      invoiceCheckbox: string;
      /** Co sie stanie po wyslaniu formularza (kazdy punkt to obietnica). */
      nextSteps: string[];
    };
    /** Platny pilotaz przez Stripe. Przycisk widac tylko, gdy Stripe jest skonfigurowany. */
    pilot?: PreorderConfig;
  };
  faq: { q: string; a: string }[];
  thresholds: Thresholds;
  /** Frazy do sprawdzenia w Planerze slow kluczowych (R4) i do kampanii, w grupach raportowanych osobno. */
  keywordGroups: { name: string; note: string; phrases: string[] }[];
}

export type EventType = 'view' | 'cta_click' | 'demo_run' | 'lead' | 'checkout_started' | 'paid';

export interface Attribution {
  isAd: boolean;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
}
