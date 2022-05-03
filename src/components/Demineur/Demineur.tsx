import React, { Component, FunctionComponent, useState } from "react";
import DemineurSquare from "./DemineurSquare";
import SquareProps from "./SquareProps";
import useSound from "use-sound";
import boomSFX from "../../sounds/boom.mp3";
import styles from "./DemineurSquare.module.css";
import { lookupService } from "dns";
import { useIntl } from "react-intl";
enum endStatusEnum {
  loose,
  win,
  notYet,
}

function generateListOfBomb(
  totalAmountOfSquare: number,
  nbOfBombToSet: number
) {
  var result: number[] = new Array();

  while (result.length < nbOfBombToSet) {
    var nb = Math.trunc(Math.random() * totalAmountOfSquare);
    if (result.indexOf(nb) === -1) {
      result.push(nb);
    }
  }

  return result;
}

// Generate a new board
function generateBoard(boardWidth: number, nbOfBomb: number) {
  const b: SquareProps[] = new Array();

  var lstOfBomb = generateListOfBomb(boardWidth * boardWidth, nbOfBomb);

  // count the number of bomb for each case
  for (var i = 0; i < boardWidth * boardWidth; i++) {
    var nbOfBombNext = 0;

    var cg = i % boardWidth > 0 ? false : true;
    var cd = i % boardWidth < boardWidth - 1 ? false : true;
    var ch = i >= boardWidth ? false : true;
    var cb = i < boardWidth * (boardWidth - 1) ? false : true;

    if (!cg && lstOfBomb.indexOf(i - 1) >= 0) nbOfBombNext++;

    if (!cd && lstOfBomb.indexOf(i + 1) >= 0) nbOfBombNext++;

    if (!ch && lstOfBomb.indexOf(i - boardWidth) >= 0) nbOfBombNext++;

    if (!cb && lstOfBomb.indexOf(i + boardWidth) >= 0) nbOfBombNext++;

    if (!cg && !ch && lstOfBomb.indexOf(i - boardWidth - 1) >= 0)
      nbOfBombNext++;

    if (!cg && !cb && lstOfBomb.indexOf(i + boardWidth - 1) >= 0)
      nbOfBombNext++;

    if (!cd && !ch && lstOfBomb.indexOf(i - boardWidth + 1) >= 0)
      nbOfBombNext++;

    if (!cd && !cb && lstOfBomb.indexOf(i + boardWidth + 1) >= 0)
      nbOfBombNext++;

    const sqProps = {
      index: i,
      boardWidth: boardWidth,
      haveBomb: lstOfBomb.indexOf(i) >= 0,
      numberOfBombNext: nbOfBombNext,
      revealed: false,
      revealFunct: () => {},
      flagged: false,
      switchFlag: () => {},
    };

    b.push(sqProps);
  }

  return b;
}

function Demineur(props: any) {
  const [boardWidth, setBoardWidth] = useState(props.width);
  const [numberOfBomb, setNumberOfBomb] = useState(props.nmbBomb);
  const [board, setBoard] = useState(generateBoard(boardWidth, numberOfBomb));
  const [dspBoard, setDspBoard] = useState(
    board.map((sqr: SquareProps) => <>{DemineurSquare(sqr)}</>)
  );
  const [endStatus, setEndStatus] = useState(endStatusEnum.notYet);
  const [playBoom] = useSound(boomSFX);
  const intl = useIntl();
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  function updateBoard(b: SquareProps[]) {
    setBoard(b);
    setDspBoard(b.map((sqr: SquareProps) => <>{DemineurSquare(sqr)}</>));
  }

  function revealSquare(index: number) {
    if (endStatus == endStatusEnum.notYet) {
      if (board[index].haveBomb) {
        playBoom();
        setEndStatus(endStatusEnum.loose);
      }

      if (!board[index].revealed) {
        board[index].revealed = true;

        // if the current isn't near to a bomb, reveal all nearest square
        if (board[index].numberOfBombNext == 0 && !board[index].haveBomb) {
          if (index % boardWidth > 0) revealSquare(index - 1);
          if (index % boardWidth < boardWidth - 1) revealSquare(index + 1);
          if (index >= boardWidth) revealSquare(index - boardWidth);
          if (index < boardWidth * (boardWidth - 1))
            revealSquare(index + boardWidth);
        }
      }

      if (
        board.reduce((cnt, elm) => (elm.revealed ? cnt + 1 : cnt), 0) >=
        boardWidth * boardWidth - numberOfBomb
      ) {
        setEndStatus(endStatusEnum.win);
      }

      updateBoard(board);
    }
  }

  function switchFlag(index: number) {
    if (endStatus == endStatusEnum.notYet) {
      board[index].flagged = !board[index].flagged;
      updateBoard(board);
    }
  }

  board.map((elm: SquareProps) => {
    elm.revealFunct = revealSquare;
    elm.switchFlag = switchFlag;
  });

  return (
    <div data-testid={"demineur"} className={styles.demineursquare}>
      {endStatus == endStatusEnum.win ? (
        <h1 className={styles.win}>
          {intl.formatMessage({ id: "app.demineur.win" })}
        </h1>
      ) : endStatus == endStatusEnum.loose ? (
        <h1 className={styles.loose}>
          {intl.formatMessage({ id: "app.demineur.loose" })}
        </h1>
      ) : (
        <h1 className={styles.letsplay}>
          {intl.formatMessage({ id: "app.demineur.letsplay" })}
        </h1>
      )}

      {dspBoard}
      <br />
      <button
        className={styles.resetBtn}
        onClick={() => {
          setEndStatus(endStatusEnum.notYet);
          var newBoard = generateBoard(boardWidth, numberOfBomb);
          setBoard(newBoard);
          setDspBoard(
            newBoard.map((sqr: SquareProps) => <>{DemineurSquare(sqr)}</>)
          );
        }}
      >
        {intl.formatMessage({ id: "app.demineur.newgame" })}
      </button>
    </div>
  );
}

export default Demineur;
