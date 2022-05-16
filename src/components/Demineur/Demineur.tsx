import React, {
  createContext,
  Component,
  FunctionComponent,
  useState,
  useReducer,
} from "react";
import DemineurSquare from "./DemineurSquare";
import SquareProps from "./SquareProps";
import useSound from "use-sound";
import boomSFX from "../../sounds/boom.mp3";
import styles from "./Demineur.module.css";
import { lookupService } from "dns";
import { useIntl } from "react-intl";

export enum endStatusEnum {
  loose,
  win,
  notYet,
}

export interface BoardInterface {
  board: SquareProps[][];
  gameStatut: endStatusEnum;
  setBoard: Function;
}

export const BoardContext = React.createContext({} as BoardInterface);

function generateListOfBomb(boardWidth: number, nbOfBombToSet: number) {
  var result = new Array<{ x: number; y: number }>();

  while (result.length < nbOfBombToSet) {
    var x_rand = Math.trunc(Math.random() * boardWidth);
    var y_rand = Math.trunc(Math.random() * boardWidth);

    let alreadySet = false;

    for (let i = 0; i < result.length; i++) {
      if (result[i].x == x_rand && result[i].y == y_rand) alreadySet = true;
    }

    if (!alreadySet) {
      result[result.length] = {
        x: x_rand,
        y: y_rand,
      };
    }
  }

  return result;
}

// Generate a new board
function generateBoard(boardWidth: number, nbOfBomb: number) {
  const b: SquareProps[][] = new Array<Array<SquareProps>>();

  let lstOfBomb = generateListOfBomb(boardWidth, nbOfBomb);
  console.log(lstOfBomb);

  // set the bomb to each case
  for (let x = 0; x < boardWidth; x++) {
    b[x] = [];
    for (let y = 0; y < boardWidth; y++) {
      let haveABomb = false;

      for (let i = 0; i < lstOfBomb.length; i++) {
        if (lstOfBomb[i].x == x && lstOfBomb[i].y == y) haveABomb = true;
      }

      const sqProps = {
        x: x,
        y: y,
        boardWidth: boardWidth,
        haveBomb: haveABomb,
        numberOfBombNext: 0,
        revealed: false,
        flagged: false,
      };

      b[x][y] = sqProps;
    }
  }

  for (let x = 0; x < boardWidth; x++) {
    for (let y = 0; y < boardWidth; y++) {
      b[x][y].numberOfBombNext = getNumberBombNext(b, x, y);
    }
  }

  return b;
}

function getNumberBombNext(board: SquareProps[][], x: number, y: number) {
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

  return numberOfBombNext;
}

function Demineur(props: any) {
  const boardWidth = props.width;
  const numberOfBomb = props.nmbBomb;
  const [board, setBoard] = useState(generateBoard(boardWidth, numberOfBomb));
  const [endStatus, setEndStatus] = useState(endStatusEnum.notYet);
  // const [playBoom] = useSound(boomSFX);
  const intl = useIntl();

  document.addEventListener("contextmenu", (event) => event.preventDefault()); // lock the right click

  let nmbCaseRevealed = 0;
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
      if (board[x][y].revealed) {
        nmbCaseRevealed++;
        if (board[x][y].haveBomb) {
          if (endStatus == endStatusEnum.notYet)
            setEndStatus(endStatusEnum.loose);
        }
      }
    }
  }

  if (
    nmbCaseRevealed + numberOfBomb >= boardWidth * boardWidth &&
    endStatus == endStatusEnum.notYet
  ) {
    setEndStatus(endStatusEnum.win);
  }

  return (
    <BoardContext.Provider
      value={{
        board: board,
        gameStatut: endStatus,
        setBoard: setBoard,
      }}
    >
      <div data-testid={"demineur"} className={styles.demineurgame}>
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
        <div className={styles.demineurboard}>
          {board.map((sqrRow: SquareProps[], x) => {
            return (
              <div className={styles.rowsquare}>
                {sqrRow.map((sqr: SquareProps, y) => {
                  return (
                    <DemineurSquare key={boardWidth * x + y + 1} x={x} y={y} />
                  );
                })}
              </div>
            );
          })}
        </div>
        <br />
        <button
          className={styles.resetBtn}
          onClick={() => {
            setEndStatus(endStatusEnum.notYet);
            var newBoard = generateBoard(boardWidth, numberOfBomb);
            setBoard(newBoard);
          }}
        >
          {intl.formatMessage({ id: "app.demineur.newgame" })}
        </button>
      </div>
    </BoardContext.Provider>
  );
}

export default Demineur;
