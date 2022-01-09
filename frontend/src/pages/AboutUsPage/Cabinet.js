// import React from "react";
// import {
//   Title,
//   Content,
//   ContentText,
//   LineAboutUs,
//   CabinetImage,
//   Gallery,
// } from "./AboutUsPageElements";
// const Cabinet = () => {
//   return (
//     <>
//       <Title
//         transition={{ duration: 1 }}
//         initial={{ opacity: 0, x: -200 }}
//         animate={{ opacity: 1, x: 0 }}
//       >
//         Gabinet
//       </Title>
//       <Content
//         transition={{ duration: 0.5 }}
//         initial={{ opacity: 0, x: -200 }}
//         animate={{ opacity: 1, x: 0 }}
//       >
//         <LineAboutUs />
//         <ContentText>
//           SPS Dental Clinic to miejsce, gdzie czeka na państwa profesjonalny
//           zespół specjalistów.
//         </ContentText>
//         <Gallery>
//           <CabinetImage primary src="cabinet1.png" />
//           {/* <LineAboutUs primary /> */}
//           <CabinetImage src="cabinet2.png" />
//           {/* <LineAboutUs primary /> */}
//           <CabinetImage primary src="cabinet3.png" />
//           {/* <LineAboutUs primary /> */}
//           <CabinetImage src="cabinet4.png" />
//           <LineAboutUs />
//           <ContentText>
//             Do Państwa dyspozycji jest ambitny zespół – doświadczeni
//             specjaliści, którzy stale się doszkalają, biorąc udział w kursach,
//             sympozjach i konferencjach, aby oferować Pacjentom jak najlepszą
//             obsługę. Jakość obsługi wyróżnia nas na tle innych gabinetów.
//           </ContentText>
//         </Gallery>
//       </Content>
//     </>
//   );
// };

// export default Cabinet;

import { motion } from "framer-motion";
import React from "react";

const Cabinet = () => {
  return (
    <motion.h1
      key="3"
      initial={{ opacity: 0, y: "50vh" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "-50vh" }}
      transition={{ duration: 1 }}
    >
      siemano 3
    </motion.h1>
  );
};

export default Cabinet;
