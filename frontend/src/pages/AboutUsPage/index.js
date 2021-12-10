import React, { Component } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { motion } from "framer-motion";
import OurStaff from "./OurStaff";
import Cabinet from "./Cabinet";
import Default from "./Default";
import ButtonPick from "./Button";
import {
  AboutUsContainer,
  AboutUsContent,
  PickContainer,
  FogAboutUs,
} from "./AboutUsPageElements";
class AboutUsPage extends Component {
  state = {
    pick: "default",
  };

  handleClick = (pick) => {
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
          <AboutUsContent >
            {this.state.pick === "default" && <Default />}
            {this.state.pick === 1 && <Cabinet />}
            {this.state.pick === 0 && <OurStaff />}
          </AboutUsContent>
        </AboutUsContainer>
        {/* <FogAboutUs /> */}
      </PageWrapper>
    );
  }
}

export default AboutUsPage;
