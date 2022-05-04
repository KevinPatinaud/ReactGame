import React, { FunctionComponent, useContext, useState } from "react";
import styles from "./Demineur.module.css";
import SquareProps from "./SquareProps";
import useSound from "use-sound";
import boomSFX from "../../sounds/boom.mp3";

import { BoardContext, BoardInterface } from "./Demineur";

function DemineurSquare(props: any) {
  const [playBoom] = useSound(boomSFX);
  let boardInterface = useContext(BoardContext);
  const x = props.x;
  const y = props.y;
  const board = boardInterface.board;
  let haveBomb = board[x][y].haveBomb;
  let revealed = board[x][y].revealed;
  let flagged = board[x][y].flagged;

  let numberOfBombNext = 0;

  if (x > 0) {
    if (board[x - 1][y].haveBomb) numberOfBombNext++;
    if (y > 0) if (board[x - 1][y - 1].haveBomb) numberOfBombNext++;
    if (y < board.length - 1)
      if (board[x - 1][y + 1].haveBomb) numberOfBombNext++;
  }

  if (x < board.length - 1) {
    if (board[x + 1][y].haveBomb) numberOfBombNext++;
    if (y > 0) if (board[x + 1][y - 1].haveBomb) numberOfBombNext++;
    if (y < board.length - 1)
      if (board[x + 1][y + 1].haveBomb) numberOfBombNext++;
  }

  if (y > 0) if (board[x][y - 1].haveBomb) numberOfBombNext++;
  if (y < board.length - 1) if (board[x][y + 1].haveBomb) numberOfBombNext++;

  console.log(boardInterface);

  return (
    <>
      <div
        data-testid={"square-btn-" + props.index}
        onClick={() => {
          // left click
          boardInterface.board[x][y].revealed = true;
          if (haveBomb) playBoom();
          boardInterface.updateBoard();
        }}
        onContextMenu={() => {
          // right click
          board[x][y].flagged = !flagged;
          boardInterface.updateBoard();
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
