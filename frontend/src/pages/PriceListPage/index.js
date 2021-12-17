import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { Pattern } from "../../components/Pattern";
import {
  PriceListPageContainer,
  PriceListTitle,
  PriceListTable,
  PriceTableRow,
  PriceTableContent,
} from "./PriceListPageElements";
const PriceListPage = () => {
  const container = {
    hidden: { y: -100, opacity: 0, scale: 1 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <PageWrapper>
      <PriceListPageContainer>
        <PriceListTitle
          primary
          transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
          initial={{ y: -200 }}
          animate={{ y: 0 }}
        >
          cennik
        </PriceListTitle>
        <PriceListTitle
          transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
          initial={{ y: -200 }}
          animate={{ y: 0 }}
        >
          Stomatologia zachowawcza
        </PriceListTitle>
        <PriceListTable variants={container} initial="hidden" animate="visible">
          <PriceTableRow primary>
            <PriceTableContent>Usługa</PriceTableContent>
            <PriceTableContent price>Cena</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow variants={item}>
            <PriceTableContent>
              Znieczulenie komputerowe Wand STA
            </PriceTableContent>
            <PriceTableContent price>50 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow variants={item}>
            <PriceTableContent>Konsultacja specjalistyczna</PriceTableContent>
            <PriceTableContent price>100 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow variants={item}>
            <PriceTableContent>
              Wypełnienie światłoutwardzalne
            </PriceTableContent>
            <PriceTableContent price>200 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow variants={item}>
            <PriceTableContent>
              Rekonstrukcja na ćwieku metalowym
            </PriceTableContent>
            <PriceTableContent price>250 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow variants={item}>
            <PriceTableContent>
              Rekonstrukcja zęba na wkładzie z włókien szklanych
            </PriceTableContent>
            <PriceTableContent price>450 zł</PriceTableContent>
          </PriceTableRow>
          <PriceTableRow variants={item}>
            <PriceTableContent>
              Znieczulenie komputerowe Wand STA
            </PriceTableContent>
            <PriceTableContent price>50 zł</PriceTableContent>
          </PriceTableRow>
        </PriceListTable>
      </PriceListPageContainer>
      <Pattern
        src="Pattern.png"
        top={"45%"}
        left={"5%"}
        transition={{ type: "spring", bounce: 0.5, duration: 2, delay: 0.5 }}
        initial={{ opacity: 0, x: -200, rotate: 90 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
      />
      <Pattern
        src="Pattern.png"
        top={"5%"}
        left={"70%"}
        transition={{ type: "spring", bounce: 0.5, duration: 2, delay: 0.5 }}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
      />
    </PageWrapper>
  );
};

export default PriceListPage;
