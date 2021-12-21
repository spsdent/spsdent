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
  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemOne = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.5, damping: 7, stiffness: 50 },
    },
  };
  const itemTwo = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <>
      <PageWrapper>
        <TimesheetPageContainer>
          <TimesheetTitleContainer>
            <TimesheetTitle
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 7,
                stiffness: 50,
                duration: 0.5,
              }}
            >
              Zarezerwuj
            </TimesheetTitle>
            <TimesheetTitle
              primary
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 7,
                stiffness: 50,
                duration: 0.5,
                delay: 0.3,
              }}
            >
              Wizytę
            </TimesheetTitle>
          </TimesheetTitleContainer>
          <TimesheetPickContainer>
            <TimesheetPick
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Option value="" disabled selected hidden>
                Wybierz usługę
              </Option>
              <Option value="1">najak</Option>
            </TimesheetPick>
            <TimesheetPick
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Option value="" disabled selected hidden>
                Wybierz specjalistę
              </Option>
              <Option value="2">esa?</Option>
            </TimesheetPick>
          </TimesheetPickContainer>

          <TimesheetContainer>
            <TimesheetDaysContainer
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Day>poniedziałek</Day>
              <Day>wtorek</Day>
              <Day>środa</Day>
              <Day>czwartek</Day>
              <Day>piątek</Day>
            </TimesheetDaysContainer>
            <TimesheetWrap>
              <TimesheetHoursContainer
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
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

              <Timesheet
                variants={container}
                initial="hidden"
                animate="visible"
              >
                <VisitRow variants={itemOne}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemOne}>
                  <Visit available></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemOne}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemOne}>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemOne}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemOne}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemOne}>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemOne}>
                  <Visit></Visit>
                  <Visit></Visit>
                  <Visit available></Visit>
                  <Visit></Visit>
                  <Visit></Visit>
                </VisitRow>
                <VisitRow variants={itemTwo}>
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

        <Pattern
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 7,
            stiffness: 50,
            duration: 0.5,
            delay: 0.6,
          }}
          src="Pattern.png"
          top="15%"
          left="70%"
        />
        <TimesheetLegend>
          <LegendItemWrap>
            <CircleFree
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                damping: 3,
                stiffness: 150,
              }}
            />
            <LegendText
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Wolny termin
            </LegendText>
          </LegendItemWrap>
          <LegendItemWrap>
            <CircleReserved
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                damping: 3,
                stiffness: 150,
              }}
            />
            <LegendText
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Zarezerwowany termin
            </LegendText>
          </LegendItemWrap>
          <LegendItemWrap>
            <CircleActive
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                damping: 3,
                stiffness: 150,
              }}
            />
            <LegendText
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Zaznaczony termin
            </LegendText>
          </LegendItemWrap>
        </TimesheetLegend>
      </PageWrapper>
    </>
  );
};

export default DoctorTimesheetPage;
