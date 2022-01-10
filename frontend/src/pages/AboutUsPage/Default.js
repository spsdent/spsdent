import { motion } from "framer-motion";
import React from "react";
import { Pattern } from "../../components/Pattern";
import {
  ColumnContainer,
  Title,
  TextContainer,
  Content,
  Gallery,
  ContentText,
  DoctorName,
  LineAboutUs,
  PictureContainer,
  Text,
  TextWrap,
} from "./AboutUsPageElements";

const Default = () => {
  return (
    <>
      <Title
        initial={{ opacity: 0, x: "25vw" }}
        animate={{ opacity: 1, x: "0" }}
        exit={{ opacity: 0, x: "-25vw" }}
        transition={{ duration: 0.3 }}
      >
        Naszym celem jest...
      </Title>
      <TextContainer
        initial={{ opacity: 0, y: -200, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -200, scale: 0 }}
        transition={{delay: .2}}
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
        transition={{delay: .4}}
      >
        <Text>
          <Title primary color>
            Nasz zespół
          </Title>
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
        transition={{delay: .6}}
      >
        <Title primary>Co nas wyróżnia?</Title>
        <Text></Text>
        Oferujemy zindywidualizowane, w pełni bezpieczne metody leczenia oraz
        rzetelną i fachową obsługę Pacjenta. Nasze gabinety wyposażone są w
        nowoczesną aparaturę, za pomocą której możemy leczyć w sposób
        maksymalnie profesjonalny i efektywny. W Lublinie jesteśmy znani jako
        jedni z najlepszych stomatologów.
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
      ></Pattern>
    </>
  );
};

export default Default;
