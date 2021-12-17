import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import {
  PriceListPageContainer,
  PriceListTitle,
  PriceListTable,
  PriceTableRow,
  PriceTableContent,
} from "./PriceListPageElements";
const PriceListPage = () => {
  return (
    <PageWrapper>
      <PriceListPageContainer>
        <PriceListTitle primary>cennik</PriceListTitle>
        <PriceListTitle>Stomatologia zachowawcza</PriceListTitle>
        <PriceListTable>
          <PriceTableRow primary>
          <PriceTableContent>Usługa</PriceTableContent>
          <PriceTableContent price>Cena</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow>
          <PriceTableContent>Znieczulenie komputerowe Wand STA</PriceTableContent>
          <PriceTableContent price>50 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow>
          <PriceTableContent>Znieczulenie komputerowe Wand STA</PriceTableContent>
          <PriceTableContent price>50 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow>
          <PriceTableContent>Znieczulenie komputerowe Wand STA</PriceTableContent>
          <PriceTableContent price>50 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow>
          <PriceTableContent>Znieczulenie komputerowe Wand STA</PriceTableContent>
          <PriceTableContent price>50 zł</PriceTableContent>
          </PriceTableRow>
        </PriceListTable>
      </PriceListPageContainer>
    </PageWrapper>
  );
};

export default PriceListPage;
