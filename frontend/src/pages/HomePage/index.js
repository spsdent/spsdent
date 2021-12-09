import React, { useState, useEffect } from "react";
import UserService from "../../services/user";
import {FaAngleDoubleRight} from 'react-icons/fa'
import { PageWrapper } from "../../components/PageWrapper";
import {
  HeaderContainer,
  TextContainer,
  HeaderWelcome,
  HeaderText,
  AddVisitButton,
  HeaderPhotoContainer,
  PhotoHeader,
  StyledSpan,
  ButtonSpan,
  ButtonContainer,
  Pattern
} from "./HomePageElements";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <PageWrapper>
      <HeaderContainer>
        <TextContainer>
          <HeaderWelcome>
            Witaj w <br/>
            <StyledSpan primary>
              SPS<StyledSpan>Dent</StyledSpan>!
            </StyledSpan>
          </HeaderWelcome>
          <HeaderText>
            SPS Dental Clinic to klinika oferująca kompleksowe usługi z zakresu
            stomatologii: diagnostyki, profilaktyki, ortodoncji, chirurgii
            stomatologicznej czy implantologii. Na rynku stomatologicznym
            działamy od przeszło 8 lat. Znajdziemy idealne rozwiązanie dla
            każdego, nawet najbardziej wymagającego pacjenta.
          </HeaderText>
          <ButtonContainer>
          <ButtonSpan><FaAngleDoubleRight/></ButtonSpan>
          <AddVisitButton>umów się na wizytę</AddVisitButton>
          </ButtonContainer>
        </TextContainer>
        <HeaderPhotoContainer>
          <PhotoHeader src="header1.png"></PhotoHeader>
          <PhotoHeader primary src="header2.png"></PhotoHeader>
        </HeaderPhotoContainer>
      </HeaderContainer>
      <Pattern src="Pattern.png"></Pattern>
    </PageWrapper>
  );
};

export default Home;
