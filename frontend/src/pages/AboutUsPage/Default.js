import { motion } from "framer-motion";
import React from "react";
import { Pattern } from "../../components/Pattern";
import {
  PageTitle,
  TextContainer,
  PictureContainer,
  Title,
  Text,
  DefaultPageColumn,
  PhotoContainer,
} from "./DefaultPageElements";
import { OurStaffContainer } from "./OurStaffPageElements";

const Default = () => {
  return (
    <>
      <OurStaffContainer default>
        <DefaultPageColumn
          initial={{ y: -500, opacity: 0, rotate: 40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 500, opacity: 0, rotate: -40 }}
          transition={{ duration: 0.5 }}
        >
          <PhotoContainer
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            src="default.svg"
          />
        </DefaultPageColumn>
        <DefaultPageColumn primary>
          <TextContainer
            initial={{ y: -500, opacity: 0, rotate: 20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -500, opacity: 0, rotate: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Title>Co nas wyróżnia?</Title>
            <Text>
              Oferujemy zindywidualizowane, w pełni bezpieczne metody leczenia
              oraz rzetelną i fachową obsługę Pacjenta. Nasze gabinety
              wyposażone są w nowoczesną aparaturę, za pomocą której możemy
              leczyć w sposób maksymalnie profesjonalny i efektywny. W Lublinie
              jesteśmy znani jako jedni z najlepszych stomatologów.
            </Text>
          </TextContainer>
          <TextContainer
            initial={{ y: 500, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 500, opacity: 0, rotate: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Title>Naszym celem jest...</Title>
            <Text>
              oferowanie najlepszej jakości usług, co zapewnia długofalowy efekt
              przeprowadzanych zabiegów, a także sprawia, że wszyscy Pacjenci
              czują się u nas wyjątkowo. Dla nas, jako specjalistów, nie ma dla
              nas rzeczy niemożliwych. Podejmiemy się każdego wyzwania!
            </Text>
          </TextContainer>
        </DefaultPageColumn>
        <Pattern
          src="Pattern.png"
          top="65%"
          left="10%"
          transition={{ duration: 0.3 }}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
        ></Pattern>
        <Pattern
          src="Pattern.png"
          top="6%"
          left="65%"
          transition={{ duration: 0.3 }}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
        ></Pattern>
      </OurStaffContainer>

      {/* <PageTitle
        initial={{ opacity: 0, x: "25vw" }}
        animate={{ opacity: 1, x: "0" }}
        exit={{ opacity: 0, x: "-25vw" }}
        transition={{ duration: 0.3 }}
      >
        Naszym celem jest...
      </PageTitle>
      <TextContainer
        initial={{ opacity: 0, y: -200, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -200, scale: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Text>
          Naszym celem jest oferowanie najlepszej jakości usług, co zapewnia
          długofalowy efekt przeprowadzanych zabiegów, a także sprawia, że
          wszyscy Pacjenci czują się u nas wyjątkowo. Dla nas, jako
          specjalistów, nie ma dla nas rzeczy niemożliwych.
          <strong> Podejmiemy się każdego wyzwania!</strong>
        </Text>
      </TextContainer>
      <TextContainer
        primary
        initial={{ opacity: 0, y: 200, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 200, scale: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Text>
          <TextTitle primary color>
            Nasza kadra
          </TextTitle>
          Zespół <strong>SPS Dental Clinic</strong> tworzą doświadczeni
          specjaliści – doktorzy nauk medycznych oraz lekarze dentyści, a także
          dyplomowane higienistki i asystentki stomatologiczne. Aby wdrażać
          najnowocześniejsze metody leczenia, wszyscy z nich stale podnoszą
          swoje kompetencje. Poszukujesz sprawdzonego dentysty w Lublinie?
          Wybierz
          <strong> SPS Dental Clinic!</strong>
        </Text>
      </TextContainer>

      <TextWrap
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ delay: 0.6 }}
      >
        <TextTitle primary>Co nas wyróżnia?</TextTitle>
        <Text primary>
        Oferujemy zindywidualizowane, w pełni bezpieczne metody leczenia oraz
        rzetelną i fachową obsługę Pacjenta. Nasze gabinety wyposażone są w
        nowoczesną aparaturę, za pomocą której możemy leczyć w sposób
        maksymalnie profesjonalny i efektywny. W Lublinie jesteśmy znani jako
        jedni z najlepszych stomatologów.
        </Text>
      </TextWrap>
      <PictureContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Pattern
        src="Pattern.png"
        top="65%"
        left="10%"
        transition={{ duration: 0.3 }}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
      ></Pattern>
      <Pattern
        src="Pattern.png"
        top="6%"
        left="65%"
        transition={{ duration: 0.3 }}
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -200, opacity: 0 }}
      ></Pattern> */}
    </>
  );
};

export default Default;
