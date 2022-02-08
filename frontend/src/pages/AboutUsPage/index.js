import React, { Component } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { AnimatePresence } from "framer-motion";
import OurStaff from "./OurStaff";
import Cabinet from "./Cabinet";
import Default from "./Default";
import {
  Container,
  ButtonsContainer,
  CircleButton,
  ButtonContainer,
  ButtonText,
  ContentContainer,
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
            <ButtonContainer
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: -200 }}
              onClick={() => this.handleClick(1)}
            >
              <CircleButton style={pick === 1 ? active : deactive} />
              <ButtonText>O nas</ButtonText>
            </ButtonContainer>
            <ButtonContainer
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: -200 }}
              transition={{ delay: 0.2 }}
              onClick={() => this.handleClick(2)}
            >
              <CircleButton
                style={pick === 2 ? active : deactive}
              ></CircleButton>
              <ButtonText>Nasz zespół</ButtonText>
            </ButtonContainer>
            <ButtonContainer
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              exit={{ y: -200 }}
              transition={{ delay: 0.4 }}
              onClick={() => this.handleClick(3)}
            >
              <CircleButton
                style={pick === 3 ? active : deactive}
              ></CircleButton>
              <ButtonText>Gabinet</ButtonText>
            </ButtonContainer>
          </ButtonsContainer>
          <ContentContainer>
            <AnimatePresence exitBeforeEnter>
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
export default AboutUsPage;
