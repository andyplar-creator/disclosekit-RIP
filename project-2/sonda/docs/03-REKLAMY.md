# Kampania Google Ads dla testu

Uruchamiasz ją dopiero po wszystkich bramkach z `01-BRAMKI.md`, w tym po kliknięciu „Zacznij liczyć od teraz"
w panelu. Zarezerwuj 2 godziny na zbudowanie kampanii (Miss #7: w maju plan mówił 30–45 minut, wyszło prawie 3 godziny).

## Ustawienia

| Pole | Wartość |
|---|---|
| Typ | Sieć wyszukiwania. Bez sieci reklamowej, bez partnerów wyszukiwania. |
| Tryb | Ekspert. Nowe konto startuje w trybie „Smart": wyjdź z niego przed budową kampanii. |
| Lokalizacja | Polska, opcja „obecność" (osoby przebywające w Polsce), nie „zainteresowanie". |
| Język | polski |
| Stawki | Maksymalizacja kliknięć z limitem stawki. Limit ustaw na podstawie stawki z Planera. |
| Budżet | Dzienny = budżet testu podzielony przez liczbę dni, w które reklamy **naprawdę działają**. Przy harmonogramie „dni robocze" 4 tygodnie to 20 dni, więc 300 EUR (ok. 1 275 zł) daje ok. 64 zł dziennie. Google może w pojedynczym dniu wydać do dwóch razy więcej; w skali miesiąca wyrównuje. |
| Dopasowanie | Tylko do wyrażenia i ścisłe. Żadnego przybliżonego. |
| Grupy reklam | Dwie osobne: „Problem" i „Kategoria" (frazy w `01-BRAMKI.md`). Jeśli budżet jest mały, tylko „Problem". Fraz z grupy „Poza zakresem" nie kupujesz. |
| Harmonogram | Dni robocze, 7:00–18:00. Właściciel hurtowni nie szuka tego w sobotę wieczorem (wniosek, nie dane). |

## Adres docelowy i śledzenie

Końcowy adres URL reklamy:

```
https://TWOJ-ADRES/zamowienia-z-maila
```

Szablon śledzenia na poziomie kampanii:

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=plar-orders-test&utm_term={keyword}
```

Dzięki `utm_medium=cpc` Sonda zalicza wejście jako reklamowe, a `{keyword}` trafia do tabeli
„Wejścia z reklam według frazy". Google dopisuje też własny `gclid`, który Sonda również rozpoznaje.

Uwaga z maja: dwa linki do podstron z tym samym adresem końcowym blokują publikację. Albo nie dodawaj
linków do podstron, albo rozróżnij je parametrem (np. `?ref=cennik`).

## Wykluczające słowa kluczowe (start)

```
darmowy
darmowe
za darmo
wzór
szablon
praca
kurs
szkolenie
co to
definicja
allegro
ocr
pdf
skan
```

Trzy ostatnie słowa wykluczają osoby szukające odczytu skanów i plików PDF: strona tego wprost nie obiecuje.
Jeśli PLAR Orders to potrafi i chcesz to sprzedawać, usuń je stąd i dopisz obietnicę na stronie.

Uwaga z maja: podpowiadacz Google dopisuje frazy zawierające Twoje słowa wykluczające. Przejrzyj listę ręcznie
przed publikacją.

## Odmów po drodze

Wszystko poniżej jest domyślnie włączone i wymaga kliknięcia „Nie, dziękuję":

- sieć partnerów wyszukiwania,
- sieć reklamowa,
- AI Max i automatycznie tworzone zasoby,
- instalacja tagu Google (Sonda mierzy sama, bez tagu i bez ciasteczek).

## Treść reklam

Pisz o problemie, nie o technologii. Trzy kierunki nagłówków do przetestowania:

- „Zamówienia z maila bez przepisywania"
- „Koniec z przepisywaniem zamówień"
- „Zamówienia z maili i SMS-ów w jednym panelu"

W opisie: dla kogo (hurtownie i dystrybutorzy B2B), co się zmienia (operator zatwierdza zamiast przepisywać),
dowód (działa produkcyjnie od maja 2026). Nie obiecuj w reklamie niczego, czego nie ma na stronie.

## Codziennie (2 minuty)

1. Dopisz w panelu Sondy kliknięcia i koszt z poprzedniego dnia (formularz podpowiada wczorajszą datę).
   Bez tych liczb panel nie ogłosi NO-GO.
2. Porównaj kliknięcia wg Google z wejściami w Sondzie. Sonda zwykle widzi do ok. 20% mniej (przerwane ładowanie,
   podwójne kliknięcia). Dużo mniej oznacza problem z adresem lub szablonem śledzenia. Jeśli Sonda widzi wyraźnie
   więcej niż Google, nadwyżka to sztuczne wejścia; panel sam bierze do progów mniejszą liczbę.
3. Oceń nowe zgłoszenia i odpisz. Firmę, która weszła z reklamy, a ma źródło „inne", popraw przyciskiem.

## Dzień 2 i dzień 7: raport wyszukiwanych haseł

Statystyki → Wyszukiwane hasła. Czytaj to, co ludzie naprawdę wpisali, a nie nazwy słów kluczowych.
W maju pierwszy odczyt („86% intencji badawczej") opierał się na koszykach słów kluczowych i był błędny.

- Hasła nietrafione dopisz do wykluczających.
- Jeśli ponad połowa kliknięć pochodzi z nietrafionych haseł, test jest nieważny, a nie przegrany. Popraw
  kierowanie i licz od nowa.

## Kiedy przerwać

Panel ogłasza NO-GO dopiero po 200 wejściach z reklam potwierdzonych liczbami z Google Ads. Wcześniej zero
zgłoszeń niczego nie dowodzi: przy 60 wejściach i realnej konwersji ok. 1% zdarza się w mniej więcej połowie prób.

| Sytuacja | Decyzja |
|---|---|
| Po 7 dniach działania Google nie wydaje budżetu dziennego i jest mniej niż 30 kliknięć | Nie ma wolumenu. Koniec testu; wniosek: wyszukiwarka nie jest kanałem. |
| Po pierwszych 50 kliknięciach średni koszt kliknięcia przekracza ok. 6,40 zł | W budżecie 300 EUR nie dojdziesz do 200 kliknięć. Test może jeszcze dać GO, ale nie da NO-GO. Kontynuujesz tylko do końca budżetu. |
| Panel pokazuje GO | Dokończ zaplanowany budżet testu i obsługuj firmy ręcznie. Wydatki ponad 300 EUR to osobna decyzja: najpierw policz, ile kosztowało pozyskanie jednej firmy. |
| Budżet się skończył, GO nie ma, panel pokazuje „Nierozstrzygnięte" | Koniec. Nie dokładasz (decyzja zapisana w bramce 0a). Wniosek: kanał za drogi, żeby go uczciwie sprawdzić. |
| Panel pokazuje „Najpierw sprawdź i oceń" | Coś czeka na Ciebie: nieocenione zgłoszenie, firma ze źródłem „inne" albo brak liczb z Google. Uzupełnij i odśwież. |
| Panel pokazuje NO-GO | Wyłącz kampanię. Zanim uznasz wynik, przeczytaj raport wyszukiwanych haseł: jeśli większość kliknięć przyszła z nietrafionych haseł, test jest nieważny, a nie przegrany. Wtedy dozwolona jest jedna poprawka (nagłówek albo frazy) i liczenie od nowa. |
| 200 wejść albo 28 dni | Koniec. Bez dogrywek. |

## E-maile od Google, które możesz zignorować

Lekcja #8 z maja: „Skonfiguruj tag Google", „Skonfiguruj płatności" z etykietą reklam displayowych,
„Utwórz pierwszą kampanię", propozycje AI Max i partnerów wyszukiwania. Reaguj tylko na wiadomości
o odrzuceniu reklamy i o nieudanej płatności.
