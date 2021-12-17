import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import {
  PriceListPageContainer,
  PriceListTitle,
  PriceListTable,
  PriceTableTitle,
  PriceTableContent,
} from "./PriceListPageElements";
const PriceListPage = () => {
  return (
    <PageWrapper>
      <PriceListPageContainer>
        <PriceListTitle>To co możemy</PriceListTitle>
        <PriceListTitle>Zaoferować</PriceListTitle>
        <PriceListTable>
          <PriceTableTitle></PriceTableTitle>
          <PriceTableContent></PriceTableContent>
        </PriceListTable>
      </PriceListPageContainer>
    </PageWrapper>
  );
};

export default PriceListPage;
