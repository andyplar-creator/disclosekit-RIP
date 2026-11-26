# Kampania Google Ads dla testu

Uruchamiasz ją dopiero po bramkach z `01-BRAMKI.md`. Zarezerwuj 2 godziny na zbudowanie kampanii
(Miss #7: w maju plan mówił 30–45 minut, wyszło prawie 3 godziny).

## Ustawienia

| Pole | Wartość |
|---|---|
| Typ | Sieć wyszukiwania. Bez sieci reklamowej, bez partnerów wyszukiwania. |
| Tryb | Ekspert. Nowe konto startuje w trybie „Smart": wyjdź z niego przed budową kampanii. |
| Lokalizacja | Polska, opcja „obecność" (osoby przebywające w Polsce), nie „zainteresowanie". |
| Język | polski |
| Stawki | Maksymalizacja kliknięć z limitem stawki. Limit ustaw na podstawie stawki z Planera. |
| Budżet | Dzienny = budżet testu podzielony przez 21–28 dni. Łącznie do 300 EUR. |
| Dopasowanie | Tylko do wyrażenia i ścisłe. Żadnego przybliżonego. |
| Grupy reklam | Dwie osobne: „problem" i „kategoria" (frazy w `01-BRAMKI.md`). Jeśli budżet jest mały, tylko „problem". |
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
```

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

1. Dopisz w panelu Sondy kliknięcia i koszt z poprzedniego dnia.
2. Porównaj kliknięcia wg Google z wejściami w Sondzie. Różnica ponad 20% oznacza problem z adresem lub śledzeniem.
3. Oceń nowe zgłoszenia i odpisz.

## Dzień 2 i dzień 7: raport wyszukiwanych haseł

Statystyki → Wyszukiwane hasła. Czytaj to, co ludzie naprawdę wpisali, a nie nazwy słów kluczowych.
W maju pierwszy odczyt („86% intencji badawczej") opierał się na koszykach słów kluczowych i był błędny.

- Hasła nietrafione dopisz do wykluczających.
- Jeśli ponad połowa kliknięć pochodzi z nietrafionych haseł, test jest nieważny, a nie przegrany. Popraw
  kierowanie i licz od nowa.

## Kiedy przerwać

| Sytuacja | Decyzja |
|---|---|
| Po 7 dniach Google nie wydaje budżetu dziennego i jest mniej niż 30 kliknięć | Nie ma wolumenu. Koniec testu; wniosek: Google nie jest kanałem. |
| Po pierwszych 50 kliknięciach średni koszt kliknięcia przekracza 6,50 zł | Do 200 kliknięć nie dojdziesz w budżecie. Zdecyduj: kończysz na 60 albo przerywasz. |
| Panel pokazuje GO | Zostaw reklamy włączone i obsługuj firmy ręcznie. |
| Panel pokazuje NO-GO po 60+ wejściach z trafnych haseł | Wyłącz kampanię. Jedna poprawka (nagłówek albo frazy) jest dozwolona tylko wtedy, gdy raport haseł pokazuje złą intencję. |
| 200 wejść albo 28 dni | Koniec. Bez dogrywek. |

## E-maile od Google, które możesz zignorować

Lekcja #8 z maja: „Skonfiguruj tag Google", „Skonfiguruj płatności" z etykietą reklam displayowych,
„Utwórz pierwszą kampanię", propozycje AI Max i partnerów wyszukiwania. Reaguj tylko na wiadomości
o odrzuceniu reklamy i o nieudanej płatności.
