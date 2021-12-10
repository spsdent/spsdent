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
    border: "2px solid black",
    backgroundColor: "#666",
    borderRadius: "10px",
    fontFamily: "Bebas Neue",
    color: "white",
    paddingLeft: "12px",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95}}
      transition={{duration: .2}}
      style={style}
      onClick={props.click}
    >
      {props.name}
    </motion.button>
  );
};

export default ButtonPick;
