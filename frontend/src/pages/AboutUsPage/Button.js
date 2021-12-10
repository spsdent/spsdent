import React from "react";
import { motion } from "framer-motion";
const ButtonPick = (props) => {
  const style = {
    position: "fixed",
    top: `${props.top}`,
    left: "25%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "247px",
    height: "189px",
    fontSize: "36px",
    // border: "2px solid black",
    backgroundColor: "#666",
    borderRadius: "10px",
    fontFamily: "Bebas Neue",
    color: "white",
    paddingLeft: "12px",
    backgroundImage: `url(${props.image})`,
    backgroundSize: "cover",
    borderStyle: "none",
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 200}}
      animate={{ opacity: 1, x: 0}}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={style}
      onClick={props.click}
    >
      {props.name}
    </motion.button>
  );
};

export default ButtonPick;
