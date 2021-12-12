import React, { Component } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { motion } from "framer-motion";
import OurStaff from "./OurStaff";
import Cabinet from "./Cabinet";
import Default from "./Default";
import ButtonPick from "./Button";
import { Pattern } from "../../components/Pattern";
import {
  AboutUsContainer,
  AboutUsContent,
  PickContainer,
  FogAboutUs,
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
            <ButtonPick
              name={"Nasza Kadra"}
              image={"AboutUsButton.png"}
              top={"30%"}
              click={() => this.handleClick(0)}
            />
            <ButtonPick
              name={"Gabinet"}
              image={"AboutUsButton1.png"}
              top={"60%"}
              click={() => this.handleClick(1)}
            />
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
        {/* <FogAboutUs /> */}
      </PageWrapper>
    );
  }
}

export default AboutUsPage;
