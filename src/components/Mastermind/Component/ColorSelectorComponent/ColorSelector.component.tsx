import { FC, useCallback, useState } from "react";
import ButtonColor from "../ButonColorComponent/ButtonColor.component";
import ColorSelected from "../ColorSelectedComponent/ColorSelected.component";
import { MastermindColor } from "../../Color";
import Button from "react-bootstrap/Button";
import React from "react";
import styles from "./ColorSelector.module.css";

const ColorSelector: FC<{
  addColorHistory: Function;
}> = (props) => {
  const [colorSelected, setColorSelected] = useState([] as String[]);
  const [selectionFull, setSelectionFull] = useState(false);

  function addColor(color: string) {
    console.log(colorSelected);
    if (!selectionFull) {
      colorSelected.push(color);
      setColorSelected([...colorSelected]);

      if (colorSelected.length >= 4) {
        setSelectionFull(true);
      }
    }
  }

  function removeLastColor() {
    if (colorSelected.length > 0) {
      colorSelected.pop();
      setColorSelected([...colorSelected]);
      setSelectionFull(false);
    }
  }

  function sendColor() {
    props.addColorHistory(colorSelected);
    setColorSelected([]);
    setSelectionFull(false);
  }

  console.log("render color selector");

  return (
    <div className={styles.ColorSelector}>
      <ColorSelected colors={colorSelected} />
      <br />
      {Object.values(MastermindColor).map((val) => {
        return <ButtonColor color={val} clickColor={addColor} />;
      })}
      <br />
      <Button
        variant="secondary"
        size="lg"
        onClick={() => {
          removeLastColor();
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
  );
};

export default ColorSelector;
