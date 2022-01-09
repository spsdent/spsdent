import React, { Component } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import OurStaff from "./OurStaff";
import Cabinet from "./Cabinet";
import Default from "./Default";
import { Pattern } from "../../components/Pattern";
import {
  Container,
  ButtonsContainer,
  ContentContainer,
  CircleButton,
  ButtonContainer,
  ButtonText,
} from "./AboutUsPageElements";

class AboutUsPage extends Component {
  state = {
    pick: 1,
    active: {
      backgroundColor: "#01d4bf",
    },
    deactive: {
      backgroundColor: "#333",
    },
  };

  handleClick = (props) => {
    this.setState({
      pick: props,
    });
  };

  render() {
    const { pick, active, deactive } = this.state;
    return (
      <PageWrapper>
        <Container>
          <ButtonsContainer>
            <ButtonContainer onClick={() => this.handleClick(1)}>
              <CircleButton style={pick === 1 ? active : deactive} />
              <ButtonText>O nas</ButtonText>
            </ButtonContainer>
            <ButtonContainer onClick={() => this.handleClick(2)}>
              <CircleButton
                style={pick === 2 ? active : deactive}
              ></CircleButton>
              <ButtonText>Nasza kadra</ButtonText>
            </ButtonContainer>
            <ButtonContainer onClick={() => this.handleClick(3)}>
              <CircleButton
                style={pick === 3 ? active : deactive}
              ></CircleButton>
              <ButtonText>Gabinet</ButtonText>
            </ButtonContainer>
          </ButtonsContainer>
          <ContentContainer>
            <AnimatePresence>
              {pick === 1 && <Default key="1" />}
              {pick === 2 && <OurStaff key="2" />}
              {pick === 3 && <Cabinet key="3" />}
            </AnimatePresence>
          </ContentContainer>
        </Container>
      </PageWrapper>
    );
  }
}

// class AboutUsPage extends Component {
//   // state={}

//   // render() {
//   //   return (
//   //     <>

//   //     </>
//   //   )
//   // }

//   state = {
//     pick: "default",
//   };

//   handleClick = (pick) => {
//     window.scrollTo(0, 0);
//     this.setState({
//       pick,
//     });
//   };

//   render() {
//     return (
//       <PageWrapper>
//         <AboutUsContainer>
//           <PickContainer>
//             <PickButton
//               primary
//               initial={{ opacity: 0, x: 200 }}
//               animate={{ opacity: 1, x: 0 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.4 }}
//               onClick={() => this.handleClick(0)}
//             >
//               Nasza Kadra
//             </PickButton>
//             <PickButton
//               initial={{ opacity: 0, x: 200 }}
//               animate={{ opacity: 1, x: 0 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.5 }}
//               onClick={() => this.handleClick(1)}
//             >
//               Gabinet
//             </PickButton>
//           </PickContainer>
//           <AnimatePresence>
//             <AboutUsContent
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.2 },
//               }}
//             >
//               {this.state.pick === "default" && <Default />}
//               {this.state.pick === 1 && <Cabinet />}
//               {this.state.pick === 0 && <OurStaff />}
//             </AboutUsContent>
//           </AnimatePresence>
//         </AboutUsContainer>
//         <Pattern
//           src="Pattern.png"
//           top={"65%"}
//           left={"65%"}
//           transition={{ duration: 1 }}
//           initial={{ scale: 0 }}
//           animate={{ scale: 1.2 }}
//         />
//         <Pattern
//           src="Pattern.png"
//           top={"12%"}
//           left={"12%"}
//           transition={{ duration: 1 }}
//           initial={{ scale: 0 }}
//           animate={{ scale: 1.5 }}
//         />
//       </PageWrapper>
//     );
//   }
// }

export default AboutUsPage;
