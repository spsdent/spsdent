import { motion } from "framer-motion";
import React from "react";
import {
  Title,
  CabinetColumn,
  PhotoCabinet,
  VideoCoverage,
  Rectangle,
  RectangleContainer,
} from "./CabinetPageElements";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  position: "fixed",
  top: "3.2em",
  left: "3.5em",
  filter: "blur(10px)",
};
const Cabinet = () => {
  return (
    <>
      <CabinetColumn>
        <Title
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{ duration: 0.5, bounce: 0.9,
            mass: 0.8 }}
        >
          Gabinet
        </Title>
        <Rectangle
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{
            delay: 0.4,
            duration: 0.4,
            type: "spring",
            bounce: 0.8,
            mass: 0.8
          }}
        />
      </CabinetColumn>
      <CabinetColumn
        primary
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PhotoCabinet src="url('./cabinet4.jpg')" />
        <PhotoCabinet src="url('./cabinet2.jpg')" />
        <PhotoCabinet src="url('./cabinet3.jpg')" />
        <PhotoCabinet src="url('./cabinet1.jpg')" />
        <PhotoCabinet src="url('./cabinet5.jpg')" />
        <PhotoCabinet src="url('./cabinet6.jpg')" />
        <PhotoCabinet src="url('./cabinet7.jpg')" />
        <PhotoCabinet src="url('./cabinet8.jpg')" />
        <PhotoCabinet src="url('./cabinet9.jpg')" />
      </CabinetColumn>
    </>
  );
};

export default Cabinet;
