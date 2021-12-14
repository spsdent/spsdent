import styled from "styled-components";

export const OfferPageContainer = styled.div`
  width: 70%;
  height: 75vh;
  background-color: #aaa;
  margin-top: 2.2em;
  letter-spacing: 0.1em;
  line-height: 4em;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
  }
  @media screen and (max-width: 768px) {
  }
`;
export const OfferPageTitle = styled.h1`
  font-family: "bebas neue";
  font-size: 4em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
`;
export const OfferPageContent = styled.div`
width: 100%;
height: 70%;
background-color: cadetblue;
margin: 1em 0;
`;
export const OfferPageButton = styled.button`
`;
