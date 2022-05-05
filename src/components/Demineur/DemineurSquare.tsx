import React, { FunctionComponent, useContext, useState } from "react";
import styles from "./Demineur.module.css";
import SquareProps from "./SquareProps";
import useSound from "use-sound";
import boomSFX from "../../sounds/boom.mp3";

import { BoardContext, BoardInterface, endStatusEnum } from "./Demineur";

function DemineurSquare({ x, y }: any) {
  const [playBoom] = useSound(boomSFX);
  let boardInterface = useContext(BoardContext);
  const board = boardInterface.board;
  const gameStatut = boardInterface.gameStatut;
  let haveBomb = board[x][y].haveBomb;
  let revealed = board[x][y].revealed;
  let flagged = board[x][y].flagged;
  let numberOfBombNext = board[x][y].numberOfBombNext;

  // console.log(boardInterface);

  function revealNear(xn: number, yn: number) {
    if (numberOfBombNext == 0) {
      if (xn > 0) {
        revealCase(xn - 1, yn);
      }
      if (xn < board.length - 1) {
        revealCase(xn + 1, yn);
      }
      if (yn > 0) {
        revealCase(xn, yn - 1);
      }
      if (yn < board.length - 1) {
        revealCase(xn, yn + 1);
      }
    }
  }

  function revealCase(xn: number, yn: number) {
    if (!board[xn][yn].revealed) {
      board[xn][yn].revealed = true;
      if (board[xn][yn].numberOfBombNext == 0 && !board[xn][yn].haveBomb) {
        revealNear(xn, yn);
      }
    }
  }

  return (
    <>
      <div
        onClick={() => {
          // left click
          if (gameStatut == endStatusEnum.notYet) {
            if (haveBomb) playBoom();
            revealCase(x, y);
            boardInterface.updateBoard();
          }
        }}
        onContextMenu={() => {
          // right click
          if (gameStatut == endStatusEnum.notYet) {
            board[x][y].flagged = !flagged;
            boardInterface.updateBoard();
          }
        }}
        className={
          revealed
            ? haveBomb
              ? styles.squareIsBomb
              : numberOfBombNext > 0
              ? styles.squareBombNext
              : styles.squareNoBombNext
            : flagged
            ? styles.squareFlaged
            : styles.squareclose
        }
      >
        {revealed ? (haveBomb ? "X" : numberOfBombNext) : flagged ? "?" : ""}
      </div>
    </>
  );
}

export default DemineurSquare;
