import { FC } from "react";
import { isConstructorDeclaration } from "typescript";
import { ColorValidationPosition, HistoLine } from "../../HistoLine";
import styles from "./Board.module.css";

const Board: FC<{ histoLine: HistoLine[] }> = (props) => {
  console.log("render Board");
  console.log(props.histoLine);

  function drawEmptyLine() {
    let result = [];
    for (let i = props.histoLine.length; i < 12; i++) {
      result.push(
        <div>
          <div className={styles.histoCase + " " + styles.emptyColor} />
          <div className={styles.histoCase + " " + styles.emptyColor} />
          <div className={styles.histoCase + " " + styles.emptyColor} />
          <div className={styles.histoCase + " " + styles.emptyColor} />
          <DotPosition pos={{ well: 0, bad: 0 } as ColorValidationPosition} />
        </div>
      );
    }
    return <>{result}</>;
  }

  return (
    <>
      {props.histoLine.map((line: HistoLine) => {
        return (
          <div>
            {line.colorSelected.map((color: string) => {
              return (
                <div
                  className={styles.histoCase}
                  style={{ backgroundColor: color }}
                ></div>
              );
            })}
            <DotPosition pos={line.positionned} />
          </div>
        );
      })}
      {drawEmptyLine()}
    </>
  );
};

const DotPosition: FC<{ pos: ColorValidationPosition }> = (props) => {
  let well = props.pos.well;
  let bad = props.pos.bad;

  let result = [];

  for (let i = 1; i <= 4; i++) {
    let stl = styles.dotPosition;
    if (i <= well) stl = stl + " " + styles.dotWellPosition;
    else if (i <= well + bad) stl = stl + " " + styles.dotBadPosition;

    result.push(<div className={stl}></div>);
  }

  return <div className={styles.validationPosition}>{result}</div>;
};

export default Board;
