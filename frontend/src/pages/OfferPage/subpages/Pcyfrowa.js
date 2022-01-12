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
  Container,
} from "./OfferSubPageElements";
const Pcyfrowa = () => {
  return (
    <PageWrapper>
      <Container>
        <HeaderImage
          image={'url("../pcyfrowa.png")'}
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        />
        <SubPageContainer
          initial={{ y: -400, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PageTitle>Protetyka Cyfrowa</PageTitle>
          <PageText>
            <PageTextColumn>
              Najnowocześniejsza technologia już dostępna dla naszych pacjentów!
              Skaner wewnątrzustny <strong>CARESTREAM CS3600</strong> to cyfrowe
              urządzenie do wykonywania elektronicznego obrazu jamy ustnej-
              wirtualnego wycisku. Zalety dla pacjenta:- wyeliminowanie
              nielubianego przez pacjentów etapu pobierania wycisku za pomocą
              masy wyciskowej - skrócenie czasu oczekiwania na uzupełnienie
              protetyczne (koronę, most, licówkę) - zwiększona dokładność i
              estetyka wykonywanej pracy protetycznej.
              <br></br>
              <br></br>
              Skaner zastępuje tradycyjny wycisk wykonywany za pomocą
              plastycznych mas protetycznych. Wirtualny „wycisk” daje znaczenie
              większe poczucie komfortu pacjentom którzy często miewają
              nieprzyjemne odczucia przy stosowaniu tradycyjnej metody
              wyciskowej. <br></br> <br></br>
              Cyfrowy wycisk jest wykorzystywany do wykonania precyzyjnych
              uzupełnień w technice <strong>CAD/CAM</strong>: koron, licówek,
              wkładów, nakładów, mostów oraz łączników do implantów.
            </PageTextColumn>
            <PageTextColumn>
              Bezpośrednio po zeskanowaniu jamy ustnej pacjenta i uzyskaniu
              obrazu, jest on wysyłany do specjalistycznej placówki
              protetycznej. W ciągu zaledwie kilku minut od pobrania i wysłania
              wycisku można zacząć projektowanie pracy końcowej, co znacznie
              skraca czas wykonania ale także zwiększa precyzyjność uzupełnienia
              protetycznego. Dzięki tej metodzie prace są trwalsze,
              estetyczniejsze, a czas oczekiwania pacjenta na gotową pracę jest
              wyraźnie skrócony.
              <br></br>
              <br></br>
              Stosowanie technologii <strong>CAD/CAM</strong> w stomatologii
              prowadzi do zwiększenia precyzji wykonywanych zabiegów. Odbudowy
              protetyczne wykonane za pomocą technologii{" "}
              <strong>CAD/CAM</strong> są dokładniejsze, szczelniejsze i
              trwalsze w porównaniu do uzupełnień wykonanych metodą tradycyjną.{" "}
              <br></br>
              <br></br>
              Prezyzyjny dobór koloru uzupełnienia protetycznego zapewnia nam
              EasyShade.
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

export default Pcyfrowa;
