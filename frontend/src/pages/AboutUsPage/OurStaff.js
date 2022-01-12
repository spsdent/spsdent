// import React, { Component } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Title,
//   Content,
//   ContentImage,
//   ContentText,
//   DoctorName,
//   LineAboutUs,
//   Gallery,
// } from "./AboutUsPageElements";

// class OurStaff extends Component {
//   state = {
//     subPage: "",
//   };

//   // handlePageChange = (subPage) => {
//   //   window.scrollTo(0, 0);
//   //   this.setState({
//   //     subPage,
//   //   });
//   // };

//   render() {
//     return (
//       <>

//         {/* <Title
//           transition={{ duration: 1 }}
//           initial={{ opacity: 0, x: -200 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           Nasza Kadra
//         </Title>
//         <Content
//           transition={{ duration: 0.5 }}
//           initial={{ opacity: 0, x: -200 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <button onClick={() => this.handlePageChange(1)}>1</button>
//           <button onClick={() => this.handlePageChange(2)}>2</button>
//           {this.state.subPage === 1 && (
//             <AnimatePresence>
//               <Gallery
//                 key={"suena"}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <LineAboutUs />
//                 <ContentText>
//                   Nasz zespół to wyjątkowi specjaliści...<br></br>
//                   Zapraszamy do zapoznania se z naszymi dentystami.
//                 </ContentText>
//                 <ContentImage src="doctor1.png" />
//                 <DoctorName>Dr n.med. Monika Sulenta</DoctorName>
//                 <ContentText>
//                   Absolwentka Uniwersytetu Medycznego w Lublinie (2005-2010).
//                   Staż podyplomowy odbywała w Wojewódzkiej Przychodni
//                   Stomatologicznej w Lublinie. W 2013 roku uzyskała tytuł
//                   doktora nauk medycznych. W trakcie odbywania specjalizacji z
//                   zakresu stomatologii wieku rozwojowego. Swoje kwalifikacje
//                   zawodowe systematycznie podnosi biorąc udział w licznych
//                   kursach, szkoleniach podyplomowych, kongresach i konferencjach
//                   naukowych.
//                 </ContentText>
//                 <LineAboutUs />
//                 <ContentImage src="doctor2.png" />
//                 <DoctorName>lek.dent. Tomasz Perec</DoctorName>
//                 <ContentText>
//                   Absolwent Uniwersytetu Medycznego w Lublinie w roku 2010. Staż
//                   podyplomowy odbywał w Wojewódzkiej Przychodni Stomatologicznej
//                   W Lublinie. W 2013 roku uzyskał tytuł doktora nauk medycznych.
//                   Tytuł specjalisty z zakresu chirurgii stomatologicznej uzyskał
//                   w 2017 roku. Zatrudniony na stanowisku asystenta w Katedrze i
//                   Zakładzie Chirurgii Stomatologicznej Uniwersytetu Medycznego w
//                   Lublinie. Jako nauczyciel akademicki prowadzi zajęcia
//                   dydaktyczne z przedmiotu chirurgia stomatologiczna ze
//                   studentami III, IV i V roku studiów lekarsko-dentystycznych.
//                   Uczestnik licznych konferencji i kursów w Polsce i za granicą.
//                   Autor publikacji w czasopismach polsko- oraz anglojęzycznych.
//                 </ContentText>
//                 <LineAboutUs />
//                 <ContentImage src="doctor3.jpg" />
//                 <DoctorName>Dr n.med. Gabriel Szalast</DoctorName>
//                 <ContentText>
//                   Absolwent Uniwersytetu Medycznego w Lublinie (2009-2014).
//                   Odbył szkolenie specjalizacyjne z dziedziny ortodoncji w
//                   Poradni Ortopedii Szczękowej w Stomatologicznym Centrum
//                   Klinicznym Uniwersytetu Medycznego w Lublinie (2015-2019).
//                   Egzamin specjalizacyjny zdał w 2019 roku. Regularnie
//                   uczestniczy w kursach i szkoleniach ortodontycznych, aby
//                   zapewnić najwyższy poziom leczenia.Zawodowo zainteresowany
//                   jest tematyką zębów zatrzymanych, a także mechaniką leczenia
//                   aparatami stałymi. Przykłada dużą wagę do szczegółowego
//                   omówienia problemu ortodontycznego, aby pacjent rozumiał
//                   przebieg i postępy leczenia.
//                 </ContentText>
//                 <LineAboutUs />
//                 <ContentImage src="doctor4.png" />
//                 <DoctorName>mgr Karolina Sorbet</DoctorName>
//                 <ContentText>
//                   Absolwentka Uniwersytetu Marii Curie-Skłodowskiej w Lublinie w
//                   2017. Dyplomowana asystentka stomatologiczna. Czas wolny
//                   spędza ze znajomymi, lubi sushi i dobre komedie.
//                 </ContentText>
//                 <LineAboutUs />
//               </Gallery>
//             </AnimatePresence>
//           )}
//           {this.state.subPage === 2 && (
//             <AnimatePresence exitBeforeEnter>
//               <motion.p
//                 key="suenaa"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 rucham ci starego
//               </motion.p>
//             </AnimatePresence>
//           )}
//         </Content> */}
//       </>
//     );
//   }
// }

// export default OurStaff;

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
