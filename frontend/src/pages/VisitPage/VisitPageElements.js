import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 2.6em;
  font-size: 24px;
  margin-left: 0.3rem;
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
export const VisitTitle = styled(motion.h1)`
color: ${props => props.primary ? "#01D4BF" : "#333"};
font-family: 'bebas neue';
font-size: 5em;
letter-spacing: .02em;
`
export const VisitContainer = styled(motion.div)`
background-color: rgba(255,255,255,.7);
border-radius: 15px;
padding: 1em;
width: 70%;
margin: 0 auto;
`
export const VisitTitleContainer = styled.div`
display: flex;
justify-content: center;
gap: 1.5em;
`
export const VisitText = styled.p`

`
// export const EmptyListHeading = styled(Title)`
//   font-size: 2.5rem;
//   text-decoration: underline;
//   color: salmon;
// `
