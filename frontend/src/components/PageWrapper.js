import styled from "styled-components";

export const PageWrapper = styled.div`
display:  flex;
justify-content: center;
  margin-left: 14%;
  @media screen and (min-width: 1570px) {
    margin-left: 220px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;
