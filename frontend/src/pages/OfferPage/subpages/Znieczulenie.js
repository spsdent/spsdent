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
} from "./OfferSubPageElements";
const Znieczulenie = () => {
  return (
    <PageWrapper>
      <HeaderImage
        image={'url("../znieczulenie.png")'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      <SubPageContainer
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Znieczulenie ogólne</PageTitle>
        <PageText>
          <PageTextColumn>
            Przeprowadzamy leczenie stomatologiczne w znieczuleniu ogólnym czyli
            narkozie. <br></br>
            <br></br>Narkoza jest znieczuleniem ogólnym polegającym na
            farmakologicznym wprowadzeniu pacjenta w stan snu. Umożliwia to
            wykonanie bardziej złożonych zabiegów i uniknięcie bólu oraz stresu,
            jakie wiążą się zwykle ze znieczuleniem miejscowym. Należy dodać, iż
            narkoza jest podawana oraz kontrolowana przez lekarza anestezjologa
            współpracującego z pielęgniarką anestezjologiczną. <br></br>
            <br></br>Lekarz kwalifikuje pacjenta do zabiegu narkozy na podstawie
            szczegółowego wywiadu. Wywiad ten dotyczy wszystkich przebytych oraz
            aktualnych chorób, alergii, jak również zażywanych leków. Na
            postawie wywiadu lekarz wybiera najkorzystniejszą metodę
            znieczulenia ogólnego.
            <br></br>
            <br></br>
            <strong>
              W znieczuleniu tym proponujemy naszym Pacjentom zabiegi z zakresu:{" "}
            </strong>
            <List>
              <ListText>chirurgii stomatologicznej</ListText>
              <ListText>implantologii</ListText>
              <ListText>stomatologii zachowawczej</ListText>
              <ListText>endodoncji (leczenie kanałowe)</ListText>
              <ListText>stomatologii wieku dziecięcego</ListText>
            </List>
            Wszystkie zabiegi wykonywane są pod stałą opieką i nadzorem
            anestezjologa. Pacjent może być pewien, iż jest w rękach
            profesjonalistów z wieloletnim doświadczeniem.
          </PageTextColumn>
          <PageTextColumn>
            Wskazaniami do narkozy może być silna obawa przed zabiegiem,
            wzmożony odruch wymiotny lub choroby umysłowe – wszystko to, co
            uniemożliwia przeprowadzenie koniecznych zabiegów. Narkoza polega na
            podaniu środka, który prowadzi do całkowitej i odwracalnej utraty
            świadomości.{" "}
            <strong>
              Jest to zabieg bardzo naturalny, którego historia sięga czasów
              starożytnych.
            </strong>
            <br></br>
            <br></br> Przed zabiegiem, jakim jest narkoza, pacjent nie powinien
            jeść i pić przez okres co najmniej 5 godzin. Nie należy również
            przyjmować lekarstw bez wiedzy anestezjologa. Ponadto pacjent
            powinien również przyjechać z opiekunem, który odwiezie go po
            zabiegu.<br></br>
            <br></br> Należy dodać, iż w dniu narkozy pacjent pod żadnym pozorem
            nie może prowadzić samochodu ani obsługiwać żadnych urządzeń
            mechanicznych. Wszystkich szczegółowych zaleceń dotyczących
            stosowania leków po narkozie udziela lekarz anestezjolog. Nie tylko
            kwalifikuje on pacjenta do zabiegu, ale również wraz z pielęgniarką
            anestezjologiczną czuwa w trakcie trwania zabiegu, który wykonuje
            stomatolog.<br></br>
            <br></br> Dzięki narkozie podanej pacjentowi, lekarz stomatolog może
            przeprowadzić nawet bardziej skomplikowane zabiegi, a sam pacjent
            unika dyskomfortu oraz bólu.{" "}
            <strong>
              Jeśli mają Państwo jakiekolwiek pytania dotyczące narkozy,
              zapraszamy do kontaktu – chętnie udzielimy bardziej szczegółowych
              informacji. Pozostajemy do Państwa dyspozycji.
            </strong>
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
    </PageWrapper>
  );
};

export default Znieczulenie;
