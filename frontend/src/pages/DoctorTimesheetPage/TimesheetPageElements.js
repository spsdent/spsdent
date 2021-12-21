import styled from "styled-components";
import { motion } from "framer-motion";

export const TimesheetPageContainer = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 2.6em;
  font-size: 24px;
  /* background-color: cadetblue; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1500px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14px;
  }
`;

export const TimesheetTitleContainer = styled.div`
  /* background-color: #444; */
  width: 100%;
  height: 15%;
  font-family: "bebas neue";
`;
export const TimesheetTitle = styled(motion.h1)`
  color: ${(props) => (props.primary ? "#01d4bf" : "#333")};
  display: inline-block;
  padding-left: 0.3em;
  font-size: 4em;
  letter-spacing: 0.05em;
  @media screen and (max-width: 768px) {
      font-size: 2.5em;
       
  }
`;
export const TimesheetPickContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15%;
  /* background-color: #999; */
`;
export const TimesheetPick = styled(motion.select)`
  width: 47%;
  padding: 0.6em;
  outline: none;
  border: 2px solid #333;
  font-family: "bebas neue";
  font-size: 0.7em;
  color: #333;
  letter-spacing: .05em;
  &:focus {
    box-shadow: 0px 0px 3px 0.1px #333;
    outline: none;
    color: rgba(1, 212, 191, 0.75);
  }
`;
export const Option = styled.option`
  color: #333;
`;

export const TimesheetContainer = styled.div`
  width: 100%;
  height: 70%;
  /* background-color: #666; */
`;

export const TimesheetDaysContainer = styled(motion.div)`
  width: 92%;
  height: 10%;
  /* background-color: cadetblue; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-transform: capitalize;
  margin-left: 3em;
`;
export const Day = styled.p`
  color: #333;
  font-family: "poppins";
  font-size: 0.7em;
  width: 6em;
  /* background-color: red; */
`;
export const TimesheetWrap = styled.div`
  width: 100%;
  height: 90%;
  /* background-color: gray; */
  display: flex;
`;
export const TimesheetHoursContainer = styled(motion.div)`
  width: 8%;
  /* min-height: 100%; */
  height: fit-content;
  /* background-color: #357; */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const Hour = styled.p`
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: center;
  color: #333;
  font-family: "poppins";
  font-size: 0.7em;
  /* background-color: brown; */
`;

export const Timesheet = styled(motion.div)`
  width: 92%;
  height: 100%;
  /* background-color: #424; */
`;

export const VisitRow = styled(motion.div)`
  width: 100%;
  height: 3em;
  /* background-color: gray; */
  margin-top: 0.55em;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Visit = styled(motion.div)`
  width: 15%;
  height: 2.5em;
  border-radius: 10px;
  background-color: ${(props) => (props.available ? "#c1c1c1" : "#333")};
  cursor: pointer;
`;
export const TimesheetLegend = styled.div`
  width: 80%;
  height: 2em;
  position: fixed;
  bottom: 0;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LegendItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  padding-right: 2em;
`;
export const CircleFree = styled(motion.div)`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: #333;
`;
export const CircleReserved = styled(motion.div)`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: #c1c1c1;
`;
export const CircleActive = styled(motion.div)`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: #01d4bf;
`;
export const LegendText = styled(motion.p)`
  color: #333;
  font-family: "poppins";
  font-size: 0.6rem;
  margin-left: 0.5em;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    font-size: 0.4em;
  }
`;
