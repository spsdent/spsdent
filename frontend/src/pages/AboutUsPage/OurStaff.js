import { motion } from "framer-motion";
import React from "react";
import {
  OurStaffContainer,
  TitleContainer,
  Title,
  CardsContainer,
  Card,
  CardPicture,
  CardText,
  MoveCardIcon
} from "./OurStaffPageElements";

import { Pattern } from "../../components/Pattern";
const OurStaff = () => {
  return (
    <>
      <OurStaffContainer>
        <TitleContainer>
          <Title
            initial={{ y: -400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -400, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            Nasz
          </Title>{" "}
          <Title
            primary
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            zespół
          </Title>
        </TitleContainer>
        <CardsContainer>
          <Card
            top="10%"
            left="0%"
            initial={{ rotate: "90deg", y: 800, opacity: 0 }}
            animate={{ rotate: "-2deg", y: 0, opacity: 1 }}
            exit={{ rotate: "90deg", y: 800, opacity: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.3,
            }}
            drag={true}
            whileDrag={{
              zIndex: "10",
              
            }}
            dragConstraints={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            dragSnapToOrigin={true}
            dragElastic={1}
            dragTransition={{ bounceStiffness: 0.1 }}
          >
            <MoveCardIcon top=".3em" left=".3em"/>
            <MoveCardIcon top="18.5em" left="13.5em"/>
            <CardPicture pic="url('./doctor1.png')" />
            <CardText primary>mgr Agnieszka Krawat</CardText>
            <CardText>
              Absolwentka Uniwersytetu Marii Curie-Skłodowskiej w Lublinie w
              2017. Dyplomowana asystentka stomatologiczna. Czas wolny spędza ze
              znajomymi, lubi sushi i dobre komedie.
            </CardText>
          </Card>
          <Card
            top="15%"
            left="5%"
            initial={{ rotate: "90deg", y: 800, opacity: 0 }}
            animate={{ rotate: "-1deg", y: 0, opacity: 1 }}
            exit={{ rotate: "90deg", y: 800, opacity: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.3,
            }}
            drag={true}
            whileDrag={{
              zIndex: "10",
            }}
            dragConstraints={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            dragSnapToOrigin={false}
            dragElastic={1}
            dragTransition={{ bounceStiffness: 0.1 }}
          >
            <MoveCardIcon top=".3em" left=".3em"/>
            <MoveCardIcon top="18.5em" left="13.5em"/>
            <CardPicture pic="url('./doctor4.png')" />
            <CardText primary>Dr n.med. Monika Perec</CardText>
            <CardText>
              Absolwentka Uniwersytetu Medycznego w Lublinie (2005-2010). Staż
              podyplomowy odbywała w Wojewódzkiej Przychodni Stomatologicznej w
              Lublinie. W 2013 roku uzyskała tytuł doktora nauk medycznych.
            </CardText>
          </Card>
          <Card
            top="20%"
            left="10%"
            initial={{ rotate: "90deg", y: 800, opacity: 0 }}
            animate={{ rotate: "0deg", y: 0, opacity: 1 }}
            exit={{ rotate: "90deg", y: 800, opacity: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.3,
            }}
            drag={true}
            whileDrag={{
              zIndex: "10",
            }}
            dragConstraints={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            dragSnapToOrigin={false}
            dragElastic={1}
            dragTransition={{ bounceStiffness: 0.1 }}
          >
            <MoveCardIcon top=".3em" left=".3em"/>
            <MoveCardIcon top="18.5em" left="13.5em"/>
            <CardPicture pic="url('./doctor3.jpg')" />
            <CardText primary>Dr n.med. Gabriel Szalast</CardText>
            <CardText>
              Absolwent Uniwersytetu Medycznego w Lublinie (2009-2014). Odbył
              szkolenie specjalizacyjne z dziedziny ortodoncji w Poradni
              Ortopedii Szczękowej w Stomatologicznym Centrum Klinicznym
              Uniwersytetu Medycznego w Lublinie.
            </CardText>
          </Card>
          <Card
            top="25%"
            left="15%"
            initial={{ rotate: "90deg", y: 800, opacity: 0 }}
            animate={{ rotate: "1deg", y: 0, opacity: 1 }}
            exit={{ rotate: "90deg", y: 800, opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            drag={true}
            whileDrag={{
              zIndex: "10",
            }}
            dragConstraints={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            dragSnapToOrigin={false}
            dragElastic={1}
            dragTransition={{ bounceStiffness: 0.1 }}
          >
            <MoveCardIcon top=".3em" left=".3em"/>
            <MoveCardIcon top="18.5em" left="13.5em"/>
            <CardPicture pic="url('./doctor2.png')" />
            <CardText primary>lek.dent. Tomasz Sulenta</CardText>
            <CardText>
              Absolwent Uniwersytetu Medycznego w Lublinie w roku 2010. Staż
              podyplomowy odbywał w Wojewódzkiej Przychodni Stomatologicznej W
              Lublinie. W 2013 roku uzyskał tytuł doktora nauk medycznych.
            </CardText>
          </Card>
        </CardsContainer>
        <Pattern
          src="Pattern.png"
          top="15%"
          left="13%"
          transition={{ duration: 0.3 }}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
        ></Pattern>
        <Pattern
          src="Pattern.png"
          top="65%"
          left="73%"
          transition={{ duration: 0.3 }}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
        ></Pattern>
      </OurStaffContainer>
    </>
  );
};

export default OurStaff;
