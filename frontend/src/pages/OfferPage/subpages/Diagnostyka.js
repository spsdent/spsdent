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
const Diagnostyka = () => {
  return (
    <PageWrapper>
      <Container>
      <HeaderImage
        image={'url("../diagnostyka.png")'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      <SubPageContainer
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Diagnostyka</PageTitle>
        <PageText>
          <PageTextColumn>
            W <strong>SPS Dental Clinic</strong> dysponujemy supernowoczesnym
            sprzętem wyposażonym w najnowsze technologie umożliwiające
            diagnostykę oraz leczenie.
            <br></br>
            <br></br>
            Za pomocą <strong>VITA EasyShade Compact</strong> szybko i
            jednoznacznie możemy okreslić kolor zębów Pacjenta jak również kolor
            uzupełnienia protetycznego.
            <br></br>
            <br></br>
            <strong>Ocena stanu jamy ustnej:</strong>
            <br></br> Podczas pierwszego etapu wprawne oko stomatologa ocenia
            zmiany próchnicowe (caries dentium), ich stadium oraz położenie
            powierzchniowe. Niezwykle trudno rozpoznać zmiany próchnicowe w ich
            początkowym stadium oraz te, które umiejscowione są na
            powierzchniach stycznych zębów i w głębokich bruzdach zębów tylnych.
            Najczęściej diagnozuje się próchnicę już w stadium rozwiniętym i
            nieodwracalnym, przez co konieczne jest wdrożenie leczenia
            zachowawczego. <br></br>
            <br></br>Warto podkreślić, że lekarz stomatolog podczas oceniania
            stanu jamy ustnej nie tylko rozpoznaje ogniska próchnicowe. Zwraca
            również uwagę na stan błony śluzowej jamy ustnej, dziąseł i
            przyzębia, szuka niepokojących zmian, które mogą być ogniskiem
            nowotworowym. Dodatkowo sprawdza stan węzłów chłonnych, gdyż często
            toczące się stany zapalne zębów objawiają się zmianami w ich
            anatomii.
            <br></br><br></br>
            <strong>Warto wiedzieć</strong>
            <br></br><br></br>
            Panorama to najczęściej wykonywany rodzaj zdjęcia stomatologicznego. Przedstawia ono szczękę i żuchwę wraz ze wszystkimi strukturami, tj. zatokami, stawami skroniowo-żuchwowymi oraz kośćmi. Powinno się je wykonywać raz na 2-3 lata lub częściej, jeśli są ku temu wskazania medyczne. Warto gromadzić takie zdjęcia, gdyż są skarbnicą wiedzy o zmianach, które zachodzą w naszej jamie ustnej.
          </PageTextColumn>
          <PageTextColumn>
            <strong>Prześwietlamy zęby!</strong> <br></br>Drugi etap
            diagnozowania wszelkich niepokojących zmian w jamie ustnej to
            badanie radiologiczne. Stosuje się je w celu zobrazowania
            pojedynczego zęba, kości twarzoczaszki, tkanek kostnych szczęki i
            żuchwy. Dzięki diagnostyce obrazowej można także szczegółowo
            przeanalizować układ zębów (to ważne w leczeniu ortodontycznym,
            protetycznym i implantologicznym), zmiany patologiczne (torbiele,
            ziarniniaki, nowotwory), jak również wykryć próchnicę na
            powierzchniach stycznych zębów. Próchnica na zdjęciu radiologicznym
            uwidacznia się jako swoiste przejaśnienie na tkankach twardych zęba.
            <br></br>
            <br></br>
            Wyróżniamy dwa typy zdjęć radiologicznych: wewnątrzustne
            (przylegające i zgryzowe) i zewnątrzustne. Zdjęcia wewnątrzustne
            przylegające obrazują jedynie niewielką część przestrzeni w jamie
            ustnej - do trzech zębów. Z kolei zdjęcie zgryzowe uzyskuje się
            poprzez umieszczenie kliszy w powierzchni zgryzowej zębów, dzięki
            czemu można zdobyć wiedzę o wadach zgryzu, zmianach chorobotwórczych
            różnego typu, kamieniach tworzących się w śliniankach oraz
            niewidocznych zębach.
            <br></br>
            <br></br>
            <strong>Zdjęcia zewnątrzustne to:</strong>
            <List>
              <ListText>zdjęcie panoramiczne</ListText>
              <ListText>
                tomografia komputerowa CT (computed tomography)
              </ListText>
              <ListText>
                tomografia wiązki stożkowej CBTC (cone beam computed tomography)
              </ListText>
              <ListText>badanie 3D</ListText>
            </List>
            Nie należy bać się diagnostyki radiologicznej. Poziom promieniowania
            stosowany przez specjalistyczne urządzenia do efektywnej ekspozycji
            jest niski. Samo badanie nie jest dla Pacjenta uciążliwe, a pozwala
            uzyskać precyzyjne zdjęcie w bardzo krótkim czasie. Diagnostyka
            stomatologiczna umożliwia postawienie pełnej i prawidłowej diagnozy
            dotyczącej stanu zdrowia jamy ustnej Pacjenta. Zastosowanie
            nowoczesnych technik wiąże się z kosztami, jednak dzięki
            profilaktyce możemy uniknąć znacznie większych wydatków w
            przyszłości.
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

export default Diagnostyka;
