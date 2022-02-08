import styled from "styled-components";
import Select from "react-select";
import { Field } from "formik";
export const StyledContainer = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5%;
  /* background-color: cadetblue; */
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5em;
  /* margin: 1rem 0; */margin-top: ${props => props.primary ? "1em" : "0"};

`;
export const StyledButton = styled.button`
  padding: 1em 1em;
  cursor: pointer;
  transition: 0.2s ease;
  outline: none;
  border: 2px solid #333;
  font-family: "poppins";
  font-size: 0.6em;
  width: ${props => props.addVisit ? "18em" : "auto"};
  margin-bottom: ${props => props.delete ? "0" : "1.5em"};
  white-space: nowrap;
  margin-top: ${props => props.update ? "1.5em" : "0"};
  
  &:hover {
    background-color: #01d4bf;
    /* border: 2px solid #fff; */
  }

  &:disabled {
    background-color: transparent;
    border: 2px solid #ddd;
    cursor: not-allowed;
  }
`;
export const StyledHeading = styled.h1`
  color: #333;
  font-size: 3em;
  white-space: nowrap;
`;
export const ButtonControl = styled.button`
  font-family: "poppins";
  font-size: 0.6em;
  padding: 0.5em 1em;
`;
export const SubTitle = styled.h3`
  font-size: 1.5em;
  /* background-color: red; */
  white-space: nowrap;
  font-family: "bebas neue", "poppins";
  letter-spacing: 0.04em;
  color: #333;
  line-height: 1em;
  margin-bottom: 0.4em;
`;
export const StyledInput = styled.input`
  outline: none;
  background-color: transparent;
  border: 2px solid #333;
  height: 3em;
  margin: 0.4em 0;
  padding-left: 1em;
  font-family: "poppins";
  transition: 0.2s ease;
  &:focus {
    box-shadow: 0px 0px 5px 0px #01d4bf;
  }
  &::-webkit-input-placeholder {
    color: rgba(51, 51, 51, 0.6);
  }
`;
export const ErrorText = styled.p`
  color: ${(props) => (props.primary ? "red" : "#333")};
  text-align: ${props => props.panel ? "left" : "center"};
  font-size: ${props => props.panel ? ".6em" : ".7em"};
  font-family: "poppins";
  white-space: nowrap;
`;
export const UserContainer = styled.div`
  width: 18em;
  height: fit-content;
  display: flex;
  margin-bottom: 1em;
  padding: 0.7em;
  border: 2px solid #333;
  color: #333;
  flex-direction: column;
`;
export const UserTextWrap = styled.div`
  display: flex;
  gap: 0.3em;
  margin-bottom: ${(props) => (props.primary ? ".7em" : "0")};
`;
export const UserText = styled.p`
  color: #333;
  font-family: "poppins";
  font-weight: ${(props) => (props.primary ? "bold" : "regular")};
  font-size: ${(props) => (props.title ? ".65em" : ".8em")};
  /* white-space: nowrap; */
  /* background-color: red; */
  margin-top: ${props => props.spec ? "1em" : "0"};
`;
export const StyledSelect = styled(Select)`
  border: 2px solid #333;
  font-family: "poppins";
  font-size: 0.6em;
  outline: none;
  border: none;
  width: 20em;
  margin: 0.2em 0 0.5em 0;
  height: 3em;
`;
export const HoursChangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.2em 0;
`;
export const StyledField = styled(Field)`
  border: 2px solid #333;
  background-color: transparent;
  height: 3em;
  width: 20em;
  padding-left: 1em;
  outline: none;
  margin: 0.2em 0 0.5em 0;
  font-family:"poppins";
  &:focus {
    box-shadow: 0px 0px 5px 0px #01d4bf;
  }
`;
export const StyledOption = styled.option`
width: 20em;
height: 3em;
outline: none;
font-family: "poppins";
`
export const DeleteServiceContainer = styled.div`
display: flex;
flex-direction: column;
gap: .2em;
margin-top: .5em;
width: 20em;
`

export const ServiceWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background-color: rgba(51,51,51,.1);
gap: 1em;
padding: .5em;
`