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
  LinkButton,
} from "./OfferPageElements";

const OfferPage = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

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
        <OfferPageContent>
          <OfferPageButtonRow
            primary
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <LinkButton to="/oferta/rtg-3d">
              <OfferButtonContainer
                variants={item}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
              >
                <OfferButtonImg src="offer1.png" />

                <OfferButtonText>rtg 3d</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/endodoncja">
              <OfferButtonContainer
                variants={item}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
              >
                <OfferButtonImg src="offer2.png" />
                <OfferButtonText>Endodoncja</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/dds">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer3.png" />
                <OfferButtonText>DDS</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/pip">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer4.png" />
                <OfferButtonText>
                  Profilaktyka i periodontologia
                </OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/pcyfrowa">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer5.png" />
                <OfferButtonText>Protetyka cyfrowa</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
          </OfferPageButtonRow>
          <OfferPageButtonRow
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <LinkButton to="/oferta/implanty">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer6.png" />
                <OfferButtonText>Implanty</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/ortodoncja">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer7.png" />
                <OfferButtonText>Ortodoncja</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/diagnostyka">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer8.png" />
                <OfferButtonText>Diagnostyka</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/znieczulenie">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer9.png" />
                <OfferButtonText>znieczulenie ogólne</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
            <LinkButton to="/oferta/zachowawcza">
              <OfferButtonContainer
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
              >
                <OfferButtonImg src="offer10.png" />
                <OfferButtonText>stomatologia zachowawcza</OfferButtonText>
              </OfferButtonContainer>
            </LinkButton>
          </OfferPageButtonRow>
        </OfferPageContent>
      </OfferPageContainer>
      <Pattern
        src="pattern.png"
        top="11%"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1.3 }}
        transition={{ duration: 1.5 }}
      />
    </PageWrapper>
  );
};

export default OfferPage;
