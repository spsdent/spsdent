import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { AnimatePresence } from 'framer-motion'
import OurStaff from './OurStaff'
import Cabinet from './Cabinet'
import Default from './Default'
import {
  Container,
  ButtonsContainer,
  CircleButton,
  ButtonContainer,
  ButtonText,
  ContentContainer,
} from './AboutUsPageElements'
import HashLoader from 'react-spinners/HashLoader'

const AboutUsPage = () => {
  const [state, setState] = useState({
    pick: 1,
    active: {
      backgroundColor: '#01d4bf',
    },
    deactive: {
      backgroundColor: '#333',
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleClick = (props) => {
    setState({...state, pick: props})
  }

  const {pick, active, deactive} = state;

  return (
    <PageWrapper>
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && <Container>
        <ButtonsContainer>
          <ButtonContainer
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            onClick={() => handleClick(1)}
          >
            <CircleButton style={pick === 1 ? active : deactive} />
            <ButtonText>O nas</ButtonText>
          </ButtonContainer>
          <ButtonContainer
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleClick(2)}
          >
            <CircleButton style={pick === 2 ? active : deactive}></CircleButton>
            <ButtonText>Nasz zespół</ButtonText>
          </ButtonContainer>
          <ButtonContainer
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            transition={{ delay: 0.4 }}
            onClick={() => handleClick(3)}
          >
            <CircleButton style={pick === 3 ? active : deactive}></CircleButton>
            <ButtonText>Gabinet</ButtonText>
          </ButtonContainer>
        </ButtonsContainer>
        <ContentContainer>
          <AnimatePresence exitBeforeEnter>
            {pick === 1 && <Default key='1' />}
            {pick === 2 && <OurStaff key='2' />}
            {pick === 3 && <Cabinet key='3' />}
          </AnimatePresence>
        </ContentContainer>
      </Container>}
    </PageWrapper>
  )
}

export default AboutUsPage
