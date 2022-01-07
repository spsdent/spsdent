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
const Pip = () => {
  return (
    <PageWrapper>
      <Container>
      <HeaderImage
        image={'url("../pip.png")'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      <SubPageContainer
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Profilaktyka i Periodontologia</PageTitle>
        <PageText>
          <PageTextColumn>
            Oryginalna terapia<strong> AIR-FLOW</strong> i metoda{" "}
            <strong>Piezon</strong> teraz dostępne razem, gwarantują zarówno
            kompletne i skuteczne leczenie profilaktyczne, jak również najwyższy
            komfort dla pacjenta. Urządzenie{" "}
            <strong>AIR-FLOW Master Piezon</strong> zapewnia skaling w
            technologii no pain oraz piaskowanie <strong>AIR-FLOW</strong>{" "}
            naddziąsłowe, przydziąsłowe i poddziąsłowe zarówno w płytkich, jak i
            głębokich kieszonkach.
            <br></br>
            <br></br>
            Terapia <strong>AIR-FLOW®</strong> zapewnia piaskowanie, które jest
            skuteczne zarówno dla lekarza, jak i pacjenta. Bezstresowe ciche i
            komfortowe dla pacjenta.
            <br></br>
            <br></br>
            <strong>Metoda Piezon</strong> zapewniająca idealne liniowe drgania
            końcówki roboczej oraz jej odpowiednie ustawienie do powierzchni
            zęba, w połączeniu z inteligentną technologią NO PAIN zapewnia
            maksymalną ochronę dziąseł oraz najwyższy komfort dla pacjenta.
            Zalety terapii <strong>Air-Flow</strong> i{" "}
            <strong>Air-Flow Perio</strong>:
            <List>
              <ListText>
                Doskonałe piaskowanie; niezawodne, szybkie i skuteczne
              </ListText>
              <ListText>
                Bezstresowa i komfortowa dla pacjenta (bez użycia kiret – bez
                hałasu!)
              </ListText>
            </List>
          </PageTextColumn>
          <PageTextColumn>
            <List>
              <ListText>Delikatne wykorzystanie energii kinetycznej</ListText>
              <ListText>Bezinwazyjna dla nabłonka oraz tkanki łącznej</ListText>
              <ListText>Bez zarysowań na powierzchni zębów</ListText>
              <ListText>
                Skutecznie usuwa biofilm nawet z najgłębszych kieszonek, trwale
                zmniejsza ilość bakterii
              </ListText>
              <ListText>
                Zapobiega przed utratą zęba (periodontitis) i utratą implantu (
                periimplantitis)
              </ListText>
              <ListText>
                Jednolita, wirująca mieszanina powietrza i piasku oraz płukanie
                wodą dzięki opatentowanej końcówce <strong>PERIO-FLOW</strong>
              </ListText>
              <ListText>Zapobiega emfizemie tkanki miękkiej</ListText>
            </List>
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

export default Pip;
