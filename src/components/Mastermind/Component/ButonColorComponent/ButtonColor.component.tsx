import { FC, useState } from "react";
import styles from "./ButtonColor.module.css";
import { MastermindColor } from "../../Color";
import React from "react";

const ButtonColor: FC<{ color: string; clickColor: Function }> = (props) => {
  const [color, setColor] = useState(props.color);
  console.log("render button color : " + color);

  return (
    <div
      className={styles.buttonColor}
      style={{ backgroundColor: color }}
      onClick={() => {
        console.log("click button color : " + color);
        props.clickColor(color);
      }}
    ></div>
  );
};

export default ButtonColor;
