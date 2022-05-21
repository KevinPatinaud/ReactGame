import { FC, useCallback, useEffect, useState } from "react";
import "./Mastermind.module.css";
import ColorSelector from "./Component/ColorSelectorComponent/ColorSelector.component";
import Board from "./Component/Board/Board.component";
import ModalEndGame from "./Component/ModalEndGame/ModalEndGame.component";
import { ColorValidationPosition, HistoLine } from "./HistoLine";
import { MastermindColor } from "./Color";
import React from "react";

function generateNewCombinaison() {
  let result = [];

  for (let i = 0; i < 4; i++) {
    result.push(Object.values(MastermindColor)[Math.round(Math.random() * 8)]);
  }
  console.log("combinaison : " + result);
  return result;
}

export enum gameStatus {
  win,
  loose,
  inProgress,
}

const Mastermind: FC = () => {
  const [histoLine, setColorHistory] = useState([] as HistoLine[]);
  const [combinaison, setCombinaison] = useState([] as MastermindColor[]); // we can't set the generateNewCombinaison function here beceauxe it's executed each time the component is rendering
  const [status, setStatus] = useState(gameStatus.inProgress);

  // We initiate the combinaison here we page load for the first time
  useEffect(() => {
    setCombinaison(generateNewCombinaison());
  }, []);

  function addColorHistory(colorsSelected: string[]) {
    if (status != gameStatus.inProgress) return;

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

    if (wellPositionned === 4) {
      setStatus(gameStatus.win);
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

  if (histoLine.length >= 12 && status == gameStatus.inProgress) {
    setStatus(gameStatus.loose);
  }

  return (
    <>
      <div>Mastermind</div>
      <Board histoLine={histoLine} />
      <ColorSelector addColorHistory={addColorHistory} />
      <MemoModalEndGame gameStatus={status} />
    </>
  );
};

const MemoModalEndGame = React.memo(ModalEndGame);

export default Mastermind;
