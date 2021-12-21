import styled from "styled-components";

export const TimesheetPageContainer = styled.div`
  width: 80%;
  height: 80vh;
  margin-top: 2.6em;
  font-size: 24px;
  background-color: cadetblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* @media screen and (max-width: 1500px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 13px;
  } */
`;

export const TimesheetTitleContainer = styled.div`
  background-color: #444;
  width: 100%;
  height: 15%;
  font-family: "bebas neue";
`;
export const TimesheetTitle = styled.h1`
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  display: inline-block;
  padding-left: 0.3em;
  font-size: 4em;
  letter-spacing: 0.05em;
`;
export const TimesheetPickContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15%;
  background-color: #999;
`;
export const TimesheetPick = styled.input`
  width: 35%;
  padding: 0.6em;
  outline: none;
  border: 2px solid #333;
  font-family: "bebas neue";
  font-size: 0.7em;
  color: #333;
  &:focus {
    box-shadow: 0px 0px 3px 0.1px #333;
    outline: none;
    color: rgba(1, 212, 191, 0.75);
  }
  &[type="text"] {
    color: #333;
  }
  &::-webkit-input-placeholder {
    color: rgba(51, 51, 51, 0.75);
  }
`;
export const Option = styled.option`
  color: #333;
`;

export const TimesheetContainer = styled.div`
  width: 100%;
  height: 70%;
  background-color: #666;
`;

export const TimesheetDaysContainer = styled.div``;

export const TimesheetWrap = styled.div``;
export const Day = styled.p``;

export const TimesheetHoursContainer = styled.div``;

export const Hour = styled.p``;

export const Timesheet = styled.div``;

export const VisitRow = styled.div``;

export const Visit = styled.div``;
