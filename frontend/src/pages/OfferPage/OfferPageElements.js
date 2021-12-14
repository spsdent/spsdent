import styled from "styled-components";

export const OfferPageContainer = styled.div`
  width: 75%;
  height: 70vh;
  background-color: #aaa;
  margin-top: 3em;
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
    margin-left: 4em;
    margin-top: 5em;
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
    margin-left: 6em;
    margin-top: 7em;
  }
  @media screen and (max-width: 768px) {
      text-align: center;
      margin: 3em auto;
  }
`;
export const OfferPageTitle = styled.h1`
  font-family: "bebas neue";
  font-size: 4em;
  letter-spacing: 0.1em;
  line-height: 0.9em;
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};

  @media screen and (max-width: 1500px) {
    font-size: 3em;
  }
`;
export const OfferPageContent = styled.div`
  width: 100%;
  height: 70%;
  background-color: cadetblue;
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (orientation: portrait) {
    flex-direction: row;
    height: 100%;
  }
`;
export const OfferPageButtonRow = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
  background-color: ${(props) => (props.primary ? "#444" : "#666")};

  @media (orientation: portrait) {
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
  }
`;
export const OfferPageButton = styled.button`
  width: 16em;
  height: 14em;
  border-radius: 1em;
  outline: none;
  border: none;
  background-color: #333;
  color: #fff;
  font-family: "bebas neue";

  @media screen and (max-width: 1700px) {
      width: 13em;
      height: 11em;
  }
  @media screen and (max-width: 1500px) {
      width: 12em;
      height: 10em;
  }
  @media screen and (max-width: 1280px) {
      width: 9em;
      height: 7em;
  }
  @media screen and (max-width: 960px) {
      width: 6.5em;
      height: 4.5em;
  }
`;
