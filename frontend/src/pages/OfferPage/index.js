import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { Pattern } from "../../components/Pattern";
import {
  OfferPageContainer,
  OfferPageTitle,
  OfferPageContent,
  OfferPageButtonRow,
  OfferButtonContainer,
  OfferButtonImg,
  OfferButtonText,
} from "./OfferPageElements";

const OfferPage = () => {
  return (
    <PageWrapper primary>
      <OfferPageContainer>
        <OfferPageTitle
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
        >
          To co możemy
        </OfferPageTitle>
        <OfferPageTitle
          primary
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Zaoferować
        </OfferPageTitle>
        <OfferPageContent
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 6, stiffness: 100 }}
        >
          <OfferPageButtonRow primary>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer1.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer2.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer3.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer4.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer5.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
          </OfferPageButtonRow>
          <OfferPageButtonRow>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer6.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer7.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer8.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer9.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
            <OfferButtonContainer
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <OfferButtonImg src="offer10.png" />
              <OfferButtonText>rtg 3d</OfferButtonText>
            </OfferButtonContainer>
          </OfferPageButtonRow>
        </OfferPageContent>
      </OfferPageContainer>
      <Pattern
        src="pattern.png"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1.5 }}
        transition={{ duration: 2 }}
      />
    </PageWrapper>
  );
};

export default OfferPage;
