import styled from 'styled-components'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'

export const VisitsPageContainer = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 2.6em;
  font-size: 24px;
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
export const VisitsPageTitleContainer = styled.div`
  display: flex;
  margin: 1.5em;
`
export const VisitsPageTitle = styled(motion.h1)`
  font-size: 4em;
  letter-spacing: 0.05em;
  margin-left: 0.25em;
  color: ${(props) => (props.primary ? '#01D4BF' : '#333')};
`
export const VisitsContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
export const Headers = styled(motion.div)`
  height: fit-content;
  padding: 0.5em 0;
  width: 96%;
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  align-items: center;
`
export const Header = styled(motion.div)`
  width: ${(props) => (props.primary ? '35%' : '15%')};
  display: flex;
  align-items: center;
`
export const HeaderText = styled.button`
  font-size: 0.8em;
  font-family: 'poppins';
  color: #333;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  transition: 0.2s;

  &:hover {
    color: #01d4bf;
  }
`
export const Triangle = styled.div`
  width: 0;
  height: 0;
  margin-left: 0.3em;
  transition: 0.2s;
  cursor: pointer;

  ${({ position }) =>
    position === 0 &&
    `border-left: 0.35em solid transparent;
border-right: 0.35em solid transparent;
border-top: 0.35em solid #333;
`}

  ${({ position }) =>
    position === 1 &&
    `border-left: 0.35em solid transparent;
border-right: 0.35em solid transparent;
border-top: 0.35em solid #01D4BF;
`}

${({ position }) =>
    position === 2 &&
    `border-left: 0.35em solid transparent;
border-right: 0.35em solid transparent;
border-bottom: 0.35em solid #01D4BF;`}
`
export const VisitsListContainer = styled(motion.div)`
  height: fit-content;
  width: 105%;
`
export const Visit = styled(motion.div)`
  width: 100%;
  align-self: flex-start;
  height: 5em;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 0.7em;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: rgba(1, 212, 191, 0.1);
  }
`
export const VisitContent = styled.p`
  font-family: 'poppins';
  font-size: 0.8em;
  color: rgba(117, 117, 117);
  width: ${(props) => (props.primary ? '30%' : '12%')};
`

export const VisitDelete = styled.div`
  width: 40px;
  height: 40px;
  color: rgba(117, 117, 117);
  border-radius: 100px;
  display: grid;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  z-index: 999;

  &:hover {
    background-color: rgba(1, 212, 191, 0.3);
    box-shadow: 0px 4px 45px -6px rgba(0, 82, 75, 0.7);
  }
`

export const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #01d4bf;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`
