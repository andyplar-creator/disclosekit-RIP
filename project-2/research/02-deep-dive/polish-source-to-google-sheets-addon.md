# Deep-dive: Konektor "polskie źródło danych -> Arkusze Google" w Google Workspace Marketplace (pierwsza hipoteza: faktury z KSeF -> arkusz)

Data: 2026-11-26. Slug: `polish-source-to-google-sheets-addon`. Autor: agent-analityk (rola: sceptyk, nie sprzedawca).

## Jak czytać ten dokument (ograniczenia, przeczytaj najpierw)

- **Wykonałem 24 wyszukiwania.** Cztery kolejne (liczba użytkowników darmowego rozszerzenia KSeF InvoSync; liczba instalacji niemieckiego dodatku do e-faktur w sklepie Google; eksport listy wydatków do Excela w wFirma/Fakturowni; statystyki dodatków Google) system odrzucił, bo wspólny limit wyszukiwań całego przebiegu został wyczerpany. Nie obchodziłem limitu.
- **Nie mogłem otworzyć żadnej strony bezpośrednio** (sieć kontenera to blokuje). Wszystko, co tu jest, pochodzi ze streszczeń wyników wyszukiwania. W szczególności **nie zajrzałem do samego sklepu Google Workspace Marketplace ani do Microsoft AppSource** - a to jest najważniejsza luka tego badania. Zamkniesz ją sam w 15 minut (instrukcja w sekcji R1).
- **Nie mam narzędzia do wolumenów słów kluczowych.** Nie podaję żadnego wolumenu.
- Etykiety: **zweryfikowane** = fakt lub liczba z linkiem (ze streszczenia wyniku - przed decyzją kliknij i potwierdź własnymi oczami); **częściowo** = dowód pośredni albo źródła sobie przeczą; **niezweryfikowane** = moje rozumowanie albo wiedza modelu bez źródła z tej sesji. Moje liczby "na oko" mają słowo **szacunek**.
- Z pamięci użytkownika (memory) nie skorzystałem - była pusta.

## Werdykt

**SŁABY - na granicy martwego. Hipoteza "KSeF -> Arkusze Google" jako samodzielny, pasywny produkt jest dla Ciebie praktycznie martwa. Dla całego wzorca "polskie źródło -> Sheets w sklepie Google" nie znalazłem ani jednego źródła danych z dowodem popytu.**

Dlaczego, w pięciu punktach:

1. **To już jest zajęte i tanie.** Dokładnie tę usługę (faktury z KSeF do Arkuszy Google i Excela, automatycznie, wg harmonogramu) sprzedają co najmniej dwie wyspecjalizowane firmy: KSeF Import od 8-9 zł netto miesięcznie (plan Firma 39 zł) i KsefTools od 99 zł netto miesięcznie. Obok nich działa jeszcze kilka podobnych (getKSeF, Selpio, KSeF Monitor od 29 zł, KSEFEO) oraz **darmowe, otwarte rozszerzenie Chrome "KSeF InvoSync"**, które łączy KSeF z Arkuszami Google. Byłbyś siódmym graczem, bez przewagi ceny i bez przewagi treści w Google (KSeF Import ma osobny artykuł prawie pod każdą frazę). [zweryfikowane, linki niżej]
2. **Jedyna rzecz, która by Cię odróżniała - miejsce w sklepie Google Workspace Marketplace - nie ma żadnego dowodu popytu.** Nie znalazłem tam żadnego dodatku KSeF (to może być luka, ale równie dobrze znak, że nikt tam tego nie szuka). Konkurenci świadomie poszli w SEO i własną aplikację webową, nie w sklep. [częściowo - sklepu nie mogłem otworzyć]
3. **Dla większości firm darmowym zamiennikiem nie jest ChatGPT, tylko program do faktur, który już mają.** wFirma, iFirma, inFakt i Fakturownia same pobierają faktury kosztowe z KSeF. Zostaje wąska grupa: firmy, które chcą żywego arkusza (lista "do zapłaty", obieg akceptacji) albo mają kilka NIP-ów. [zweryfikowane co do pobierania, niezweryfikowane co do eksportu do Excela]
4. **Łamie Twoją regułę pasywności i regułę budowy.** Musiałbyś przechowywać tokeny lub certyfikaty KSeF klientów (klucz do wszystkich ich faktur). Zasady tokenów właśnie się zmieniają (projekt rozporządzenia z 27.10.2026: nowe tokeny ważne 365 dni), więc każdy klient co rok będzie wymagał obsługi. Do tego weryfikacja Google (OAuth + recenzja sklepu) trwa realnie 2-8 tygodni, a są świeże relacje o wnioskach wiszących ponad 8 tygodni. "Sprzedawalna wersja w 2-3 tygodnie" jest przez ten kanał nierealna, a fali 1 stycznia 2027 r. już nie złapiesz. [zweryfikowane / częściowo]
5. **Testu R1 dla kanału "sklep Google" nie da się zrobić przed napisaniem kodu** - listing wymaga działającego dodatku i przejścia recenzji. Tanio da się przetestować tylko kanał Google Ads, a tam przy cenach konkurencji 8-39 zł ekonomia reklam prawie na pewno się nie spina (szacunek).

Czego NIE udało mi się obalić: nie wiem, ilu ludzi w Polsce wpisuje "KSeF" w sklepie Google ani jakie są wolumeny fraz "ksef excel / ksef google sheets". Jeśli Twoje 60 minut ręcznych sprawdzeń (sekcja R1, krok 0) pokaże coś zaskakującego, werdykt może wzrosnąć najwyżej do "warunkowy" - punkty 1, 3 i 4 zostają.

Uczciwa rada: **nie wybieraj tego jako projektu #2.** Jeśli KSeF Cię ciągnie, to jako płatny dodatek do konsultingu lub PLAR Orders u konkretnego klienta (jedno wdrożenie, faktura za usługę), nie jako pasywny SaaS.

## Odpowiedzi na pytania zabojcze

### 1. Czy w Google Workspace Marketplace albo Microsoft AppSource istnieje już dodatek KSeF / polskie faktury / polskie źródło?

**Odpowiedź:** Dodatku KSeF w Google Workspace Marketplace **nie znalazłem** (dwa wyszukiwania celowane w domenę sklepu). W AppSource jest jeden kandydat o niejasnym statusie. Za to poza sklepami jest tłoczno.

- **Google Workspace Marketplace:**
  - Brak listingu KSeF w wynikach. Jedyny listing sklepu, jaki wyskoczył przy frazie KSeF, to niemiecki dodatek do e-faktur ("eInvoice Creator"), nie polski: https://workspace.google.com/marketplace/app/einvoice_creator_einfach_erechnungen_ers/229106705932?hl=ru . Liczby instalacji nie znam (wyszukiwanie odrzucone przez limit).
  - **DataOrganizer** - polski dodatek do Arkuszy Google dla e-commerce (Shoper, IdoSell, WooCommerce, Allegro, GA4, reklamy). Regulamin mówi wprost, że konektor jest dodatkiem do Arkuszy Google dystrybuowanym przez Google Workspace Marketplace i jest dostępny dla klientów z aktywną subskrypcją: https://dataorganizer.io/en/terms/ , https://dataorganizer.io/integracje/ . Czyli sklep służy im jako **sposób dostarczenia** produktu już pozyskanym klientom, niekoniecznie jako źródło klientów [wniosek własny]. Instalacji i ceny nie znam.
  - **VIES Validator** (walidator VAT UE do Arkuszy Google, firma od nip24/viesapi) - w sklepie od 21 listopada 2025 r.: https://viesapi.eu/google-sheets-add-on-vies-validator-is-available-in-the-official-google-marketplace-now/ . Instalacji nie znam. To dobry "kanarek": polski, okołopodatkowy dodatek obecny w sklepie od roku.
- **Chrome Web Store (nie Marketplace):** **KSeF InvoSync** - opisane jako darmowe, otwartoźródłowe rozszerzenie przeglądarki łączące KSeF z Arkuszami Google: https://chromewebstore.google.com/detail/ksef-invosync/pakgkhgeiciagjoiejpglippflmfeopp . Liczby użytkowników nie znam (wyszukiwanie odrzucone).
- **GitHub:** gotowa usługa Node.js "ksef-google-docs" (KSeF -> Arkusze Google), dla technicznych: https://github.com/trizorOD/ksef-google-docs .
- **Microsoft AppSource / Excel:**
  - **KSeF Excel Connector** - dodatek do Excela, ale do **wysyłania** faktur, nie pobierania; własna strona raz pisze, że "przechodzi weryfikację AppSource", raz że jest "zweryfikowany": https://ksef-excel.pl/ . Status w AppSource niepotwierdzony.
  - nip24.pl ma dodatek do Excela (biała lista, VIES, REGON; tytuł strony wspomina też faktury KSeF): https://nip24.pl/en/sprawdzanie-statusu-vat-dodatek-do-excel-biala-lista-podatnikow-vat/ . Zakresu funkcji KSeF nie potwierdziłem.
  - Pobieranie do Excela robią skoroszyty z makrami (nie dodatki ze sklepu): Signform "KSeF Import" (.xlsm, Windows, klucz licencyjny) https://www.pit.pl/aktywne-druki/?module=product&id=9377 ; iForm https://www.iform.pl/blog/wpis/jak-masowo-pobrac-faktury-z-ksef-do-excela?page_type=post ; KSoftware https://ksoftware.pl/faktury-zakupowe-ksef .

**Status: częściowo.** Brak w wynikach wyszukiwania to nie dowód braku w sklepie. Musisz wpisać "KSeF" w obu sklepach sam (15 minut).

### 2. Ceny i funkcje konkurencji

**Odpowiedź:** Rynek ma już pełną drabinkę cen od 8 zł do 399 zł miesięcznie i wszystkie formy dostarczenia poza listingiem w sklepie Google.

- **KSeF Import (ksefimport.pl)** - aplikacja webowa; pobiera faktury przez API po wgraniu certyfikatu (.p12); zapisuje do Arkusza Google (sprzedażowe i kosztowe w osobnych zakładkach), eksport Excel/CSV/PDF, PDF-y na Dysk Google, Airtable, Notion; przez arkusz dalej do Make/Zapier/n8n. Ceny wg strony głównej: Solo 8 zł netto/mies. (9,84 zł brutto, przy płatności rocznej), Firma 39 zł netto (47,97 zł brutto), Grupa 97 zł (5 NIP-ów), Biuro 347 zł (20 NIP-ów); 7 dni próbnych bez karty. Synchronizacja: Solo co 24 h, Firma co 6 h, Grupa co 2 h, Biuro co 15 min. **Uwaga: strony tego dostawcy same sobie przeczą** (gdzie indziej "od 9 zł", "47 zł", limit Solo 20 albo 50 faktur, Excel od planu Firma albo "we wszystkich planach"). https://ksefimport.pl/ , https://ksefimport.pl/cennik , https://ksefimport.pl/mozliwosci/google-sheets
- **KsefTools (kseftools.pl)** - aplikacja webowa; łączy się tokenem tylko do odczytu; pobiera faktury sprzedażowe i zakupowe do Excela lub Arkuszy Google raz dziennie, co 6 h albo raz w tygodniu; 9 integracji (m.in. Dysk Google, Notion, Kalendarz Google); darmowe konwertery jako wabik. Cena: od 99 zł netto/mies., progi wg liczby faktur od 100 do 3000+; 7 dni próbnych bez karty. https://kseftools.pl/ , https://kseftools.pl/integracje , https://kseftools.pl/regulamin . Wygląda na projekt jednej osoby (strona portfolio autora: https://www.bartekbednarczyk.pl/kseftools ) [wniosek własny].
- **getKSeF.pl** - KSeF -> Dysk Google co godzinę + webhooki do Make/Zapier/n8n; płatna subskrypcja, cennik "wkrótce"; trzyma zaszyfrowany token i metadane na serwerze w Niemczech: https://getksef.pl/
- **Selpio** - KSeF -> Dysk Google: https://ksef.selpio.com/ (ceny nie widziałem).
- **KSeF Monitor** - Solo 29 zł, Firma 79 zł, Pro 199 zł miesięcznie brutto, bez automatycznego odnawiania: https://ksef-monitor.pl/cennik (zakresu funkcji nie widziałem; nazwa sugeruje powiadomienia).
- **KSEFEO** - próg 399 zł/mies. z automatycznym pobieraniem faktur: https://ksefeo.pl/cennik/
- **KSeF Canvas** - konektory n8n/Zapier/Make na GitHubie (z pierwszego sweepu): https://github.com/mdabrowski25/ksefcanvas-integrations . **Ceny nie ustaliłem.**
- **ksef.io** - **nie ustaliłem nic** (wyszukiwanie nie zwróciło treści).
- **Darmowe:** rozszerzenie KSeF InvoSync (link w pyt. 1), gotowy szablon n8n nr 13925 opisany tu: https://ksefimport.pl/blog/ksef-n8n-automatyzacja-open-source , usługa z GitHuba (pyt. 1).
- **Bramki API dla programistów:** 299 zł netto/mies. za firmę (z pierwszego sweepu): https://www.ksefapi.dev/

**Status: zweryfikowane** (ceny KSeF Import, KsefTools, KSeF Monitor, KSEFEO - ze streszczeń stron dostawców); **niezweryfikowane** dla KSeF Canvas, ksef.io, getKSeF, Selpio.

### 3. Co robią darmowe narzędzia urzędowe i popularne programy do faktur?

**Odpowiedź:** Programy do faktur załatwiają "zobacz i zaksięguj faktury kosztowe" same. Niepewne jest tylko, czy darmowa Aplikacja Podatnika daje zbiorczy plik CSV - źródła sobie przeczą.

- **Aplikacja Podatnika KSeF 2.0:** dostawcy płatnych narzędzi twierdzą, że pozwala przeglądać faktury i pobierać pojedyncze pliki XML/PDF (wg KsefTools najwyżej 10 naraz) i **nie** tworzy zbiorczego Excela/CSV: https://ksefimport.pl/blog/aplikacja-podatnika-ksef-excel , https://kseftools.pl/blog/wykaz-faktur-ksef . Poradnik Klucze Soft opisuje natomiast **eksport paczki faktur w formacie CSV**: https://kluczesoft.pl/pomoc/poradnik/aplikacji-podatnika-ksef . Oficjalnego źródła MF nie znalazłem. Sprzedawcy mają interes w pomniejszaniu darmowej aplikacji. **Sprawdź sam: zaloguj się do Aplikacji Podatnika swojej spółki i poszukaj eksportu - 5 minut.**
- **Aplikacja mobilna KSeF:** **niezweryfikowane** (zabrakło wyszukiwań).
- **wFirma:** po włączeniu opcji pobiera faktury zakupowe co noc do wersji roboczych wydatków: https://pomoc.wfirma.pl/-ksef-czyli-krajowy-system-e-faktur
- **iFirma:** automatyczne pobieranie faktur zakupowych z KSeF lub import ręczny: https://pomoc.ifirma.pl/pomoc-artykul/pobieranie-faktur-z-ksef-w-ifirma/ . Limit darmowego pakietu: źródła podają 3 faktury zakupowe miesięcznie albo 5 faktur łącznie - sprzeczne: https://www.vatax.pl/blog/obsluga-ksef-porownanie-cen , https://ksef.pl/blog/fakturownia-ifirma-wfirma-infakt-ktory-program-do-ksef-wybrac-w-2026
- **inFakt:** pobiera faktury kosztowe automatycznie: https://www.infakt.pl/ksef/ ; wg bloga konkurenta w najtańszym pakiecie raz w tygodniu, w płatnych co 15 minut: https://ksefimport.pl/blog/infakt-ksef-faktury-kosztowe-nie-widac (źródło stronnicze).
- **Fakturownia:** wysyłka sprzedaży i pobieranie faktur zakupowych z KSeF (źródło wtórne): https://ksef.pl/blog/fakturownia-ifirma-wfirma-infakt-ktory-program-do-ksef-wybrac-w-2026
- **Eksport listy wydatków do XLS/CSV w tych programach:** w tej sesji **nie potwierdziłem** (wyszukiwanie odrzucone). Z wiedzy modelu: takie programy zwykle mają eksport list do Excela - traktuj jako niezweryfikowane i sprawdź we własnym programie. Potwierdzone tylko dla SaldeoSMART (faktury sprzedaży z danymi KSeF do Excela): https://pomoc.saldeosmart.pl/hc/pl/articles/34431323034781-Eksport-faktur-sprzeda%C5%BCy-z-danymi-KSeF-do-pliku-Excel
- **Darmowe konwertery XML -> Excel:** https://www.szlachetnebiuro.pl/kalkulatory/ksef-xml-na-pdf-excel/ ; KsefTools daje darmowo wykaz do 10 faktur: https://kseftools.pl/blog/wykaz-faktur-ksef

**Kto więc nadal potrzebuje konektora [wniosek własny]:** (a) firma, która nie ma programu pobierającego koszty z KSeF albo siedzi na darmowym/najtańszym pakiecie z limitem; (b) właściciel kilku spółek/NIP-ów, który chce jednego arkusza; (c) firma z obiegiem akceptacji i płatności prowadzonym w arkuszu; (d) agencje automatyzacji budujące przepływy w Make/n8n. To wąska grupa i jest już obsługiwana za 8-99 zł.

**Status: częściowo.**

### 4. Autoryzacja w API KSeF 2.0: czy zewnętrzny SaaS może dostać dostęp tylko do odczytu i jakie to rodzi ryzyka?

**Odpowiedź:** Tak, technicznie się da (konkurenci to robią), ale to Ty trzymasz wtedy klucz do wszystkich faktur klienta, a zasady tokenów są właśnie zmieniane.

- **Model uprawnień:** uprawnienia są przypisane do **tokena** i deklaruje się je przy jego generowaniu; certyfikat KSeF służy tylko do potwierdzenia tożsamości i nie jest nośnikiem uprawnień: https://github.com/CIRFMF/ksef-api/blob/main/przeglad-kluczowych-zmian-ksef-api-2-0.md , https://poradnikprzedsiebiorcy.pl/-nowe-zasady-uwierzytelniania-w-ksef-certyfikaty-zastapia-tokeny . W dokumentacji API istnieje osobne uprawnienie "InvoiceRead - Przeglądanie faktur": https://api-test.ksef.mf.gov.pl/docs/v2/index.html . Czyli klient może wygenerować w Aplikacji Podatnika token tylko do przeglądania i wkleić go razem z NIP-em - tak działa KsefTools: https://kseftools.pl/ . **[zweryfikowane]**
- **Wariant z certyfikatem:** KSeF Import każe wgrać certyfikat .p12: https://ksefimport.pl/ . Nie znalazłem opisu, jak ograniczyć certyfikat do samego odczytu - certyfikat potwierdza tożsamość, więc niesie uprawnienia właściciela. To większa odpowiedzialność niż token do odczytu. **[częściowo]**
- **Niepewność prawna tokenów:** obowiązujące rozporządzenie pozwala logować się tokenem do 31 grudnia 2026 r. Ministerstwo zapowiedziało zmianę; projekt rozporządzenia z 27 października 2026 r. przewiduje, że stare tokeny działają do 30.11.2027, a nowe są ważne 365 dni (konsultacje do 10 listopada 2026 r.): https://mojaksiegowa.ai/blog/token-ksef-zostaje-na-2027-ale-z-data-waznosci/ , https://www.saldeosmart.pl/blog/wszystko-o-ksef/token-ksef-bez-terminu-koncowego-co-zmienia-sie-po-2026-roku/ , https://github.com/CIRFMF/ksef-api/issues/834 . Dopóki nowelizacja nie jest ogłoszona, obowiązuje 31.12.2026. Certyfikat jest ważny najwyżej 2 lata (źródła: https://fakturownia.pl/krajowy-system-e-faktur/token-ksef , https://biuromat.pl/certyfikat-ksef/ - przypisanie niepewne). **[zweryfikowane co do stanu sporu, wynik nieznany]**
- **Co to znaczy dla Ciebie [wniosek własny]:** (1) produkt oparty tylko na tokenach może wymagać przeróbki tuż po starcie; (2) tokeny na 365 dni = każdy klient co rok musi wygenerować nowy, czyli stały strumień zgłoszeń "przestało działać"; (3) logowanie certyfikatem wymaga podpisu elektronicznego po stronie serwera - trudniejsze do zbudowania i przetestowania przez osobę nietechniczną.
- **Ryzyka i obowiązki przy trzymaniu poświadczeń [niezweryfikowane prawnie, rozumowanie]:** token do odczytu nie pozwala wystawiać faktur, ale odsłania wszystkich dostawców, odbiorców, ceny i obroty firmy - to tajemnica handlowa plus dane osobowe (jednoosobowe działalności), więc potrzebna umowa powierzenia przetwarzania, szyfrowanie, procedura na wypadek wycieku. Wyciek z systemu napisanego przez agenta AI i utrzymywanego 2-4 h tygodniowo to ryzyko dla klientów i dla PLAR Sp. z o.o. Nie znalazłem źródła, które opisuje formalne wymogi wobec takich pośredników.
- **Możliwe obejście - nie zweryfikowane:** z wiedzy modelu w KSeF można nadać uprawnienie do przeglądania faktur innemu podmiotowi (tak pracują biura rachunkowe). Wtedy klient nadawałby uprawnienie NIP-owi Twojej spółki, a Ty logowałbyś się własnym certyfikatem i nie przechowywał cudzych tokenów. Nie potwierdziłem tego w tej sesji; byłaby to też dla klienta trudniejsza konfiguracja.
- **Limity API:** nie ustaliłem. Konkurent deklaruje ok. 60 faktur na godzinę na NIP (z pierwszego sweepu): https://ksefimport.pl/mozliwosci/integracje

**Status: częściowo.**

### 5. Dowody popytu po polsku

**Odpowiedź:** Znalazłem dowody **podaży**, nie popytu. Ani jednego organicznego wątku (forum, Reddit, Wykop, grupa), w którym ktoś pyta, jak wrzucić faktury z KSeF do Excela lub Arkuszy Google.

- Wszystkie wyniki na frazy typu "jak pobrać faktury z KSeF do Excela", "KSeF Google Sheets", "KSeF n8n/Make" to strony sprzedawców: KSeF Import (osobne artykuły: https://ksefimport.pl/blog/ksef-do-excel , https://ksefimport.pl/blog/ksef-do-google-sheets , https://ksefimport.pl/blog/zestawienie-faktur-z-ksef , https://ksefimport.pl/blog/masowe-pobieranie-faktur-ksef , https://ksefimport.pl/blog/ksef-make-com-automatyzacja-faktur ), KsefTools ( https://kseftools.pl/blog/ksef-excel , https://kseftools.pl/blog/ksef-google-sheets , https://kseftools.pl/blog/ksef-csv ), iForm, KSoftware, baseAI ( https://baseai.pl/n8n/ksef ).
- Co z tego wynika: (a) druga połowa R4 - "co najmniej 3 strony transakcyjne w wynikach" - jest **spełniona**; (b) pierwsza połowa - wolumen - **nieznana**; (c) pozycje w Google na długi ogon są już obstawione przez dwóch graczy, którzy piszą treści hurtowo.
- "Ranking narzędzi KSeF" istnieje, ale publikuje go sam konkurent: https://ksefimport.pl/ranking-narzedzi-ksef . Niezależne porównania dotyczą programów do faktur, nie konektorów: https://www.vatax.pl/blog/obsluga-ksef-porownanie-cen
- Czy konkurenci płacą za reklamy - **nie ustaliłem** (z wyników wyszukiwania tego nie widać). Sprawdzisz to, wpisując frazy w Google w trybie incognito.
- Jedyny organiczny wątek "jak zrobić raport" dotyczy Allegro, nie KSeF: https://spolecznosc.allegro.pl/t5/zaawansowani-sprzedawcy/zestawienie-sprzeda%C5%BCy-raport-jak-zrobi%C4%87/td-p/775770

**Status: częściowo** (podaż zweryfikowana, popyt niezweryfikowany). To jest dokładnie ten sam wzór ostrzegawczy co przy disclosekit: dużo stron sprzedawców, zero widocznych pytań kupujących.

### 6. Arkusze Google czy Excel w polskich małych firmach?

**Odpowiedź:** Wiarygodnych danych dla Polski nie znalazłem. Wszystkie pośrednie sygnały mówią: nie wolno stawiać tylko na Arkusze Google.

- Jedyna polska liczba: "80% MŚP w Polsce wybiera Microsoft 365" - blog firmowy, bez źródła, traktuj jako niepewne: https://dsx.pl/blog/microsoft-365-vs-google-workspace
- Globalnie obraz jest wyrównany: wg jednego zestawienia Google Workspace ma 50,34% domen, a Microsoft 365 45,46%: https://medhacloud.com/blog/microsoft-365-statistics-2026 ; wg skanu z września 2026 r. Microsoft 365 wykryto na 3 978 273 domenach, a Google Workspace na 3 820 175: https://technologychecker.io/blog/google-vs-microsoft-market-share . To liczone po domenach pocztowych i nie mówi, w czym firma prowadzi tabelki (firma z pocztą Google często i tak pracuje w Excelu) [wniosek własny].
- GUS: w 2025 r. płatne usługi chmurowe kupowało ok. 55-56% przedsiębiorstw, pocztę w chmurze ok. 37%, oprogramowanie biurowe w chmurze ok. 28% (w kolejnym badaniu 35,8%); bez podziału na Google i Microsoft i bez wyodrębnienia małych firm w wynikach, które widziałem: https://stat.gov.pl/files/gfx/portalinformacyjny/pl/defaultaktualnosci/5497/1/19/1/spoleczenstwo_informacyjne_w_polsce_2025.pdf , https://ceo.com.pl/sztuczna-inteligencja-w-polsce-2026-dane-gus-51482 (przypisanie poszczególnych liczb do stron niepewne; badanie GUS obejmuje firmy 10+ osób, więc mikrofirm - Twojej grupy docelowej - w nim nie ma [z wiedzy modelu]).
- Najmocniejszy sygnał rynkowy: obaj bezpośredni konkurenci sprzedają **oba** wyjścia naraz ("Faktury z KSeF do Google Sheets i Excel": https://kseftools.pl/ ), a starsi gracze (Signform, iForm, KSoftware) są wyłącznie excelowi.
- **Czy dodatek do Excela albo "wyślij mi codziennie XLSX mailem" dotarłby do większej liczby kupujących?** Zasięgiem - prawdopodobnie tak (szacunek, bez danych). Ale wtedy znika jedyna hipotetyczna przewaga (miejsce w sklepie Google), a zostaje walka o Google z dwoma okopanymi graczami. Wariant e-mailowy jest najprostszy w budowie (żadnej weryfikacji Google), tylko że nie ma własnego kanału dystrybucji. Dodatek do Excela wymaga konta Partner Center i walidacji Microsoftu: https://learn.microsoft.com/en-us/answers/questions/e360b799-6bfa-408f-81d8-4d0da240a5ea/how-to-deploy-excel-add-in?forum=msoffice-all

**Status: niezweryfikowane** (brak danych dla Polski), sygnały pośrednie częściowe.

### 7. Publikacja w Google Workspace Marketplace w 2026 r.

**Odpowiedź:** Płatności robisz sam (Stripe jest w porządku). Recenzja i weryfikacja to realnie 2-8 tygodni z długim ogonem - sama ta kolejka zjada Twoje okno "v1 w 2-3 tygodnie".

- **Płatności:** Google nie daje sposobu pobierania opłat za dodatki; dodatek może korzystać z własnego systemu płatności i z zewnętrznych usług rozliczeniowych: https://developers.google.com/workspace/add-ons/guides/workspace-restrictions . Wystawienie w sklepie jest bezpłatne (ze streszczenia wyników; przypisanie niepewne: https://developers.google.com/workspace/marketplace/overview lub https://bettersheets.co/explained/google-workspace-marketplace ). **[zweryfikowane]**
- **Dwa tory:** każdą publiczną aplikację recenzuje zespół sklepu, a aplikacje z "wrażliwymi" uprawnieniami muszą dodatkowo przejść weryfikację OAuth; można złożyć oba wnioski naraz, ale zgoda sklepu czeka na OAuth: https://support.google.com/marketplace/answer/180490?hl=en , https://developers.google.com/workspace/marketplace/about-app-review . **[zweryfikowane]**
- **Terminy oficjalne:** weryfikacja OAuth 3-5 dni roboczych przy uprawnieniach wrażliwych, recenzja sklepu 2-3 tygodnie (poradnik Google dla dodatków Classroom): https://developers.google.com/workspace/classroom/add-ons/developer-guides/review-process-overview . Inne zestawienie przypisywane FAQ Google: marka 2-3 dni robocze, uprawnienia wrażliwe 10 dni roboczych, uprawnienia "restricted" 6 tygodni (cytowane w poradnikach zewnętrznych, np. https://www.shipaddons.com/blog/google-oauth-verification-guide - przypisanie niepewne). **[częściowo - Google podaje różne liczby w różnych miejscach]**
- **Terminy z praktyki:** poradniki zewnętrzne mówią o 4-8 tygodniach łącznie dla pierwszej publikacji; relacje: miesiąc od pierwszego wniosku do publikacji (dodatek do Kalendarza) https://cgarethc.medium.com/building-a-google-calendar-add-on-and-publishing-it-in-the-marketplace-95a9c3fa7f61 ; weryfikacja wisząca ponad 8 tygodni https://security.googlecloudcommunity.com/security-validation-5/oauth-verification-for-workspace-add-on-stuck-for-8-weeks-client-critical-6543 ; wniosek "w recenzji od 4 października" (2026) dla uprawnienia script.external_request, bez kontaktu ze strony Google https://security.googlecloudcommunity.com/cloud-security-foundation-7/oauth-data-access-verification-under-review-since-4-oct-no-trust-safety-contact-no-reply-path-sensitive-scope-script-external-request-8375 . W tym ostatnim wątku pada też informacja, że niezweryfikowana aplikacja z wrażliwymi uprawnieniami ma limit 100 użytkowników. **[częściowo - anegdoty, ale świeże]**
- **Uprawnienia:** dodatek, który sam łączy się z Twoim serwerem, potrzebuje uprawnienia do połączeń zewnętrznych (script.external_request), które jest "wrażliwe" - czyli weryfikacji OAuth nie unikniesz. Uprawnienia "restricted" (np. pełny dostęp do Dysku lub Gmaila) mogą dodatkowo wymagać płatnego audytu bezpieczeństwa CASA: https://singhamandeep.com/google-workspace-api-verification-guide/ , https://imisofts.com/blog/google-oauth-verification-restricted-scopes/ . Wniosek: projektować tak, by nie dotykać uprawnień "restricted" [wniosek własny]. **[częściowo]**
- **Częste powody odrzuceń:** niepełna weryfikacja OAuth, nieścisły opis, błędy działania u recenzenta, zbyt ogólna polityka prywatności: https://medium.com/@info.brightconstruct/the-real-google-workspace-marketplace-app-review-journey-what-they-actually-check-2c3918aabc61
- Ważna obserwacja: KSeF Import i KsefTools **nie są** dodatkami ze sklepu - logują użytkownika do Google ze swojej aplikacji webowej i piszą do arkusza z serwera. Nikt z obecnych graczy nie uznał sklepu za wart zachodu [wniosek własny z ich opisów].

**Status: częściowo.**

### 8. Które INNE polskie źródło mogłoby mieć silniejszy popyt "-> Sheets"?

**Odpowiedź: żadne z dowodem.** Nie potrafię wskazać źródła, dla którego jednocześnie (a) ludzie widocznie pytają, (b) nie ma gotowego rozwiązania, (c) jest ruch w sklepie Google.

| Źródło | Co już istnieje | Dowód, że ktoś pyta | Ocena |
|---|---|---|---|
| BaseLinker | Gotowe połączenia z Arkuszami Google w Zapier, Pipedream, Integrately; dodatek SheetXAI: https://zapier.com/apps/baselinker/integrations/google-sheets , https://pipedream.com/apps/baselinker/integrations/google-sheets/get-cell-with-google-sheets-api-on-new-order-created-from-baselinker-api-int_QmsQ6DDe , https://integrately.com/integrations/baselinker/google-sheets , https://www.sheetxai.com/integrations/google-sheets/baselinker/create-purchase-orders | Nie znalazłem | Zajęte przez ogólne narzędzia automatyzacji |
| Allegro | DataOrganizer (dodatek do Arkuszy, Allegro + sklep + GA4 + reklamy): https://dataorganizer.io/raport-sprzedazy-bez-excela/ ; własne eksporty Allegro: https://allegro.pl/pomoc/aktualnosci/od-dzis-mozesz-dodac-parametry-podatkowe-do-raportu-sprzedazy-Ag6k5LvVVCn ; szablony Excela: https://excelfirma.com/poradnik/sprzedaz-allegro-excel/ | Jeden wątek w Społeczności Allegro o zestawieniu sprzedaży (brak prowizji w eksporcie): https://spolecznosc.allegro.pl/t5/zaawansowani-sprzedawcy/zestawienie-sprzeda%C5%BCy-raport-jak-zrobi%C4%87/td-p/775770 | Najwięcej śladów realnej potrzeby (raport zysku sprzedawcy), ale jest już polski gracz z dodatkiem |
| Shoper | DataOrganizer: https://dataorganizer.io/integracja-shoper/ | Nie znalazłem | Zajęte |
| Fakturownia | Gotowe scenariusze Make sprzedawane jako produkty: https://integrafy.pl/produkt/raport-przychodow-miesiecznych-sheets/ , https://automaciki.pl/product/wf-automat-wysylki-faktur-i-przypomnien/ ; dodatku nie znalazłem | Nie znalazłem | Mała nisza, obsługiwana przez Make |
| wFirma, inFakt | Nic nie znalazłem | Nie znalazłem | Brak danych |
| InPost, Booksy | Nic nie znalazłem (jedno wyszukiwanie) | Nie znalazłem | Brak danych - nie mylić z "wolne pole" |

Jeśli miałbym wskazać jeden kierunek do dalszego sprawdzenia, byłby to "raport zysku sprzedawcy Allegro/BaseLinker w arkuszu" - ale stoi tam już DataOrganizer i ogólne Zapier/Make, a sam temat wymaga wiedzy o analityce e-commerce. To nie jest rekomendacja, tylko najmniej słaby trop.

**Status: częściowo** (istniejące rozwiązania zweryfikowane; popyt niezweryfikowany).

## Konkurencja

| Nazwa | Cena | Trakcja | Słabość | Link |
|---|---|---|---|---|
| KSeF Import | Solo 8-9 zł netto/mies., Firma 39 zł, Grupa 97 zł (5 NIP), Biuro 347 zł (20 NIP); 7 dni próbnych | Nieznana; bardzo dużo treści SEO (kilkadziesiąt podstron i artykułów w wynikach) | Sprzeczne informacje o planach na własnych stronach; wymaga wgrania certyfikatu .p12; stałe okno pobierania (wg pierwszego sweepu); nie ma go w sklepie Google | https://ksefimport.pl/ |
| KsefTools | od 99 zł netto/mies., progi 100-3000+ faktur; 7 dni próbnych | Nieznana; wygląda na projekt jednej osoby | Drogi na tle KSeF Import; oparty na tokenach, których zasady się zmieniają; nie ma go w sklepie Google | https://kseftools.pl/ |
| KSeF InvoSync (rozszerzenie Chrome) | 0 zł, otwarte źródła | Nieznana (nie zdążyłem sprawdzić liczby użytkowników) | Rozszerzenie przeglądarki, nie usługa w tle; brak wsparcia | https://chromewebstore.google.com/detail/ksef-invosync/pakgkhgeiciagjoiejpglippflmfeopp |
| getKSeF.pl | Płatne, cennik niepublikowany | Nieznana | Dysk Google zamiast arkusza; brak ceny | https://getksef.pl/ |
| Selpio KSeF | Nie ustalono | Nieznana | Dysk Google, nie arkusz | https://ksef.selpio.com/ |
| KSeF Monitor | 29 / 79 / 199 zł brutto/mies. | Nieznana | Zakres funkcji niepotwierdzony | https://ksef-monitor.pl/cennik |
| KSEFEO | próg 399 zł/mies. | Nieznana | Drogi, pełniejszy system obiegu | https://ksefeo.pl/cennik/ |
| Signform / iForm / KSoftware (skoroszyty Excel z makrami) | iForm: 249 zł netto/rok za skoroszyt KSeF (z pierwszego sweepu, dotyczy wysyłki); pozostałe nie ustalono | Nieznana; firmy z wieloletnią bazą klientów excelowych | Tylko Windows + Excel z makrami, ręczne uruchamianie | https://www.pit.pl/aktywne-druki/?module=product&id=9377 , https://www.iform.pl/3017-krajowy-system-e-faktur-ksef , https://ksoftware.pl/faktury-zakupowe-ksef |
| KSeF Excel Connector (dodatek Excel) | Nie ustalono | Status AppSource niejasny | Wysyłka, nie pobieranie | https://ksef-excel.pl/ |
| Programy do faktur (wFirma, iFirma, inFakt, Fakturownia) | W cenie abonamentu, który firma i tak płaci | Bardzo duża | Faktury lądują w programie, nie w arkuszu; limity w tanich pakietach | https://pomoc.wfirma.pl/-ksef-czyli-krajowy-system-e-faktur , https://www.infakt.pl/ksef/ |
| Szablon n8n nr 13925, usługa z GitHuba | 0 zł | Nieznana | Tylko dla technicznych | https://ksefimport.pl/blog/ksef-n8n-automatyzacja-open-source , https://github.com/trizorOD/ksef-google-docs |
| DataOrganizer (inne źródło: e-commerce) | Nie ustalono; 14 dni próbnych | Nieznana | Inny segment (sklepy internetowe) | https://dataorganizer.io/integracje/ |

Uwaga: przy żadnym konkurencie nie znam liczby klientów ani przychodu. "Trakcja: nieznana" to uczciwy stan wiedzy, nie dowód, że nie zarabiają.

## Najlepszy wariant produktu

**Jako samodzielny pasywny produkt: brak wariantu, który przechodzi Twoje reguły.**

Dwa warianty, które zostają na stole, oba poza pierwotnym założeniem:

1. **Moduł do konsultingu / PLAR Orders, nie SaaS.** "Faktury kosztowe z KSeF w arkuszu 'do zapłaty'" wdrażane u konkretnego klienta jako usługa (wdrożenie + stała opłata), najlepiej w modelu, w którym klient nadaje uprawnienie do przeglądania faktur Twojej spółce zamiast oddawać token (niezweryfikowane - sprawdzić w podręczniku KSeF). Zalety: nie potrzebujesz sklepu Google ani reklam, klient Ci ufa. Wada: to nie jest pasywne i nie spełnia Twojej reguły dystrybucji - dlatego to nie jest "projekt #2", tylko pozycja w ofercie.
2. **Jeśli mimo wszystko chcesz zagrać o sklep Google:** jedyna wersja z jakąkolwiek logiką to "pierwszy i jedyny dodatek KSeF w Google Workspace Marketplace" - dla mikrofirm i wielo-NIP-owców bez programu księgowego z dobrym importem; token tylko do odczytu; jeden arkusz "do zapłaty" z terminami i statusem; cena 29 zł netto/mies. za NIP albo 290 zł netto/rok (**szacunek**, musi zmieścić się między 8-39 zł KSeF Import a 99 zł KsefTools); płatność własnym Stripe; darmowo tylko jednorazowy podgląd ostatnich 10 faktur. Warunek wstępny: krok 0 z sekcji R1 musi pokazać, że w sklepie Google naprawdę nikogo nie ma **i** że analogiczne polskie dodatki mają tam instalacje. Bez tego - nie budować.

## Ekonomia (z zaznaczeniem szacunkow)

- **Cena możliwa do obrony:** 29-39 zł netto/mies. za NIP (**szacunek**). Kotwice: 8-39 zł (KSeF Import, https://ksefimport.pl/ ), 99 zł (KsefTools, https://kseftools.pl/ ), 29-199 zł brutto (KSeF Monitor, https://ksef-monitor.pl/cennik ).
- **Wolumen:** nieznany. Mój **szacunek** przy działającym kanale: 20-60 płacących po roku, czyli ok. 600-2300 zł/mies. To mieści się w stawkach bazowych z pierwszego sweepu (mediana solo-projektu ok. 445 USD/mies.: https://www.onemilliongoal.com/p/what-986-solo-startups-actually-look ). Bez działającego kanału: 0.
- **Kanał "sklep Google" - ile instalacji trzeba:** wzorcowy Sync2Sheets miał ponad 5 tys. USD MRR przy 66 tys. instalacji ( https://www.founderclub.com/notion2sheets/ ), czyli ok. 0,08 USD MRR na jedną instalację (wyliczenie własne). Przy tej proporcji 500 USD MRR wymaga ok. 6600 instalacji (**szacunek** z cudzych liczb, produkt globalny). Nie mam żadnego dowodu, że polski dodatek KSeF zbierze w sklepie Google tysiące instalacji.
- **Kanał Google Ads:** przy 39 zł/mies. i założeniu 12 miesięcy życia klienta wartość klienta to ok. 470 zł netto (**szacunek**). Jeśli na pozyskanie przeznaczysz 1/3, masz ok. 155 zł na klienta; przy 1-2% kliknięć kończących się płatnością (**szacunek**) stać Cię na 1,5-3 zł za kliknięcie. Stawek za kliknięcie nie znam - sprawdź w Planerze. Przy cenie lidera 8 zł/mies. ta sama rachuba daje 0,3-0,6 zł za kliknięcie, czyli reklamy są nieopłacalne (**szacunek**). W 2026 r. o hasła z "KSeF" licytują się wszyscy producenci programów księgowych [wniosek własny, niezweryfikowane].
- **Koszty stałe:** hosting ok. 0 EUR (Twój stos), listing w sklepie Google bezpłatny (link w pyt. 7), Stripe prowizyjnie. Ukryty koszt: Twój czas na wsparcie i ryzyko odpowiedzialności za dane.
- **Fala 1 stycznia 2027 r.:** wchodzą najmniejsze firmy (do 10 tys. zł sprzedaży na fakturach miesięcznie: https://www.ifirma.pl/blog/ksef-2027-co-sie-zmieni-kogo-dotyczyc-bedzie-ostatni-z-etapow-wdrozenia-ksef/ ), czyli najmniej faktur i najmniejsza skłonność do płacenia [wniosek własny]. I tak jej nie złapiesz - do stycznia zostało 5 tygodni, a sama recenzja Google to 2-8 tygodni.

## Zakres budowy i pasywnosc

**Zakres v1 (gdybyś mimo werdyktu budował):**

- Serwer na Cloudflare Workers: logowanie do API KSeF 2.0 tokenem (szyfrowanie tokena kluczem publicznym KSeF, sesja), pobieranie listy i treści faktur, rozbiór XML FA(3), harmonogram, baza D1, szyfrowane przechowywanie tokenów, Stripe, obsługa wygasania tokenów.
- Dodatek do Arkuszy (panel boczny w Apps Script) + konfiguracja OAuth, polityka prywatności, regulamin, umowa powierzenia, film demonstracyjny dla recenzenta, weryfikacja domeny.
- Czas: 10-15 dni roboczych budowy z agentem (**szacunek**) **plus** 2-8 tygodni kolejki Google (linki w pyt. 7) **plus** ewentualne poprawki po odrzuceniu. Realnie 6-10 tygodni do pierwszej publicznej instalacji (**szacunek**). To przekracza Twój limit "v1 w 2-3 tygodnie".
- Logowanie certyfikatem (na wypadek wygaszenia tokenów) to dodatkowa, trudniejsza praca (**szacunek**, nie testowałem wykonalności na Cloudflare Workers).

**Pasywność:** oceniam na 3-6 h/tydz. w pierwszych miesiącach (**szacunek**), czyli powyżej Twojego limitu 2-4 h. Źródła pracy: klienci nie umieją wygenerować tokena w Aplikacji Podatnika; tokeny wygasają (projekt: 365 dni); awarie i zmiany API po stronie ministerstwa; ponowna weryfikacja Google przy każdej zmianie uprawnień; pytania "dlaczego nie widzę faktury X". Do tego ryzyko ogonowe: incydent bezpieczeństwa wymagający natychmiastowej reakcji - nie do pogodzenia z "bez dyżurów".

## Ryzyka

1. **Wejście na zajęty rynek z gorszą ceną i bez kanału.** Lider cenowy ma 8-39 zł i obstawione frazy w Google; Ty nie masz ani treści, ani widowni.
2. **Sklep Google może nie mieć polskiego ruchu na "KSeF".** Hipoteza główna całego kandydata pozostaje niezweryfikowana, a jej test wymaga zbudowania produktu i przejścia recenzji.
3. **Poświadczenia KSeF klientów.** Wyciek = ujawnienie dostawców, cen i obrotów klientów; odpowiedzialność spada na PLAR Sp. z o.o. System pisze agent AI, utrzymuje osoba nietechniczna.
4. **Zmienne zasady po stronie państwa.** Status tokenów po 31.12.2026 jest w trakcie zmiany (projekt z 27.10.2026). Każda zmiana API to pilna praca.
5. **Kolejka i kaprysy Google.** 2-8 tygodni, relacje o ponad 8 tygodniach bez odpowiedzi; limit 100 użytkowników przed weryfikacją.
6. **Zamiennik w programie do faktur.** Każda aktualizacja wFirma/inFakt/Fakturowni (np. lepszy eksport, powiadomienia) zabiera część rynku.
7. **Powtórka z disclosekit.** Nisza przy regulacji, dużo stron sprzedawców, zero widocznych pytań kupujących; ryzyko czterech tygodni kodu przed testem chęci zapłaty - tu wręcz wymuszone przez konstrukcję kanału.
8. **Arkusze Google to mniejszość rynku tabelek w Polsce** (niezweryfikowane, ale konkurenci asekurują się Excelem).
9. **Darmowe otwarte narzędzia** (rozszerzenie Chrome, szablon n8n) zabierają klientów technicznych - czyli tych, którzy najłatwiej znaleźliby dodatek w sklepie.

## Najtanszy test checi zaplaty (R1) z progami

Wszystkie progi poniżej to moje **szacunki** - ustal je przed startem i nie przesuwaj po fakcie.

**Krok 0 - 60 minut, 0 EUR, bez kodu (zrób to, zanim cokolwiek wydasz):**

1. Sklep Google Workspace Marketplace: wpisz "KSeF", "faktury", "e-faktura", "Allegro", "BaseLinker", "Fakturownia", "DataOrganizer", "VIES". Zapisz, co istnieje i ile ma instalacji (sklep pokazuje przedział przy każdym dodatku).
   - **Zabija:** VIES Validator (w sklepie od 21.11.2025) i DataOrganizer mają poniżej 1000 instalacji każdy -> sklep nie dostarcza polskiego ruchu dla takich narzędzi.
   - **Zabija:** istnieje już dodatek KSeF z instalacjami -> znika jedyna przewaga.
   - **Nie zabija:** pusto pod "KSeF", a polskie analogi mają po kilka tysięcy instalacji.
2. Microsoft AppSource: wpisz "KSeF". Zapisz wyniki.
3. Planer słów kluczowych (Polska, język polski): lista fraz z sekcji niżej. Zapisz wolumen i stawki "góra strony".
   - **Zabija:** żadna fraza nie ma 1000/mies. i mniej niż 3 warianty mają po 100/mies. (Twoja reguła R4).
   - **Zabija kanał reklam:** górna stawka za kliknięcie powyżej 3 zł dla głównych fraz.
4. Aplikacja Podatnika Twojej spółki: czy jest eksport paczki/listy faktur do CSV? Twój program do faktur: czy lista wydatków eksportuje się do Excela?
   - **Zabija:** tak w obu miejscach, w kilka kliknięć -> zostaje tylko potrzeba "automatycznie i w tle", czyli jeszcze węższa grupa.
5. Google incognito: wpisz 5 głównych fraz, policz reklamy i strony z cennikiem w pierwszej dziesiątce.

**Krok 1 - tylko jeśli krok 0 niczego nie zabił; 7-10 dni, do 150 EUR:**

- Jedna strona: "Faktury kosztowe z KSeF w Arkuszu Google - lista do zapłaty, odświeżana automatycznie", cena 290 zł netto/rok lub 39 zł/mies., przycisk Stripe Checkout z prawdziwą płatnością "plan założycielski", jasna informacja o dacie startu i pełnym zwrocie na żądanie.
- Google Ads tylko na frazy, które przeszły krok 0, dopasowanie ścisłe i do wyrażenia.
- **Zalicza:** co najmniej 3 prawdziwe płatności na minimum 150 kliknięć (2%) **i** koszt pozyskania jednego płacącego nie wyższy niż 150 zł.
- **Zabija:** 0-1 płatność po 150 kliknięciach albo średni koszt kliknięcia powyżej 4 zł.
- **Strefa szara (2 płatności):** nie buduj; jedna rozmowa telefoniczna z każdym płacącym, dlaczego nie wybrał KSeF Import za 8-39 zł.

**Czego ten test NIE sprawdza:** popytu wewnątrz sklepu Google. Tego nie da się sprawdzić bez działającego dodatku po recenzji. To jest konstrukcyjna słabość kandydata względem Twojej reguły R1.

## Frazy do sprawdzenia w Planerze slow kluczowych

KSeF -> arkusz / Excel (intencja zakupowa lub narzędziowa):

- ksef excel
- ksef do excela
- faktury z ksef do excela
- pobieranie faktur z ksef do excela
- eksport faktur z ksef
- eksport faktur ksef excel
- ksef csv
- ksef google sheets
- ksef arkusze google
- faktury ksef google sheets
- zestawienie faktur z ksef
- wykaz faktur ksef
- masowe pobieranie faktur z ksef
- pobieranie faktur kosztowych z ksef
- program do pobierania faktur z ksef
- ksef powiadomienia o nowych fakturach
- ksef google drive
- dodatek ksef excel
- ksef n8n
- ksef make
- ksef zapier

Marki konkurentów (ich wolumen to zastępnik ich trakcji):

- ksef import
- ksefimport
- kseftools
- getksef
- ksef monitor

Inne źródła (pytanie 8):

- baselinker google sheets
- baselinker eksport zamówień excel
- allegro google sheets
- allegro raport sprzedaży excel
- zestawienie sprzedaży allegro
- shoper google sheets
- fakturownia google sheets
- fakturownia eksport do excela

## Otwarte pytania

1. Czy w Google Workspace Marketplace i Microsoft AppSource jest dziś jakikolwiek dodatek KSeF? Ile instalacji mają DataOrganizer, VIES Validator i niemiecki eInvoice Creator? (15 minut ręcznie.)
2. Wolumeny i stawki za kliknięcie dla fraz z listy. (Planer, 30 minut.)
3. Czy darmowa Aplikacja Podatnika KSeF 2.0 eksportuje paczkę/listę faktur do CSV? Źródła sobie przeczą.
4. Ilu użytkowników ma darmowe rozszerzenie KSeF InvoSync? (Widać na stronie w Chrome Web Store.)
5. Jak skończyła się nowelizacja rozporządzenia o tokenach (projekt z 27.10.2026) - czy tokeny działają po 31.12.2026 i z jaką ważnością?
6. Czy zewnętrzna spółka może dostać od klienta uprawnienie "przeglądanie faktur" na swój NIP i logować się własnym certyfikatem (bez trzymania cudzych tokenów)? Jakie są limity zapytań API?
7. Jakie są formalne obowiązki (RODO, umowa powierzenia, odpowiedzialność) pośrednika przechowującego poświadczenia KSeF? Wymaga pytania do prawnika, nie do wyszukiwarki.
8. Ilu klientów mają KSeF Import i KsefTools? Nie znalazłem żadnej liczby.
9. Cennik i zakres KSeF Canvas, ksef.io, getKSeF, Selpio oraz cena DataOrganizer.
10. Czy wFirma / Fakturownia / inFakt eksportują listę wydatków do Excela w kilka kliknięć? (Sprawdź we własnym koncie.)
11. Funkcje oficjalnej aplikacji mobilnej KSeF - nie zbadane.

## Zrodla

Wszystkie adresy pochodzą z wyników 24 wyszukiwań z 2026-11-26 (znam streszczenia, nie pełne strony) albo z dossier pierwszego sweepu (zaznaczone).

Konkurenci KSeF -> arkusz / Excel / Dysk:
- https://ksefimport.pl/
- https://ksefimport.pl/cennik
- https://ksefimport.pl/mozliwosci/google-sheets
- https://ksefimport.pl/mozliwosci/integracje
- https://ksefimport.pl/mozliwosci/ksef-do-excel
- https://ksefimport.pl/mozliwosci/eksport-formatow
- https://ksefimport.pl/ranking-narzedzi-ksef
- https://ksefimport.pl/blog/ksef-do-google-sheets
- https://ksefimport.pl/blog/ksef-do-excel
- https://ksefimport.pl/blog/zestawienie-faktur-z-ksef
- https://ksefimport.pl/blog/masowe-pobieranie-faktur-ksef
- https://ksefimport.pl/blog/aplikacja-podatnika-ksef-excel
- https://ksefimport.pl/blog/infakt-ksef-faktury-kosztowe-nie-widac
- https://ksefimport.pl/blog/ksef-make-com-automatyzacja-faktur
- https://ksefimport.pl/blog/ksef-n8n-automatyzacja-open-source
- https://kseftools.pl/
- https://kseftools.pl/integracje
- https://kseftools.pl/integracje/google-sheets
- https://kseftools.pl/regulamin
- https://kseftools.pl/blog/ksef-google-sheets
- https://kseftools.pl/blog/ksef-excel
- https://kseftools.pl/blog/ksef-csv
- https://kseftools.pl/blog/wykaz-faktur-ksef
- https://kseftools.pl/blog/import-faktur-ksef-excel
- https://www.bartekbednarczyk.pl/kseftools
- https://preview--ksef-sheet-sync.lovable.app/
- https://getksef.pl/
- https://ksef.selpio.com/
- https://ksef-monitor.pl/cennik
- https://ksefeo.pl/cennik/
- https://baseai.pl/n8n/ksef
- https://chromewebstore.google.com/detail/ksef-invosync/pakgkhgeiciagjoiejpglippflmfeopp
- https://github.com/trizorOD/ksef-google-docs
- https://github.com/mdabrowski25/ksefcanvas-integrations (pierwszy sweep)
- https://www.ksefapi.dev/ (pierwszy sweep)

Excel:
- https://ksef-excel.pl/
- https://nip24.pl/en/sprawdzanie-statusu-vat-dodatek-do-excel-biala-lista-podatnikow-vat/
- https://www.pit.pl/aktywne-druki/?module=product&id=9377
- https://www.iform.pl/3017-krajowy-system-e-faktur-ksef
- https://www.iform.pl/blog/wpis/jak-masowo-pobrac-faktury-z-ksef-do-excela?page_type=post
- https://ksoftware.pl/faktury-zakupowe-ksef
- https://www.szlachetnebiuro.pl/kalkulatory/ksef-xml-na-pdf-excel/
- https://learn.microsoft.com/en-us/answers/questions/e360b799-6bfa-408f-81d8-4d0da240a5ea/how-to-deploy-excel-add-in?forum=msoffice-all

Narzędzia urzędowe i programy do faktur:
- https://kluczesoft.pl/pomoc/poradnik/aplikacji-podatnika-ksef
- https://pomoc.wfirma.pl/-ksef-czyli-krajowy-system-e-faktur
- https://pomoc.ifirma.pl/pomoc-artykul/pobieranie-faktur-z-ksef-w-ifirma/
- https://www.infakt.pl/ksef/
- https://ksef.pl/blog/fakturownia-ifirma-wfirma-infakt-ktory-program-do-ksef-wybrac-w-2026
- https://www.vatax.pl/blog/obsluga-ksef-porownanie-cen
- https://eztax.pl/jak-odebrac-i-pobrac-fakture-kosztowa-z-ksef/
- https://pomoc.saldeosmart.pl/hc/pl/articles/34431323034781-Eksport-faktur-sprzeda%C5%BCy-z-danymi-KSeF-do-pliku-Excel
- https://www.ifirma.pl/blog/ksef-2027-co-sie-zmieni-kogo-dotyczyc-bedzie-ostatni-z-etapow-wdrozenia-ksef/ (pierwszy sweep)

API KSeF, tokeny, certyfikaty:
- https://github.com/CIRFMF/ksef-api/blob/main/przeglad-kluczowych-zmian-ksef-api-2-0.md
- https://github.com/CIRFMF/ksef-api/issues/834
- https://api-test.ksef.mf.gov.pl/docs/v2/index.html
- https://ksef.podatki.gov.pl/media/jzrevse3/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-20260209.pdf
- https://www.gov.pl/web/finanse/udostepnienie-api-ksef-20-do-weryfikacji-systemow-komercyjnych
- https://poradnikprzedsiebiorcy.pl/-nowe-zasady-uwierzytelniania-w-ksef-certyfikaty-zastapia-tokeny
- https://mojaksiegowa.ai/blog/token-ksef-zostaje-na-2027-ale-z-data-waznosci/
- https://www.saldeosmart.pl/blog/wszystko-o-ksef/token-ksef-bez-terminu-koncowego-co-zmienia-sie-po-2026-roku/
- https://fakturownia.pl/krajowy-system-e-faktur/token-ksef
- https://biuromat.pl/certyfikat-ksef/
- https://pietruczyk.pl/blog/tokeny-ksef-do-kiedy
- https://bppz.pl/koniec-tokenow-ksef-certyfikaty-2027/
- https://mavitconsulting.com/pl/ksef-test/ksef-api-guide
- https://mankasoft.com/poradniki/ksef-api-automatyzacja-faktur/

Google Workspace Marketplace i weryfikacja:
- https://developers.google.com/workspace/add-ons/guides/workspace-restrictions
- https://developers.google.com/workspace/marketplace/about-app-review
- https://developers.google.com/workspace/marketplace/configure-oauth-consent-screen
- https://developers.google.com/workspace/marketplace/overview
- https://developers.google.com/workspace/classroom/add-ons/developer-guides/review-process-overview
- https://support.google.com/marketplace/answer/180490?hl=en
- https://security.googlecloudcommunity.com/cloud-security-foundation-7/oauth-data-access-verification-under-review-since-4-oct-no-trust-safety-contact-no-reply-path-sensitive-scope-script-external-request-8375
- https://security.googlecloudcommunity.com/security-validation-5/oauth-verification-for-workspace-add-on-stuck-for-8-weeks-client-critical-6543
- https://www.shipaddons.com/blog/google-oauth-verification-guide
- https://singhamandeep.com/google-workspace-api-verification-guide/
- https://imisofts.com/blog/google-oauth-verification-restricted-scopes/
- https://medium.com/@info.brightconstruct/the-real-google-workspace-marketplace-app-review-journey-what-they-actually-check-2c3918aabc61
- https://cgarethc.medium.com/building-a-google-calendar-add-on-and-publishing-it-in-the-marketplace-95a9c3fa7f61
- https://bettersheets.co/explained/google-workspace-marketplace
- https://workspace.google.com/marketplace/app/einvoice_creator_einfach_erechnungen_ers/229106705932?hl=ru
- https://viesapi.eu/google-sheets-add-on-vies-validator-is-available-in-the-official-google-marketplace-now/
- https://www.founderclub.com/notion2sheets/ (pierwszy sweep)
- https://www.onemilliongoal.com/p/what-986-solo-startups-actually-look (pierwszy sweep)

Google czy Microsoft w firmach:
- https://dsx.pl/blog/microsoft-365-vs-google-workspace
- https://medhacloud.com/blog/microsoft-365-statistics-2026
- https://technologychecker.io/blog/google-vs-microsoft-market-share
- https://stat.gov.pl/files/gfx/portalinformacyjny/pl/defaultaktualnosci/5497/1/19/1/spoleczenstwo_informacyjne_w_polsce_2025.pdf
- https://ceo.com.pl/sztuczna-inteligencja-w-polsce-2026-dane-gus-51482

Inne polskie źródła -> arkusz:
- https://dataorganizer.io/integracje/
- https://dataorganizer.io/en/terms/
- https://dataorganizer.io/raport-sprzedazy-bez-excela/
- https://dataorganizer.io/integracja-shoper/
- https://zapier.com/apps/baselinker/integrations/google-sheets
- https://pipedream.com/apps/baselinker/integrations/google-sheets/get-cell-with-google-sheets-api-on-new-order-created-from-baselinker-api-int_QmsQ6DDe
- https://integrately.com/integrations/baselinker/google-sheets
- https://www.sheetxai.com/integrations/google-sheets/baselinker/create-purchase-orders
- https://spolecznosc.allegro.pl/t5/zaawansowani-sprzedawcy/zestawienie-sprzeda%C5%BCy-raport-jak-zrobi%C4%87/td-p/775770
- https://allegro.pl/pomoc/aktualnosci/od-dzis-mozesz-dodac-parametry-podatkowe-do-raportu-sprzedazy-Ag6k5LvVVCn
- https://excelfirma.com/poradnik/sprzedaz-allegro-excel/
- https://integrafy.pl/produkt/raport-przychodow-miesiecznych-sheets/
- https://automaciki.pl/product/wf-automat-wysylki-faktur-i-przypomnien/
