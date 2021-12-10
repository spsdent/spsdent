import React from 'react';
const ButtonPick = (props) => {

    const style = {
        position: "fixed",
        top: `${props.top}`,
        left: "30%",
        transform: "translate(-50%,-50%)",
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
    }

    return ( 
        <button style={style} onClick={props.click}>{props.name}</button>
     );
}
 
export default ButtonPick;