import { FC, useState } from "react";
import "./Mastermind.module.css";
import ColorSelector from "./Component/ColorSelectorComponent/ColorSelector.component";
import Board from "./Component/Board/Board.component";
import { ColorValidationPosition, HistoLine } from "./HistoLine";
import { MastermindColor } from "./Color";
import { Modal } from "react-bootstrap";

function generateNewCombinaison() {
  let result = [];

  for (let i = 0; i < 4; i++) {
    let rand = Math.round(Math.random() * 8);
    switch (rand) {
      case 0:
        result.push(MastermindColor.blue);
        break;
      case 1:
        result.push(MastermindColor.cyan);
        break;
      case 2:
        result.push(MastermindColor.green);
        break;
      case 2:
        result.push(MastermindColor.orange);
        break;
      case 4:
        result.push(MastermindColor.pink);
        break;
      case 5:
        result.push(MastermindColor.purple);
        break;
      case 6:
        result.push(MastermindColor.red);
        break;
      default:
        result.push(MastermindColor.white);
    }
  }
  return result;
}

const Mastermind: FC = () => {
  const [histoLine, setColorHistory] = useState([] as HistoLine[]);
  const [combinaison, setCobinaison] = useState(generateNewCombinaison());

  function addColorHistory(colorsSelected: string[]) {
    let colorToTest = [...colorsSelected];
    let combinaisonToTest = [...combinaison] as string[];

    // start to test color which are well positionned
    let wellPositionned = 0;
    for (let i = 0; i < colorToTest.length; i++) {
      if (colorToTest[i] === combinaisonToTest[i]) {
        wellPositionned++;
        colorToTest[i] = "X";
        combinaisonToTest[i] = "Y";
      }
    }

    // continu to test color which are well positionned
    let badPositionned = 0;
    for (let i = 0; i < colorToTest.length; i++) {
      for (let j = 0; j < combinaisonToTest.length; j++) {
        if (colorToTest[i] === combinaisonToTest[j]) {
          badPositionned++;
          colorToTest[i] = "X";
          combinaisonToTest[j] = "Y";
        }
      }
    }

    histoLine.push({
      colorSelected: colorsSelected,
      positionned: {
        well: wellPositionned,
        bad: badPositionned,
      } as ColorValidationPosition,
    } as HistoLine);
    setColorHistory([...histoLine]);
  }

  return (
    <>
      <div>Mastermind</div>
      <Board histoLine={histoLine} />
      <ColorSelector addColorHistory={addColorHistory} />
    </>
  );
};

export default Mastermind;
