import React, { useState, useEffect } from "react";
import UserService from "../../services/user";
import { PageWrapper } from "../../components/PageWrapper";
import { HeaderContainer, TextHeader } from "./HomePageElements";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <PageWrapper>
      <HeaderContainer>
        <h1>Witaj w SPS Dent</h1>
        <TextHeader>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi eius
          excepturi eaque dolorum voluptatum culpa voluptatem voluptatibus,
          reprehenderit atque nihil. Expedita, qui amet minima facere alias odio
          tempora doloribus eos unde dicta mollitia doloremque nemo iure ad
          magnam dolore delectus. Quidem similique voluptate magni dolorum animi
          molestias, quae repudiandae cupiditate?
        </TextHeader>
        <button>Umów się na wizyte</button>
      </HeaderContainer>
    </PageWrapper>
  );
};

export default Home;
