import styled from "styled-components";
import { Field } from "formik";
import DatePicker from "react-datepicker";

export const AddVisitContainer = styled.div`
  /* background-color: cadetblue; */
  width: 90%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background-color: red; */
  align-self: flex-start;
  gap: 1em;
  padding: 1.5em 0 0.5em 3em;
`;
export const Title = styled.h1`
  font-size: 3.5em;
  font-family: "bebas neue", "sans-serif";
  letter-spacing: 0.05em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
`;
export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  /* background-color: rgba(51,51,51,.05); */
  /* box-shadow: 0px 0px 10px #aaa; */
  height: fit-content;
  gap: 2em;
  /* padding: 1em; */

`;
export const FormColumn = styled.div`
  /* background-color: ${(props) => (props.primary ? "#455" : "#545")}; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 17em;
  box-shadow: 0px 0px 10px 0px #aaa;
  padding: 1em;
  font-size: 24px;

@media screen and (max-width: 1500px) {
  font-size: 20px;
}
@media screen and (max-width: 1280px) {
  font-size: 18px;
}
@media screen and (max-width: 960px) {
  font-size: 16px;
}
@media screen and (max-width: 768px) {
  font-size: 14px;
}
`;
export const FormInput = styled(Field)`
  background-color: transparent;
  border: 2px solid #333;
  height: 3em;
  width: 18em;
  margin: 0.6em 0;
  padding-left: 1em;
  outline: none;
  color: #333;
  font-family: "Poppins";
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 15px;

@media screen and (max-width: 1500px) {
  font-size: 13px;
}
@media screen and (max-width: 1280px) {
  font-size: 11px;
}
@media screen and (max-width: 960px) {
  font-size: 9px;
}
@media screen and (max-width: 768px) {
  font-size: 7px;
}
`;
export const FormButton = styled.button`
  background-color: transparent;
  border: 2px solid #333;
  font-family: "Poppins";
  width: 18em;
  height: 4em;
  margin: 1em 0;
  color: #333;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #01d4bf;
    color: #fff;
    border-color: #fff;
  }
`;
export const FormBook = styled.button``;
export const FormSelect = styled(Field)``;
export const FormError = styled.p``;
export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  gap: ${(props) => (props.primary ? ".5em" : ".35em")};
  text-align: center;
`;
export const RegisterText = styled.p`
  font-family: "Poppins";
  font-size: 0.6em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  cursor: ${(props) => (props.primary ? "pointer" : "default")};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const SubTitle = styled.h2`
  font-family: "bebas neue";
  letter-spacing: 0.04em;
  font-size: 1.3em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
`;
