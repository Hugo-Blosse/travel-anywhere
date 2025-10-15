# Projekt: Podróżuj gdziekolwiek
_Od czasu powstania takich serwisów jak couch surfing, airb2b, booking.com, kayak, flightradar czy narodzenia się linii lotniczy Buzz wśród turystów narodziła się nowa grupa podróżników-turystów, który za podstawowy cel swoich letnich wakacji stawiają sobie ich samodzielne zorganizowanie. Ostatecznie korzystają z tych samych linii lotniczych, hoteli czy wypożyczalni samochodów, co klienci agencji turystycznych, z tą różnicą że za turysta-podróżnik za punkt honoru stawia sobie omijanie biur TUI, ITAKI czy Neccermana._
__Celem projektu jest stworzenie narzędzia pozwalającego na tustystom-podróżnikom na samodzielne wyszukiwanie hoteli, wypożyczalni samochodów czy lotnisk, z których powinni skorzystać wybierając się w dowolne miejsce, które można opisać za pomocą współrzędnych geograficznych__

## Wymagania funkcjonalne

- Jako turysta-podróżnik wybierający się do punktu Lon1, Lat1 chciałbym wiedzieć gdzie znajduje się najbliższe lotnisko i najbliższa wypożyczalnia samochodów (względem mojego miejsca docelowego). 
- Jako turysta-podróżnik wybierający się do punktu Lon1, Lat1 chciałbym wiedzieć gdzie znajduje się najbliższy hotel. 
- Wyniki wyszukiwania powinny być wyświetlane w panelu po prawej stronie ekranu w formie listy.
  - Lista wyników powinna zawierać:
    - Tytuł: `"<Name>"`
    - Dystans: `"Distance: <distance> KM"`
    - Adres: `"Address: <street>"`
    - Kraj: `"Country: <country>"`
    - Przycisk zamówienia (dla kategorii `hotel`):
      - Typ: przycisk
      - Etykieta: `"Order"`
      - Powinien nawigować do formularza rezerwacji.
  - Jeśli pole jest puste, nie powinno być wyświetlane.
- Wyniki wyszukiwania mogą być filtrowane za pomocą przycisków radiowych dla kategorii:
  - hotel
  - air
  - rail
  - car
- Jeśli nie znaleziono wyników, powinna być wyświetlana wiadomość: `"No results found. Click on map to select different location."`
- W przypadku błędu podczas pobierania lokalizacji powinna być wyświetlana wiadomość: `"Failed to fetch locations. You may not be logged in."`
- Użytkownik powinien mieć możliwość kliknięcia na mapę, aby wybrać nowe współrzędne geograficzne i ponowić wyszukiwanie.

## Wymagania niefunkcjonalne
- Wyszukiwarka powinna korzystać z SABRE API Geo Search V4 API
  - The Geo Search V4 API identifies airports, hotels, and car rental locations that fall within a given geographic search location using a radius search. It has three different types of location resolutions:
    - An airport or multi-airport city (MAC) code
    - A Geo (latitude and longitude) code
    - The name of the location (e.g. town or city name)
    - From <https://developer.sabre.com/docs/rest_apis/utility/geo_search>
- Wyszukiwarka powinna być dostępna z dowolnego urządzenia.
- Narzędzie powinno pozwalać na zapisywanie podróży.
- Pola wejścia do aplikacji:
  - Pole longitude & latitude
  - Opcje wyboru (hotel, lotnisko, wypożyczalnia samochodów)
- Aplikacja powinna wyświetlać mapę z możliwością interakcji, w tym:
  - Wyświetlanie markerów dla wyników wyszukiwania.
  - Wyświetlanie markera w miejscu kliknięcia użytkownika.
  - Obsługę zdarzeń kliknięcia na mapę.