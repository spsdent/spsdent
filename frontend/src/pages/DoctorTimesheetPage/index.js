import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { Pattern } from "../../components/Pattern";
import {
  TimesheetPageContainer,
  TimesheetTitleContainer,
  TimesheetTitle,
  TimesheetPickContainer,
  TimesheetPick,
  TimesheetContainer,
  TimesheetDaysContainer,
  Day,
  TimesheetWrap,
  TimesheetHoursContainer,
  Hour,
  Timesheet,
  VisitRow,
  Visit,
  Option,
} from "./TimesheetPageElements";
const DoctorTimesheetPage = () => {
  return (
    <PageWrapper>
      <TimesheetPageContainer>
        <TimesheetTitleContainer>
          <TimesheetTitle>Zarezerwuj</TimesheetTitle>
          <TimesheetTitle primary>Wizytę</TimesheetTitle>
        </TimesheetTitleContainer>
        <TimesheetPickContainer>
          <TimesheetPick as='select' >
          <Option value="" disabled selected hidden>Wybierz usługę</Option>
          <Option value="1" >Wybierz ausługę</Option>
          </TimesheetPick>
          <TimesheetPick as='select'>

          </TimesheetPick>
        </TimesheetPickContainer>

        <TimesheetContainer>
          <TimesheetDaysContainer>
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
          </TimesheetDaysContainer>
          <TimesheetWrap>
          <TimesheetHoursContainer>
            <Hour></Hour>
            <Hour></Hour>
            <Hour></Hour>
            <Hour></Hour>
            <Hour></Hour>
          </TimesheetHoursContainer>
          <Timesheet>
            <VisitRow>
              <Visit></Visit>
              <Visit></Visit>
              <Visit></Visit>
              <Visit></Visit>
              <Visit></Visit>
            </VisitRow>
          </Timesheet>
          </TimesheetWrap>
        </TimesheetContainer>
      </TimesheetPageContainer>
      <Pattern src="Pattern.png" />
    </PageWrapper>
  );
};

export default DoctorTimesheetPage;
