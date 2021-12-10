import React from "react";
import {
  Title,
  Content,
  ContentImage,
  ContentText,
} from "./AboutUsPageElements";
const Cabinet = () => {
  return (
    <>
      <Title
        transition={{ duration: 1 }}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Gabinet
      </Title>
      <Content
        transition={{ duration: .5 }}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ContentImage />
        <ContentText>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis porro
          assumenda voluptatum quaerat natus numquam perspiciatis asperiores
          quibusdam amet iusto. <br />
          <br />
          Voluptatibus totam praesentium numquam eaque iusto nam laboriosam
          itaque minus illum, vel amet labore molestias natus. Ipsa, est.
          Nostrum ratione dicta quibusdam assumenda velit unde nisi, ullam iure
          asperiores! Repellendus!
          <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
          perspiciatis deserunt illum accusamus eaque voluptas vero, nisi,
          <br />
          <br />
          facilis aspernatur, consequuntur et vitae placeat fuga ipsum vel fugit
          eius iusto magnam. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Distinctio et labore fugit, magnam sunt culpa ratione excepturi
          doloremque reiciendis suscipit facilis tenetur impedit vero? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          voluptate libero corporis, beatae dolore hic. Rerum amet adipisci
          pariatur atque? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Odio obcaecati officiis rerum quam unde nesciunt officia ullam
          <br />
        </ContentText>
      </Content>
    </>
  );
};

export default Cabinet;