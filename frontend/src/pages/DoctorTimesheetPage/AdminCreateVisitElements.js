import styled, {css} from 'styled-components';
import {
    ModalButtonsContainer,
  } from '../VisitPage/VisitPageElements'

export const SideModalContainer = styled.div`
position: fixed;
right: 0;
top: 0;
width: 100%;
min-height: 100%;
background-color: #fff;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family:"poppins";

@media only screen and (min-width: 768px) {
    width: 40%;
}
`
export const SideModalContent = styled.div`
width: 90%;
height: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
// background-color: gray;

`
export const FormColumn = styled.div`
width: 100%;
min-width: 300px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: space-between;
// background-color: red;
`
export const FormItem = styled.div`
background-color: cadetblue;
display: flex;
justify-content: flex-start;
align-items: center;
gap: 1em;
width: 100%;
`
export const StyledLabel = styled.label`
font-size: .6em;
width: 8em;

`

export const StyledButtonExit = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    border: 2px solid #333;
    color: #333;
    background: transparent;
    cursor: pointer;
`;

export const FormInput = styled.input`
  width: 100%;
  max-width: 400px;
  background-color: transparent;
  border: 2px solid #333;
  outline: none;
  color: #333;
  padding: 10px 5px;
  font-family: 'Poppins';
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 7px;
  margin: 5px 0;

  &:disabled {
    cursor: not-allowed;
    background: #ddd;
    border: none;
  }

  @media screen and (min-width: 1500px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1280px) {
    font-size: 13px;
  }
  @media screen and (min-width: 960px) {
    font-size: 11px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 450px;
    font-size: 9px;
  }
`

export const FormButton = styled.button`
  width: 100%;
  max-width: 350px;
  background-color: transparent;
  border: 2px solid #333;
  font-family: 'Poppins';
  color: #333;
  transition: 0.2s ease;
  cursor: pointer;
  padding: 5px 0;
  margin: 5px 0;
  font-size: 9px;

  &:hover {
    background-color: #01d4bf;
    color: #fff;
    border-color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    background: #ddd;
    border: none;
  }

  @media screen and (min-width: 1500px) {
    font-size: 17px;
  }
  @media screen and (min-width: 1280px) {
    font-size: 15px;
  }
  @media screen and (min-width: 960px) {
    font-size: 13px;
    max-width: 450px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 400px;
    font-size: 11px;
  }
`

export const StyledModalButton = styled(FormButton)`
  width: 200px;
  padding: 10px 0;
  transition: .2s;

  &:hover {
    background: #01d4bf;
    border: 2px solid #01d4bf;
  }

  ${({primary}) => primary && css`
    background: #01d4bf;
    border: 2px solid #01d4bf;
    &:hover {
      background: #fff;
      border: 2px solid #333;
      color: #333;
    }
  `}
`

export const StyledButtonsModalContainer = styled(ModalButtonsContainer)`
  width: 100%;
`