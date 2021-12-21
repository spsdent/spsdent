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
  TimesheetLegend,
  LegendItemWrap,
  CircleFree,
  CircleReserved,
  CircleActive,
  LegendText,
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
          <TimesheetPick as="select">
            <Option value="" disabled selected hidden>
              Wybierz usługę
            </Option>
            <Option value="1">najak</Option>
          </TimesheetPick>
          <TimesheetPick as="select">
            <Option value="" disabled selected hidden>
              Wybierz specjalistę
            </Option>
            <Option value="2">esa?</Option>
          </TimesheetPick>
        </TimesheetPickContainer>

        <TimesheetContainer>
          <TimesheetDaysContainer>
            <Day>poniedziałek</Day>
            <Day>wtorek</Day>
            <Day>środa</Day>
            <Day>czwartek</Day>
            <Day>piątek</Day>
          </TimesheetDaysContainer>
          <TimesheetWrap>
            <TimesheetHoursContainer>
              <Hour>8:00</Hour>
              <Hour>8:30</Hour>
              <Hour>9:00</Hour>
              <Hour>9:30</Hour>
              <Hour>10:00</Hour>
              <Hour>10:30</Hour>
              <Hour>11:00</Hour>
              <Hour>11:30</Hour>
              <Hour>12:00</Hour>
              <Hour>12:30</Hour>
              <Hour>13:00</Hour>
              <Hour>13:30</Hour>
              <Hour>14:00</Hour>
              <Hour>14:30</Hour>
              <Hour>15:00</Hour>
              <Hour>15:30</Hour>
              <Hour>16:00</Hour>
            </TimesheetHoursContainer>
            <Timesheet>
              <VisitRow>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit available></Visit>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit available></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
              </VisitRow>
              <VisitRow>
                <Visit></Visit>
                <Visit></Visit>
                <Visit></Visit>
                <Visit available></Visit>
                <Visit></Visit>
              </VisitRow>
            </Timesheet>
          </TimesheetWrap>
        </TimesheetContainer>
      </TimesheetPageContainer>
      <TimesheetLegend>
        <LegendItemWrap>
          <CircleFree />
          <LegendText>Wolny termin</LegendText>
        </LegendItemWrap>
        <LegendItemWrap>
          <CircleReserved />
          <LegendText>Zarezerwowany termin</LegendText>
        </LegendItemWrap>
        <LegendItemWrap>
          <CircleActive />
          <LegendText>Zaznaczony termin</LegendText>
        </LegendItemWrap>
      </TimesheetLegend>
      <Pattern src="Pattern.png" />
    </PageWrapper>
  );
};

export default DoctorTimesheetPage;
