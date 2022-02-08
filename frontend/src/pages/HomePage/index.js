import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { PageWrapper } from "../../components/PageWrapper";
import { Pattern } from "../../components/Pattern";
import {
  Container,
  TextContainer,
  HeaderWelcome,
  HeaderText,
  AddVisitButton,
  HeaderPhotoContainer,
  PhotoHeader,
  StyledSpan,
  ButtonSpan,
  ButtonContainer,
  ButtonLink,
} from "./HomePageElements";
import {
  ContactContainer,
  ContactForm,
  ContactTitle,
  ContactInfo,
  ContactInfoTitle,
  ContactText,
  ContactInput,
  ContactMessage,
  ButtonContact,
  ContactSocket,
} from "../ContactPage/ContactPageElements";
const Home = () => {
  return (
    <PageWrapper primary>
      <Container>
        <TextContainer>
          <HeaderWelcome
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 2,
            }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Witaj w <br />
          </HeaderWelcome>
          <HeaderWelcome
            primary
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 2,
              delay: 0.1,
            }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
          >
            SPS<StyledSpan>Dent</StyledSpan>!
          </HeaderWelcome>

          <HeaderText
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 2,
              delay: 0.2,
            }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <strong>SPS Dental Clinic</strong> to klinika oferująca kompleksowe
            usługi z zakresu stomatologii: diagnostyki, profilaktyki,
            ortodoncji, chirurgii stomatologicznej czy implantologii. Na rynku
            stomatologicznym działamy od przeszło 8 lat. Znajdziemy idealne
            rozwiązanie dla każdego, nawet najbardziej wymagającego pacjenta.
          </HeaderText>
          <ButtonContainer
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 2,
              delay: 0.3,
            }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ButtonSpan>
              <FaAngleDoubleRight />
            </ButtonSpan>
            <AddVisitButton>
              <ButtonLink to="/zarezerwuj">Umów się na wizytę</ButtonLink>
            </AddVisitButton>
          </ButtonContainer>
        </TextContainer>
        <ContactInfo
          home
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 5, stiffness: 100 }}
        >
          <ContactSocket>
            <ContactInfoTitle>Tu nas znajdziesz</ContactInfoTitle>
            <ContactText>
              ul. Filaretów 27,<br></br>lok.4 20-609<br></br>Lublin
            </ContactText>
          </ContactSocket>
          <ContactSocket>
            <ContactInfoTitle>Godziny otwarcia</ContactInfoTitle>
            <ContactText>
              Poniedziałek - Piątek<br></br>8:00 - 16:00<br></br>Sobota<br></br>
              9:00 - 13:00
            </ContactText>
          </ContactSocket>
          <ContactSocket>
            <ContactInfoTitle>Telefon</ContactInfoTitle>
            <ContactText>607 677 888</ContactText>
          </ContactSocket>
          <ContactSocket>
            <ContactInfoTitle>Pomoc</ContactInfoTitle>
            <ContactText>pomoc@spsdent.com</ContactText>
          </ContactSocket>
        </ContactInfo>
        <HeaderPhotoContainer>
          <PhotoHeader
            transition={{ type: "spring", bounce: 0.6, duration: 1.5 }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            drag
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            src="header1.png"
          ></PhotoHeader>
          <PhotoHeader
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 2,
              delay: 0.2,
            }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            drag
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            primary
            src="header2.png"
          ></PhotoHeader>
        </HeaderPhotoContainer>
      </Container>
      <Pattern
        src="Pattern.png"
        top="55%"
        left="30%"
        transition={{ duration: 1 }}
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
      ></Pattern>
    </PageWrapper>
  );
};

export default Home;
