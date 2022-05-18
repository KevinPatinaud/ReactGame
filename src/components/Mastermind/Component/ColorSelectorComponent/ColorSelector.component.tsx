import { FC, useCallback, useState } from "react";
import ButtonColor from "../ButonColorComponent/ButtonColor.component";
import ColorSelected from "../ColorSelectedComponent/ColorSelected.component";
import { MastermindColor } from "../../Color";
import React from "react";

const ColorSelector: FC = () => {
  const [colorSelected, setColorSelected] = useState([] as String[]);
  const [selectionFull, setSelectionFull] = useState(false);

  const addColor = useCallback(
    (color: string) => {
      console.log(colorSelected);
      if (colorSelected.length >= 4) {
        setSelectionFull(true);
      } else {
        setSelectionFull(false);
        colorSelected.push(color);
        setColorSelected([...colorSelected]);
      }
    },
    [selectionFull, colorSelected]
  );

  console.log("render color selector");

  return (
    <>
      <ColorSelected colors={colorSelected} />
      {Object.keys(MastermindColor).map((key) => {
        return <ButtonColor color={key} clickColor={addColor} />;
      })}
      <MemoBtnRed color={MastermindColor.red} clickColor={addColor} />
      <MemoBtnGreen color={MastermindColor.green} clickColor={addColor} />
      <MemoBtnBlue color={MastermindColor.blue} clickColor={addColor} />
    </>
  );
};

const btnColor = Object.keys(MastermindColor).map((key) => {
  return React.memo(ButtonColor);
});

const MemoBtnRed = React.memo(ButtonColor);
const MemoBtnGreen = React.memo(ButtonColor);
const MemoBtnBlue = React.memo(ButtonColor);

export default ColorSelector;
