import React, { useEffect, useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { PageWrapper } from '../../components/PageWrapper'
import { Pattern } from '../../components/Pattern'
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
} from './HomePageElements'
import {
  ContactInfo,
  ContactInfoTitle,
  ContactText,
  ContactSocket,
} from '../ContactPage/ContactPageElements'
import HashLoader from 'react-spinners/HashLoader'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <PageWrapper primary>
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && (
        <>
          <Container>
            <TextContainer>
              <HeaderWelcome
                transition={{
                  type: 'spring',
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
                  type: 'spring',
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
                  type: 'spring',
                  bounce: 0.6,
                  duration: 2,
                  delay: 0.2,
                }}
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <strong>SPS Dental Clinic</strong> to klinika oferuj??ca
                kompleksowe us??ugi z zakresu stomatologii: diagnostyki,
                profilaktyki, ortodoncji, chirurgii stomatologicznej czy
                implantologii. Na rynku stomatologicznym dzia??amy od przesz??o 8
                lat. Znajdziemy idealne rozwi??zanie dla ka??dego, nawet
                najbardziej wymagaj??cego pacjenta.
              </HeaderText>
              <ButtonContainer
                transition={{
                  type: 'spring',
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
                  <ButtonLink to='/zarezerwuj'>Um??w si?? na wizyt??</ButtonLink>
                </AddVisitButton>
              </ButtonContainer>
            </TextContainer>
            <ContactInfo
              home
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', damping: 5, stiffness: 100 }}
            >
              <ContactSocket>
                <ContactInfoTitle>Tu nas znajdziesz</ContactInfoTitle>
                <ContactText>
                  ul. Filaret??w 27,<br></br>lok.4 20-609<br></br>Lublin
                </ContactText>
              </ContactSocket>
              <ContactSocket>
                <ContactInfoTitle>Godziny otwarcia</ContactInfoTitle>
                <ContactText>
                  Poniedzia??ek - Pi??tek<br></br>8:00 - 16:00<br></br>Sobota
                  <br></br>
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
                transition={{ type: 'spring', bounce: 0.6, duration: 1.5 }}
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
                src='header1.png'
              ></PhotoHeader>
              <PhotoHeader
                transition={{
                  type: 'spring',
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
                src='header2.png'
              ></PhotoHeader>
            </HeaderPhotoContainer>
          </Container>
          <Pattern
            src='Pattern.png'
            top='55%'
            left='30%'
            transition={{ duration: 1 }}
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
          ></Pattern>
        </>
      )}
    </PageWrapper>
  )
}

export default Home
