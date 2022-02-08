import { motion } from "framer-motion";
import React from "react";
import {
  Container,
  Title,
  CabinetColumn,
  PhotoCabinet,
  Rectangle,
  Scroll,
  ScrollContainer,
} from "./CabinetPageElements";
import { Pattern } from "../../components/Pattern";
const style = {
  position: "fixed",
  bottom: "5%",
  left: "50%",
  fontSize: "2em",
  color: "#333",
};

const Cabinet = () => {
  return (
    <>
    <Container>
      <CabinetColumn>
        <Title
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{ duration: 0.5, bounce: 0.9, mass: 0.8 }}
        >
          Gabinet
        </Title>
        <Rectangle
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{
            duration: 0.4,
            type: "spring",
            bounce: 0.8,
            mass: 0.8,
          }}
          whileHover={{ width: "17em" }}
        ></Rectangle>
        <ScrollContainer
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          exit={{ y: 400 }}
          transition={{ duration: 0.5 }}
        >
          <Scroll />
        </ScrollContainer>
      </CabinetColumn>
      <CabinetColumn
        primary
        initial={{ opacity: 0, y: "40vw" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-40vw" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.8, mass: 0.8 }}
      >
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          primary
          src="url('./cabinet4.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src="url('./cabinet2.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          primary
          src="url('./cabinet3.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src="url('./cabinet1.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          primary
          src="url('./cabinet5.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src="url('./cabinet6.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          primary
          src="url('./cabinet7.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src="url('./cabinet8.jpg')"
        />
        <PhotoCabinet
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          primary
          src="url('./cabinet9.jpg')"
        />
      </CabinetColumn>
      <Pattern
        src="Pattern.png"
        top="18%"
        left="45%"
        transition={{ duration: 0.3 }}
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -200, opacity: 0 }}
      ></Pattern>
      <Pattern
        src="Pattern.png"
        top="65%"
        left="13%"
        transition={{ duration: 0.3 }}
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -200, opacity: 0 }}
      ></Pattern>
      </Container>
    </>
  );
};

export default Cabinet;
