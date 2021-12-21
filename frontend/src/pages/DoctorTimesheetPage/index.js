import React, { Component } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { Pattern } from "../../components/Pattern";
import "../../styles/index.css";
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

class DoctorTimesheetPage extends Component {
  state = {
    input: true,
    timesheet: true,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  disabled = {
    opacity: .4,
    pointerEvents: "none",
  };
  enabled = {
    opacity: 1,
  };
  container = {
    hidden: {opacity: .99},
    visible: {
      opacity: .99,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  itemOne = {
    hidden: { x: 100, opacity: 0},
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.5, damping: 7, stiffness: 50 },
    },
  };
   itemTwo = {
    hidden: { x: -100, opacity: 0},
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.5, damping: 7, stiffness: 50 },
    },
  };

  render() {
    return (
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
            name="input"
              value={this.state.input}
              onChange={this.handleChange}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Option value="true" disabled selected hidden>
                Wybierz usługę
              </Option>
              <Option value={"1"}>najak</Option>
            </TimesheetPick>
         
              <TimesheetPick
              style={
                typeof this.state.input === "string"
                  ? this.enabled
                  : this.disabled
              }
                name="timesheet"
                value={this.state.timesheet}
                onChange={this.handleChange}
                initial={{  x: 50 }}
                animate={{  x: 0 }}
                transition={{ duration: 1 }}
              >
                <Option value="true" disabled selected hidden>
                  Wybierz specjalistę
                </Option>
                <Option value="1">esa?</Option>
              </TimesheetPick>
            
          </TimesheetPickContainer>
            <TimesheetContainer style={
                typeof this.state.timesheet === "string"
                  ? this.enabled
                  : this.disabled
              }>
              <TimesheetDaysContainer
                initial={{  x: 50, opacity: 0 }}
                animate={{  x: 0, opacity: 1 }}
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
                  initial={{ y: 50, opacity: 0 }}
                  animate={{  y: 0, opacity: 1 }}
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
                  variants={this.container}
                  initial="hidden"
                  animate="visible"
                >
                  <VisitRow variants={this.itemOne}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemOne}>
                    <Visit available></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemOne}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemOne}>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemOne}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemOne}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemOne}>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemOne}>
                    <Visit></Visit>
                    <Visit></Visit>
                    <Visit available></Visit>
                    <Visit></Visit>
                    <Visit></Visit>
                  </VisitRow>
                  <VisitRow variants={this.itemTwo}>
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
    );
  }
}

export default DoctorTimesheetPage;
