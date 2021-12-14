import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import {
  OfferPageContainer,
  OfferPageTitle,
  OfferPageContent,
  OfferPageButtonRow,
  OfferPageButton,
} from "./OfferPageElements";

const OfferPage = () => {
  return (
    <PageWrapper>
      <OfferPageContainer>
        <OfferPageTitle>To co możemy</OfferPageTitle>
        <OfferPageTitle primary>Zaoferowac</OfferPageTitle>
        <OfferPageContent>
          <OfferPageButtonRow primary>
            <OfferPageButton />
            <OfferPageButton />
            <OfferPageButton />
            <OfferPageButton />
            <OfferPageButton />
          </OfferPageButtonRow>
          <OfferPageButtonRow>
            <OfferPageButton />
            <OfferPageButton />
            <OfferPageButton />
            <OfferPageButton />
            <OfferPageButton />
          </OfferPageButtonRow>
        </OfferPageContent>
      </OfferPageContainer>
    </PageWrapper>
  );
};

export default OfferPage;
