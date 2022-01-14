import styled from "styled-components";

export const PageWrapper = styled.div`
/* background-color: cadetblue; */
  display: flex;
  justify-content: center;
  margin-left: 8.5em;
  margin-top: 4.2em;
  height: calc(100vh - 4.2em);
  overflow: ${(props) => (props.primary ? "hidden" : "visible")};
  font-size: 24px;
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14.5px;
  }
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;
