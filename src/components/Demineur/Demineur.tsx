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

enum endStatusEnum {
  loose,
  win,
  notYet,
}

export interface BoardInterface {
  board: SquareProps[][];
  updateBoard: Function;
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

  // count the number of bomb for each case
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
        revealed: false,
        flagged: false,
      };

      b[x][y] = sqProps;
    }
  }

  return b;
}

function Demineur(props: any) {
  const [boardWidth, setBoardWidth] = useState(props.width);
  const [numberOfBomb, setNumberOfBomb] = useState(props.nmbBomb);
  const [board, setBoard] = useState(generateBoard(boardWidth, numberOfBomb));
  const [endStatus, setEndStatus] = useState(endStatusEnum.notYet);
  const [ignored, forceUpdate] = useReducer((x: number) => x + 1, 0);
  const [playBoom] = useSound(boomSFX);
  const intl = useIntl();
  document.addEventListener("contextmenu", (event) => event.preventDefault()); // lock the right click
  /*
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

*/

  return (
    <BoardContext.Provider
      value={{
        board: board,
        updateBoard: (board: SquareProps[][]) => {
          forceUpdate();
        },
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
              <div className="rowSquare">
                {sqrRow.map((sqr: SquareProps, y) => {
                  return <DemineurSquare key={x * y} x={x} y={y} />;
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
