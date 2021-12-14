import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import {
  OfferPageContainer,
  OfferPageTitle,
  OfferPageContent,
  OfferPageButton,
} from "./OfferPageElements";

const OfferPage = () => {
  return (
    <PageWrapper>
      <OfferPageContainer>
        <OfferPageTitle>To co możemy</OfferPageTitle>
        <OfferPageTitle primary>Zaoferowac</OfferPageTitle>
        <OfferPageContent>
          <OfferPageButton />
        </OfferPageContent>
      </OfferPageContainer>
    </PageWrapper>
  );
};

export default OfferPage;
