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
const Endodoncja = () => {
  return (
    <PageWrapper>
      <HeaderImage
        image={'url("../endo.png")'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      <SubPageContainer
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Endodoncja</PageTitle>
        <PageText>
          <PageTextColumn>
            W <strong>SPS Dental Clinic</strong> leczymy pacjentów szybko i
            precyzyjnie. Kluczowy jest dla nas komfort osoby leczonej, dlatego
            sam proces leczenia kanałowego odbywa się podczas 1 lub 2 wizyt.
            Dzięki temu oszczędzamy Państwa czas i minimalizujemy stres związany
            z wieloetapowym i długim leczeniem. Wskazania do leczenia
            endodontycznego:
            <List>
              <ListText>duże próchnicowe zniszczenie korony zęba</ListText>
              <ListText>nieodwracalne uszkodzenie miazgi</ListText>
              <ListText>zmiany okołowierzchołkowe</ListText>
              <ListText>zmiany w przyzębiu</ListText>
              <ListText>profilaktyka przedprotetyczna</ListText>
              <ListText>urazy i resorpcja zęba</ListText>
            </List>
            
          </PageTextColumn>
          <PageTextColumn>
          W celu prawidłowego przeprowadzenia leczenia stosujemy metody chemicznego i mechanicznego opracowania kanałów zęba.<br></br> Do maszynowego opracowania kanałów korzeniowych używamy urządzenia <strong>X-Smart Plus (Maillefer) wraz z systemem ProTaper Next</strong> oraz wbudowanych silników endodontycznych w unitach <strong>Stern Weber s380 trc</strong>. Do zmierzenia długości kanału zęba używamy specjalistycznej aparatury – endometr <strong>Raypex 5 i 6</strong>.
          <br></br><br></br>
          Dodatkowo wykonujemy szczegółowe RTG zębów system radiowizjografii <strong>MyRax Zen-X</strong> dostępnym przy każdym unicie stomatologicznym. Szczelne i dokładne wypełnienie kanałów zapewnia nam metoda termoplastycznej gutaperki za pomocą urządzenia <strong>BeeFill 2w1</strong>
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

export default Endodoncja;
