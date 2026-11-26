// Strony prawne. To SZKICE opisujace faktyczne dzialanie Sondy, nie porada prawna.
// Wlasciciel czyta je i poprawia przed uruchomieniem testu (patrz DEPLOY.md, bramka "czlowiek sprawdza").

import type { Env, Locale } from '../types';
import { e, page, siteFooter, siteHeader } from '../lib/html';

function shell(env: Env, locale: Locale, nonce: string, title: string, content: string): string {
  const body = `${siteHeader(env)}<main><section class="hero"><div class="wrap">${content}</div></section></main>${siteFooter(env, locale)}`;
  return page({ title: `${title} — PLAR`, locale, body, nonce, noindex: true });
}

export function renderPrivacy(env: Env, locale: Locale, nonce: string): string {
  const company = e(env.COMPANY_NAME);
  const mail = `<a href="mailto:${e(env.CONTACT_EMAIL)}">${e(env.CONTACT_EMAIL)}</a>`;
  if (locale === 'en') {
    return shell(
      env,
      locale,
      nonce,
      'Privacy policy',
      `<h1>Privacy policy</h1>
<p><strong>Controller.</strong> ${company}, ${e(env.COMPANY_CITY)}, tax ID ${e(env.COMPANY_NIP)}. Contact: ${mail}.</p>
<h2>What we collect and why</h2>
<p><strong>Request form.</strong> Your e-mail address, company name, warehouse system, approximate number of orders and, if you provide them, your tax ID and phone number. Purpose: contacting you about the pilot you requested. Legal basis: your consent, which you can withdraw at any time by e-mailing us.</p>
<p><strong>Pre-order.</strong> Payments are handled by Stripe. We receive the payment status, your e-mail address and the tax ID you enter. Purpose: performing the contract and issuing an invoice. We do not see or store card details.</p>
<p><strong>Demo.</strong> Text you paste into the demo is sent to an AI model provider (Anthropic) only to show you the result. We do not store it.</p>
<p><strong>Visit statistics without cookies.</strong> This site sets no cookies for visitors. To count visits we compute a one-day anonymous identifier from your IP address and browser type. The IP address itself is not stored and the identifier changes every day.</p>
<h2>Who processes the data for us</h2>
<p>Cloudflare (hosting and database), Stripe (payments), Anthropic (demo processing). These providers may process data outside the European Economic Area under standard contractual clauses.</p>
<h2>How long</h2>
<p>Request form data: until you withdraw consent, and no longer than 12 months after the test ends. Payment and invoice data: for the period required by tax law.</p>
<h2>Your rights</h2>
<p>You can request access to your data, correction, deletion, restriction of processing and data portability, and you can lodge a complaint with your data protection authority. Write to ${mail}.</p>`,
    );
  }
  return shell(
    env,
    locale,
    nonce,
    'Polityka prywatności',
    `<h1>Polityka prywatności</h1>
<p><strong>Administrator.</strong> ${company}, ${e(env.COMPANY_CITY)}, NIP ${e(env.COMPANY_NIP)}. Kontakt: ${mail}.</p>
<h2>Jakie dane zbieramy i po co</h2>
<p><strong>Formularz zgłoszenia.</strong> Adres e-mail, nazwa firmy, używany program magazynowy, przybliżona liczba zamówień oraz, jeśli je podasz, NIP i telefon. Cel: kontakt w sprawie pilotażu, do którego zgłaszasz firmę. Podstawa: Twoja zgoda (art. 6 ust. 1 lit. a RODO). Zgodę możesz wycofać w każdej chwili, pisząc na adres podany wyżej.</p>
<p><strong>Przedsprzedaż.</strong> Płatności obsługuje Stripe. Dostajemy od Stripe status płatności, Twój adres e-mail i podany NIP. Cel: wykonanie umowy i wystawienie faktury (art. 6 ust. 1 lit. b i c RODO). Nie widzimy i nie przechowujemy danych karty.</p>
<p><strong>Demo.</strong> Tekst wklejony do demo trafia do dostawcy modelu AI (Anthropic) wyłącznie po to, żeby pokazać Ci wynik. Nie zapisujemy go.</p>
<p><strong>Statystyka odwiedzin bez ciasteczek.</strong> Ta strona nie zapisuje odwiedzającym żadnych ciasteczek. Żeby policzyć wejścia, wyliczamy jednodniowy, anonimowy identyfikator z adresu IP i rodzaju przeglądarki. Sam adres IP nie jest zapisywany, a identyfikator zmienia się co dobę (art. 6 ust. 1 lit. f RODO: uzasadniony interes, czyli pomiar skuteczności strony).</p>
<h2>Kto przetwarza dane w naszym imieniu</h2>
<p>Cloudflare (hosting i baza danych), Stripe (płatności), Anthropic (przetwarzanie tekstu w demo). Dostawcy ci mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym na podstawie standardowych klauzul umownych.</p>
<h2>Jak długo</h2>
<p>Dane z formularza zgłoszenia: do wycofania zgody, nie dłużej niż 12 miesięcy od zakończenia testu. Dane płatności i faktur: przez okres wymagany przepisami podatkowymi.</p>
<h2>Twoje prawa</h2>
<p>Możesz żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przeniesienia, a także wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych. Napisz na ${mail}.</p>`,
  );
}

export function renderTerms(env: Env, locale: Locale, nonce: string): string {
  const company = e(env.COMPANY_NAME);
  const mail = `<a href="mailto:${e(env.CONTACT_EMAIL)}">${e(env.CONTACT_EMAIL)}</a>`;
  if (locale === 'en') {
    return shell(
      env,
      locale,
      nonce,
      'Pre-order terms',
      `<h1>Pre-order terms</h1>
<p><strong>Seller.</strong> ${company}, ${e(env.COMPANY_CITY)}, tax ID ${e(env.COMPANY_NIP)}. Contact: ${mail}.</p>
<p><strong>Who can buy.</strong> The offer is addressed to businesses only.</p>
<p><strong>What you buy.</strong> The first period of access to the pilot described on the offer page, at the price shown before payment (gross, including VAT where applicable).</p>
<p><strong>Start.</strong> We set up your access within 14 days of payment. If we do not, we refund the full amount without being asked.</p>
<p><strong>Refund.</strong> Within 30 days of the start you can ask for a full refund without giving a reason, by e-mailing ${mail}. Refunds go back to the payment method used.</p>
<p><strong>Invoice.</strong> We issue a VAT invoice to the details you provide at payment.</p>
<p><strong>Complaints.</strong> Write to ${mail}. We reply within 14 days.</p>`,
    );
  }
  return shell(
    env,
    locale,
    nonce,
    'Regulamin przedsprzedaży',
    `<h1>Regulamin przedsprzedaży</h1>
<p><strong>Sprzedawca.</strong> ${company}, ${e(env.COMPANY_CITY)}, NIP ${e(env.COMPANY_NIP)}. Kontakt: ${mail}.</p>
<p><strong>Kto może kupić.</strong> Oferta jest skierowana wyłącznie do przedsiębiorców.</p>
<p><strong>Co kupujesz.</strong> Pierwszy okres dostępu do pilotażu opisanego na stronie oferty, w cenie pokazanej przed płatnością (kwota brutto, z VAT).</p>
<p><strong>Start.</strong> Dostęp uruchamiamy w ciągu 14 dni od wpłaty. Jeśli tego nie zrobimy, zwracamy całą kwotę bez wezwania.</p>
<p><strong>Zwrot.</strong> W ciągu 30 dni od startu możesz zażądać zwrotu całej kwoty bez podawania przyczyny, pisząc na ${mail}. Zwrot wraca tą samą drogą, którą przyszła płatność.</p>
<p><strong>Faktura.</strong> Wystawiamy fakturę VAT na dane podane przy płatności.</p>
<p><strong>Reklamacje.</strong> Napisz na ${mail}. Odpowiadamy w ciągu 14 dni.</p>`,
  );
}
