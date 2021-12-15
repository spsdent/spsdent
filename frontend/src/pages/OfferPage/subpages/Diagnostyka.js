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
const Diagnostyka = () => {
  return (
    <PageWrapper>
      <HeaderImage
        image={'url("../dds.png")'}
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
            <strong>DDS</strong> oznacza{" "}
            <strong>Doctor of Dental Surgery</strong>. Jest to końcowy stopień
            studiów stomatologicznych. W rzeczywistości każdy dentysta w USA
            musi ukończyć ten poziom studiów, aby uzyskać licencję na praktykę.
            Typowy stopień <strong>DDS</strong> daje wszechstronną wiedzę w
            każdej dziedzinie stomatologii.
            <br></br>
            <br></br>
            <strong>Współpraca krajowa</strong>
            <List>
              <ListText>
                Współpraca z uniwersytetami i organizacjami studenckimi oraz
                wdrażanie programu stypendialnego
              </ListText>
            </List>
            <strong>Organizacja Wydarzeń</strong>
            <List>
              <ListText>
                Organizacja własnych wydarzeń DDS PL oraz organizacja wspólnego
                uczestnictwa w wydarzeniach zewnętrznych
              </ListText>
            </List>
            <strong>Certyfikacja</strong>
            <List>
              <ListText>
                Certyfikacja placówek stomatologicznych pod kątem poziomu
                wdrożenia technologii cyfrowych
              </ListText>
            </List>
          </PageTextColumn>
          <PageTextColumn>
            <strong>Badania i rozwój</strong>
            <List>
              <ListText>
                Badania, rozwój, nowości technologiczne, innowacje i
                certyfikacja instrumentarium stomatologii cyfrowej
              </ListText>
            </List>
            <strong>Bieżąca Działalność</strong>
            <List>
              <ListText>
                Współpraca z partnerami, sponsorami, organizacjami branżowymi
                oraz rekrutacja członków i bieżąca działalność
              </ListText>
            </List>
            <strong>Edukacja</strong>
            <List>
              <ListText>
                Planowanie i wdrażanie programów szkoleniowych dla lekarzy i
                techników, w tym Curriculum Stomatologii Cyfrowej
              </ListText>
            </List>
            <strong>Marketing i Fotografia</strong>
            <List>
              <ListText>
                Marketing i fotografia – dbałość o pozytywny wizerunek cyfrowej
                stomatologii w branży oraz wśród pacjentów
              </ListText>
            </List>
            <strong>Współpraca Zagraniczna</strong>
            <List>
              <ListText>
                Współpraca z zagranicznymi: uniwersytetami, organizacjami
                branżowymi oraz ośrodkami badawczymi.
              </ListText>
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
    </PageWrapper>
  );
};

export default Diagnostyka;
