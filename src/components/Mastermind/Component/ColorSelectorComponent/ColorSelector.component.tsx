import { FC, useCallback, useState } from "react";
import ButtonColor from "../ButonColorComponent/ButtonColor.component";
import { MastermindColor } from "../../Color";
import Button from "react-bootstrap/Button";
import React from "react";
import styles from "./ColorSelector.module.css";

const ColorSelector: FC<{
  addColorHistory: Function;
}> = (props) => {
  const [colorSelected, setColorSelected] = useState(
    new Array(4).fill("") as String[]
  );
  const [selectionFull, setSelectionFull] = useState(false);
  const [positionSelected, setPositionSelected] = useState(0);

  function addColor(color: string) {
    console.log(colorSelected);
    colorSelected[positionSelected] = color.valueOf();
    setColorSelected([...colorSelected]);
    setPositionSelected(positionSelected + (positionSelected < 3 ? 1 : 0));

    if (colorSelected.every((element) => element != "")) {
      setSelectionFull(true);
    }
  }

  function removeColor() {
    colorSelected[positionSelected] = "";
    setColorSelected([...colorSelected]);
    setSelectionFull(false);
  }

  function sendColor() {
    props.addColorHistory(colorSelected);
    setColorSelected(["", "", "", ""]);
    setSelectionFull(false);
    setPositionSelected(0);
  }

  console.log("render color selector");

  let lstColorSelected = [];
  for (let i = 0; i < colorSelected.length; i++) {
    if (colorSelected[i] != "") {
      lstColorSelected.push(
        <div
          className={
            styles.ColorSquare +
            " " +
            styles.ColorSquareSelected +
            " " +
            (positionSelected == i ? styles.ColorSquareActive : "")
          }
          style={{
            backgroundColor: colorSelected[i].valueOf(),
          }}
          onClick={() => {
            setPositionSelected(i);
          }}
        ></div>
      );
    } else {
      lstColorSelected.push(
        <div
          className={
            styles.ColorSquare +
            " " +
            styles.ColorSquareNotSelected +
            " " +
            (positionSelected == i ? styles.ColorSquareActive : "")
          }
          onClick={() => {
            setPositionSelected(i);
          }}
        ></div>
      );
    }
  }

  return (
    <>
      <div className={styles.ColorSelector}>
        {lstColorSelected}
        <br />
        {Object.values(MastermindColor).map((val) => {
          return <ButtonColor color={val} clickColor={addColor} />;
        })}
        <br />
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            removeColor();
          }}
          disabled={colorSelected.length == 0}
        >
          Remove
        </Button>
        <Button
          variant="secondary"
          size="lg"
          disabled={!selectionFull}
          onClick={sendColor}
        >
          Validate
        </Button>
      </div>
    </>
  );
};

export default ColorSelector;
