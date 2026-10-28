## Zadanie 1 część 4

### Test 1 - funkcjonalność: poprawnie znalezienie lokalizacji

- identyfikator testu: znalezienie_hoteli_lotnisk_i_wypozyczalni_samochodowych

- warunki wejściowe: uruchom aplikacje, zaloguj się, upewnij się że filtrowanie po hotelach, lotniskach i wypożyczalniach samochodowych jest włączone

- kroki testowe:

  - kliknij na rynek w Krakowie

- oczekiwany rezultat:

  - na mapie pojawi się ikona lotniska, hoteli i wypożyczalni samochodowych, a w prawej stronie ekranu wyświetlą się informacje o znalezionych lokacjach, posortowane od najbliższej

### Test 2 - funkcjonalność: informacja o braku wyników wyszukiwania

- identyfikator testu: brak_wynikow_wyszukiwania

- warunki wejściowe: uruchom aplikacje, zaloguj się, upewnij się że filtrowanie po hotelach, lotniskach i wypożyczalniach samochodowych jest włączone

- kroki testowe:

  - kliknij na obszar Ankoro na południowy zachód od miasta Kalemie, które jest położone na wschodzie Republiki Demokratycznej Kongo

- oczekiwany rezultat:

  - w prawej stronie ekranu wyświetli się informacja o braku wyników wyszukiwania "No results found. Click on map to select different location."

### Test 3 - funkcjonalność: działanie filtru wyszukiwania

- identyfikator testu: filtracja_hotel_wlaczona_i_lotnisko_wylaczona

- warunki wejściowe: uruchom aplikacje, zaloguj się, upewnij się że filtrowanie po hotelach jest włączone i filtrowanie po lotniskach jest wyłączone

- kroki testowe:

  - kliknij na obszar miasta Kalemie położonego na wschodzie Republiki Demokratycznej Kongo

- oczekiwany rezultat:

  - na mapie pojawi się tylko ikona hotelu i w prawej stronie ekranu wyświetli się tylko informacja o hotelu 'sdk_hotel'