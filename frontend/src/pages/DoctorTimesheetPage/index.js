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
  TimesheetHoursContainer,
  Hour,
  Timesheet,
  VisitRow,
  Visit,
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
          <TimesheetPick placeholder="Wybierz usługe"></TimesheetPick>
          <TimesheetPick placeholder="Wybierz specjaliste"></TimesheetPick>
        </TimesheetPickContainer>

        <TimesheetContainer>
          <TimesheetDaysContainer>
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
          </TimesheetDaysContainer>
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
        </TimesheetContainer>
      </TimesheetPageContainer>
      <Pattern src="Pattern.png" />
    </PageWrapper>
  );
};

export default DoctorTimesheetPage;
