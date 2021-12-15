import React from "react";
import { PageWrapper } from "../../../components/PageWrapper";
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
const OfferRtg = () => {
  return (
    <PageWrapper>
      <SubPageContainer>
        <HeaderImage />
        <PageTitle>Rtg - 3D</PageTitle>
        <PageText>
          <PageTextColumn>
            W <strong>SPS Dental Clinic</strong> zapewniamy Państwu pełną
            diagnostykę radiologiczną niezbędną do leczenia zębów. Mamy do
            dyspozycji takie urządzenia do nowoczesnej diagnostyki
            radiologicznej, jak:
            <List>
              <ListText>
                Rentgen punktowy zębów – radiowizjografia punktowa 2D MyRay
                zlokalizowana przy każdym fotelu stomatologicznym pozwala w
                szybki i bezpieczny sposób przy minimalnej dawce promieniowania
                zrobić jeszcze na fotelu (nawet w trakcie zabiegu) zdjęcię
                pojedynczego zęba.
              </ListText>
              <ListText>
                Rentgen panoramiczny pozwala na robienie zdjęć
                pantomograficznych 2D zębów, które służą do wykrywania
                większości zmian , pozwala też wstępnie zaplanować leczenie.
              </ListText>
              <ListText>
                Tomografia zębów 3D  tomografia komputerowa 3D zębów jest
                niezbędna:
              </ListText>
            </List>
            Przed leczeniem implantologicznym <br></br>skan 3D umożliwia
            ocenę ilości, objętości i jakości kości u pacjenta, potrzebnej do
            wszczepienia implantu zębowego. Na jego podstawie czas zabiegu
            chirurgicznego zostaje skrócony, a ryzyko powikłań znacząco
            zmniejszone,<br></br> w kierunku diagnostyki chorób zatok
            szczękowych oraz stanu kości szczęk i żuchwy co jest wykorzystane
            przez periodontologa lub chirurga do dalszych zabiegów <br></br> w
            diagnostyce trudnych przypadków leczenia kanałowego
            (endodontycznego) <br></br> np. w celu lokalizacji złamanego
            narzędzia lub odnalezienia dodatkowego kanału w korzeniu zęba itp.
            Wykonywana jest wówczas mikrotomografia CBCT.
          </PageTextColumn>
          <PageTextColumn>
            Badania tomografii komputerowej wykonywane są za pomocą nowoczesnego
            tomografu <strong>Kodak Carestream 8100 3D.CS 8100</strong> to
            najbardziej innowacyjny na świecie tomograf CBCT i pantomograf.
            <br></br>
            <br></br>Nasz aparat pozwala na wykonanie zdjęcia
            mikrotomograficznego (CBCT), czyli zdjęcia tylko wybranego odcinka
            szczęki lub żuchwy w najwyższej rozdzielczości dostępnej na rynku
            przy minialnym naświetleniu pacjenta. Bezpieczeństwo badania
            tomograficznego zębów Zdrowie i bezpieczeństwo naszych pacjentów są
            dla nas najważniejsze, dlatego też korzystamy z najbardziej
            zaawansowanego technologicznie sprzętu, który pozwala na wykonywanie
            badań ze zredukowaną aż o 75%-90% dawką promieniowania
            rentgenowskiego (<strong>Inteligentny System Kontroli Dawki</strong>
            ).
            <br></br> <br></br>
            Przeciwwskazaniem do wykonywania zabiegu jest ciąża. Jeżeli
            wykonanie badania jest nieuniknione w tym okresie, konieczne jest
            zastosowanie maksymalnej ochrony płodu przed rozwiązaniem. UWAGA! W
            celu wykonania zdjęcia rentgenowskiego niezbędne jest posiadanie
            skierowania od lekarza, na którym jasno określone zostało miejsce
            badania oraz cel wykonania badania.
          </PageTextColumn>
        </PageText>
        <ComeBackButton to="/offer">Powrót do oferty</ComeBackButton>
      </SubPageContainer>
      <div></div>
    </PageWrapper>
  );
};

export default OfferRtg;
