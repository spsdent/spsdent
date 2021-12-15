import styled from "styled-components";

export const PageWrapper = styled.div`
/* background-color: cadetblue; */
  display: flex;
  justify-content: center;
  margin-left: 14%;
  margin-top: 100px;
  height: 89vh;
  overflow: ${(props) => (props.primary ? "hidden" : "visible")};
  @media screen and (min-width: 1570px) {
    margin-left: 220px;
  }
  @media screen and (max-width: 1500px) {
    height: 84vh;
  }
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;
