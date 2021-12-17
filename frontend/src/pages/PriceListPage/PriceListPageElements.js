import styled from "styled-components";

export const PriceListPageContainer = styled.div`
  width: 75%;
  height: 70vh;
  /* background-color: #aaa; */
  margin-top: 3em;
  font-size: 24px;
`;
export const PriceListTitle = styled.h1`
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  font-size: ${(props) => (props.primary ? "2.5em" : "3.5em")};
  line-height: 1em;
  letter-spacing: 0.05em;
`;
export const PriceListTable = styled.div`
  color: #333;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  height: fit-content;
  font-family: "montserrat";
  box-shadow: 0px 1px 5px 1px #333;
`;
export const PriceTableRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: space-around;
  background-color: ${(props) => (props.primary ? "#333" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  width: 100%;
  font-size: ${(props) => (props.primary ? "1em" : ".8em")};
  border-bottom: 2px solid rgba(51,51,51,0.2);
  padding: 1em 0;
`;
export const PriceTableContent = styled.div`
  display: flex;
  justify-content: ${(props) => (props.price ? "center" : "flex-start")};
  width: 40%; 
`;
