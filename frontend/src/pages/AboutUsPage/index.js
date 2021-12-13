import React, { Component } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { motion } from "framer-motion";
import OurStaff from "./OurStaff";
import Cabinet from "./Cabinet";
import Default from "./Default";
import { Pattern } from "../../components/Pattern";
import {
  AboutUsContainer,
  AboutUsContent,
  PickContainer,
  PickButton,
} from "./AboutUsPageElements";
class AboutUsPage extends Component {
  state = {
    pick: "default",
  };

  handleClick = (pick) => {
    window.scrollTo(0, 0);
    this.setState({
      pick,
    });
  };

  render() {
    return (
      <PageWrapper>
        <AboutUsContainer>
          <PickContainer>
            <PickButton
              primary
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => this.handleClick(0)}
            >
              Nasza Kadra
            </PickButton>
            <PickButton
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => this.handleClick(1)}
            >
              Gabinet
            </PickButton>
          </PickContainer>
          <AboutUsContent>
            {this.state.pick === "default" && <Default />}
            {this.state.pick === 1 && <Cabinet />}
            {this.state.pick === 0 && <OurStaff />}
          </AboutUsContent>
        </AboutUsContainer>
        <Pattern
          src="Pattern.png"
          top={"65%"}
          left={"65%"}
          transition={{ duration: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
        />
        <Pattern
          src="Pattern.png"
          top={"12%"}
          left={"12%"}
          transition={{ duration: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
        />
      </PageWrapper>
    );
  }
}

export default AboutUsPage;
