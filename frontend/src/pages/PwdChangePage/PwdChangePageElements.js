import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 2.6em;
  font-size: 24px;
  marginleft: 0.3rem;
  font-family: 'Poppins';
  // background-color: cadetblue;
  @media screen and (max-width: 1500px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14px;
  }
`

export const TitleContainer = styled.div`
  width: 100%;
  height: 15%;
  font-family: 'bebas neue';
  display: flex;
`

export const Title = styled(motion.h1)`
  font-size: 5em;
  letter-spacing: 5px;
  color: ${(props) => (props.primary ? '#01d4bf' : '#333')};
  line-height: 1em;
  white-space: nowrap;
  padding-left: 0.3rem;
  /* background-color: red; */
  @media screen and (max-width: 768px) {
    margin-top: ${(props) => (props.primary ? '-2em' : '0')};
    text-align: center;
    font-size: 2.5em;
  }
`

export const EmptyListHeading = styled(Title)`
  font-size: 2.5rem;
  text-decoration: underline;
  color: salmon;
`
