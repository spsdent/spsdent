import React from "react";
import { PageWrapper } from "../../../components/PageWrapper";
import { Pattern } from "../../../components/Pattern";
import {
  SubPageContainer,
  HeaderImage,
  PageTitle,
  PageText,
  PageTextColumn,
  ComeBackButton,
  List,
  ListText,
  Container
} from "./OfferSubPageElements";
const Ortodoncja = () => {
  return (
    <PageWrapper>
      <Container>
      <HeaderImage
        image={'url("../ortodoncja.png")'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      <SubPageContainer
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Ortodoncja</PageTitle>
        <PageText>
          <PageTextColumn>
            Nie każdy posiada naturalnie równe i białe zęby. Wady zgryzu wcale
            nie występują tak rzadko – pojawiają się u wielu osób, ale dzisiaj
            istnieją nowoczesne metody ich korekty, które potrafią dać trwałe i
            efektowne rezultaty. Za leczenie wad zgryzu, eliminację stłoczeń
            zębów czy zbyt dużych szpar pomiędzy nimi odpowiedzialny jest
            ortodonta. <br></br>
            <br></br>
            Leczenie ortodontyczne może być prowadzone nie tylko u dzieci i
            młodzieży, jak uważa się powszechnie, ale także z powodzeniem u osób
            dorosłych niezależnie od wieku. Głównym warunkiem do rozpoczęcia
            leczenia jest zdrowie jamy ustnej – konieczne jest wyleczenie
            ubytków zębów oraz stanów zapalnych dziąseł. U dzieci z zębami
            mlecznymi zwykle nie jest konieczne noszenie aparatu
            ortodontycznego, chociaż w niektórych przypadkach jest to zalecane.
            <br></br>
            <br></br>U dzieci wykorzystuje się przede wszystkim aparaty ruchome
            – mają one formę plastikowej płytki z drucikami dopasowanymi do
            kształtu zębów, które przemieszczają je w odpowiednich kierunkach. U
            młodzieży i u osób dorosłych zaleca się korzystanie z aparatów
            stałych – metalowych, porcelanowych, szafirowych, które
            przytwierdzane są do powierzchni zębów i działają przez 24 godziny
            na dobę, pozwalając także na uzyskanie bardziej precyzyjnego efektu.
            <br></br>
            <br></br>
            Głównym celem leczenia jest uzyskanie odpowiedniego ustawienia zębów
            w łukach zębowych oraz prawidłowych kontaktów pomiędzy górnym a
            dolnym łukiem. Leczenie ortodontyczne nie tylko jest prowadzone w
            celu uzyskania odpowiedniego efektu estetycznego, ale również bywa
            przygotowaniem do dalszego leczenia chirurgicznego, protetycznego
            czy implantologicznego.
            <br></br>
            <br></br>
            Proces leczenia ortodontycznego:
            <List>
              <ListText>wizyta wstępna – badanie pacjenta</ListText>
              <ListText>pobranie wycisków łuków do gipsowych modeli</ListText>
              <ListText>wykonanie zdjęć RTG i ich analiza</ListText>
              <ListText>ustalenie planu leczenia ortodontycznego</ListText>
              <ListText>
                wykonane aparatu ruchomego lub założenie aparatu stałego
              </ListText>
              <ListText>regularne wizyty kontrolne</ListText>
              <ListText>
                zdjęcie aparatu po uzyskaniu pożądanego rezultatu
              </ListText>
              <ListText>
                wykonanie retencji w celu utrzymania efektów leczenia
              </ListText>
            </List>
            Naszym pacjentom zapewniamy kompleksową obsługę ortodontyczną –
            zapraszamy do nas dzieci oraz dorosłych!
            <br></br>
            <br></br>
            Dzięki oprogramowaniu diagnostycznemu{" "}
            <strong>CS Model (z modułem Model Builder)</strong> oraz programowi{" "}
            <strong>EXOCAD</strong> mamy mozliwość przygotowania wydruku 3D do
            postaci fizycznego modelu na drukarkach 3D. Dodatkowo oprogramowanie{" "}
            <strong>CS MODEL</strong> może służyć do planowania leczenia lub
            oceny postępów leczenia przez ortodontów na „elektronicznych
            wyciskach”, czyli zdigitalizowanych modelach gipsowych.<br></br>
            <br></br>
            Niezwykle pomocnym narzędziem diagnostycznym w ortodoncji jest CBCT
            - stomatologiczna tomografia komputerowa. Zapraszamy!
            <br></br>
            <br></br>
            <strong>Leczenie dzieci</strong> <br></br>
            <br></br>
            Pierwsza konsultacja ortodontyczna powinna się odbyć w wieku 7-8 lat
            (o ile stomatolog ogólny zajmujący się zachowawczym leczeniem zębów
            lub pediatra nie zauważy nieprawidłowości we wcześniejszym wieku) .
            Pacjent w wieku wczesnoszkolnym ma przeważnie stałe siekacze i
            pierwsze trzonowce. <br></br>
            <br></br>Lekarz ortodonta oceniając w tym wieku warunki zgryzowe
            oraz rozwój kości szczęki i żuchwy, może rozpoznać już istniejące
            wady zgryzu lub przewidzieć ich wystąpienie w późniejszym wieku w
            pełnym uzębieniu stałym. Oczywiście rozpoczęcie leczenia u dziecka
            jest w stanie większość z tych wad wyeliminować i znacznie poprawić
            warunki zgryzowe. Podczas leczenia dzieci stosujemy najczęściej
            aparaty ruchome ( płytowe lub blokowe) oraz proste, grubołukowe
            aparaty ortodontyczne cementowane na stałe. <br></br>
            <br></br> Czasami u dziecka stasowane są również aparaty
            zewnątrzustne, które wpływają pobudzająco lub hamująco na rozwój
            kości szczęk w przypadku ich znacznego niedorozwoju lub nadmiernego
            wzrostu. Takie „ortopedyczne” leczenie jest możliwe u dzieci ze
            względu na ciągły wzrost i przebudowę tkanki kostnej. Czasami są
            stosowane stałe, cienkołukowe aparaty ortodontyczne w formie
            częściowej.
          </PageTextColumn>
          <PageTextColumn>
            <strong>
              Objawy u dziecka wskazujące na potrzebę konsultacji
              ortodontycznej:{" "}
            </strong>
            <List>
              <ListText>Asymetria twarzy</ListText>
              <ListText>Nadmiernie wydłużona lub skrócona twarz</ListText>
              <ListText>Nadmiernie wysunięta lub cofnięta broda</ListText>
              <ListText>Nieprawidłowe nawyki (parafunkcje)</ListText>
              <ListText>
                Obgryzanie paznokci, skórek, przygryzane warg, błony śluzowej
                policzków, gryzienie długopisów
              </ListText>
              <ListText>
                Nieprawidłowe czynności fizjologiczne (dysfunkcje)
              </ListText>
              <ListText>
                Oddychanie ustami, spanie z otwartymi ustami, wtłaczanie języka
                pomiędzy zęby zwłaszcza przy połykaniu
              </ListText>
              <ListText>
                Przedłużone ssanie smoczka, palca lub picie z butelki
              </ListText>
              <ListText>Duże nieprawidłowości zębowe</ListText>
              <ListText>Duże stłoczenia lub szpary pomiędzy zębam</ListText>
              <ListText>
                Przedwczesna utrata zębów mlecznych z powodu próchnicy lub
                stanów zapalnych
              </ListText>
              <ListText>Problemy z wymową</ListText>
              <ListText>Problemy z odgryzaniem i żuciem pokarmów</ListText>
            </List>
            Oczywiście nie każdy z tych objawów musi oznaczać potrzebę leczenia
            ortodontycznego ale o tym powinien zadecydować lekarz.
            <br></br>
            <br></br>
            <strong>Leczenie dorosłych</strong> <br></br>
            <br></br>
            Ze względu na szeroki wachlarz nowych metod leczenia i aparatów
            ortodontycznych dzisiejsza ortodoncja jest również skierowana do
            starszej młodzieży i osób dorosłych. Bardzo często leczenie
            ortodontyczne jest częścią leczenia zespołowego (stomatolog ogólny,
            chirurg stomatologiczny, protetyk), gdzie pacjent jest
            przygotowywany do wykonania uzupełnień protetycznych lub zabiegów
            implantologicznych. <br></br>
            <br></br>Również u niektórych pacjentów z problemami
            periodontologicznymi leczenie ortodontyczne pozwala ustabilizować
            zęby i przedłużyć ich żywotność w jamie ustnej. Dużą grupę pacjentów
            dorosłych stanowią pacjenci z wadami twarzowo-szczękowymi, u których
            wada ma podłoże genetyczne i leczenie można rozpocząć po zakończonym
            wzroście ok. 18-20 rok życia. U tych pacjentów leczenie
            ortodontyczne polega na przygotowaniu ich do zabiegu operacyjnego
            przeprowadzanego przez chirurga szczękowo-twarzowego. Leczenie
            pacjentów dorosłych jest prowadzone zazwyczaj przy pomocy aparatów
            stałych cienkołukowych oraz dodatkowych.
            <br></br>
            <br></br>
            <strong>
              Objawy u starszej młodzieży i dorosłych wskazujące na potrzebę
              konsultacji ortodontycznej:
            </strong>
            <List>
              <ListText>Asymetrie twarzy</ListText>
              <ListText>Nadmiernie wydłużona lub skrócona twarz</ListText>
              <ListText>Nadmiernie wysunięta lub cofnięta broda</ListText>
              <ListText>
                Nieprawidłowe nawyki (parafunkcje) - obgryzanie paznokci,
                skórek, przygryzane warg, błony śluzowej policzków, gryzienie
                długopisów
              </ListText>
              <ListText>
                Nieprawidłowe czynności fizjologiczne (dysfunkcje) - oddychanie
                ustani, spanie z otwartymi ustami, wtłaczanie języka pomiędzy
                zęby zwłaszcza przy połykaniu
              </ListText>
              <ListText>
                Duże nieprawidłowości zębowe- duże stłoczenia lub szpary
                pomiędzy zębami
              </ListText>
              <ListText>
                Pacjenci z przetrwałymi zębami mlecznymi w jamie ustnej lub z
                zatrzymanymi zębami stałymi
              </ListText>
              <ListText>Problemy z wymową</ListText>
              <ListText>Problemy z odgryzaniem i żuciem pokarmów</ListText>
              <ListText>Zgrzytanie lub zaciskanie zębów</ListText>
              <ListText>Nadmierne starcie zębów</ListText>
              <ListText>
                Zaburzenia w stawie skroniowo-żuchwowym – trzaski, trzeszczenia,
                ograniczenie ruchomości, ból
              </ListText>
              <ListText>
                Pacjenci przygotowywani do leczenia protetycznego lub
                implantologicznego
              </ListText>
              <ListText>
                Pacjenci z zębami w zgryzie urazowym z problemami
                periodontologicznymi w okolicy tych zębów (odsłonięta szyjka lub
                korzeń, znaczna ruchomość zęba)
              </ListText>
              <ListText>
                Pacjenci ze złamanymi korzeniami poniżej linii dziąsła w celu
                jego „wyciągnięcia” i wykorzystania pod odbudowę protetyczną
              </ListText>
            </List>
            Oczywiście nie każdy z tych objawów musi oznaczać potrzebę leczenia
            ortodontycznego ale o tym powinien zadecydować lekarz.
          </PageTextColumn>
        </PageText>
        <ComeBackButton to="/offer">Powrót do oferty</ComeBackButton>
      </SubPageContainer>
      <Pattern
        src="../Pattern.png"
        top="45%"
        left="40%"
        transition={{ duration: 2 }}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
      />
      </Container>
    </PageWrapper>
  );
};

export default Ortodoncja;
