# PlantEye - Rozpoznawanie rodzajów chorób u roślin
## Cel projektu
Wiele osób w dzisiejszych czasach, mimo dostępu do fachowej wiedzy na wyciągnięcie ręki, ma problem z opięką nad swoimi roślinami domowymi. 
Powodem tej tendecji może być brak czasu na zgłębienie tematu, trudności w przekuciu teorii w praktykę, lub najczęstszy przypadek - przysłowiowy "brak ręki do roślin". 
Na wszystkie te problemy odpowiada aplikacja **PlantEye**. Dzięki niej, użytkownik za pomocą jednego zdjęcia rośliny oraz kilku kliknięć, będzie w stanie zrozumieć
podłoże choroby swojej rośliny - dzięki klasyfikacji chorób, a nawet od razu przejść do działania - dzięki zawartym w aplikacji wskazówkom dotyczącym traktowania 
chorej rośliny.

## Opis projektu i diagram architektury
Projekt zbudowany jest na bazie 2 warstw:
* Frontend - stworzony w języku TypeScript, przy użyciu biblioteki React, postawiony na Azure Web Apps.

* Backend - w którego skład wchodzą:

  * Azure Functions - stworzony w języku Python, wykorzystywany do "łączenia" frontendu z backendem. Zapytanie z obrazem jest przekazywane do API Custom Vision, gdzie następuje klasyfikacja, a następnie 
zwracana jest odpowiedź do Azure Functions. Odpowiedź jest przetwarzana (między innymi wzbogacana o wskazówki) i przesyłana na Frontend.

  * Azure Custom Vision - odpowiedzialny za klasyfikację otrzymanego obrazu i określenie najbardziej prawdopodobnego z pięciu stanów rośliny: zdrowa, choroba pasożytnicza,
choroba wirusowa, choroba grzybowa, choroba bakteryjna. Następnie wynik klasyfikacji przekazywany jest do Azure Functions.

![This is an image](/diagram.jpg)

## Opis działania aplikacji
PlantEye jest aplikacją webową, dzięki której użytkownik może poznać podłoże choroby swojej rośliny, dzięki wgraniu jednego zdjęcia. Zdjęcie powinno przedstawiać
zbliżenie na chorą część rośliny (najlepiej liście), w dobrej jakości oraz w dobrych warunkach oświetleniowych. Akceptowane formaty plików to: jpg, png, bnp. 
Maksymalny rozmiar pliku to 6 MB. Po wejściu na stronę:
* Użytkownik uploaduje wcześniej wykonane zdjęcie rośliny z podejrzeniem choroby.
* Użytkownik zatwiedza/klika przycisk.
* Po chwili użytkownik otrzymuje jedną z pięciu klasyfikacji choroby oraz wskazówki dotyczące dalszych działań.
* Jeśli użytkownik uważa klasyfikację za błędną lub niedokładną, robi nowe zdjęcie i powtarza proces.

## Demonstracja aplikacji:
 [Prezentacja aplikacji](https://youtu.be/Qs1Xk0x3tXE)
## Autorzy:
* [Patrycja Modzelewska](https://github.com/modzelpatrycja)
* [Jakub Komorowski](https://github.com/KomorowskiKuba)
* [Marcin Kowalczyk](https://github.com/kowalczy)

