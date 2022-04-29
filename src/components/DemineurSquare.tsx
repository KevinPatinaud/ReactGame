import React , {useState} from 'react'
import styles from './DemineurSquare.module.css';
import SquareProps from './SquareProps';




function DemineurSquare ( props : SquareProps)
{

    return <> 
        <div onClick={()=>{props.revealFunct(props.index);}} onContextMenu={()=>{props.switchFlag(props.index);}} 
        className={ 
            (props.revealed) ? 
            ( (props.haveBomb) ? 
                styles.squareIsBomb 
                : (
                    (props.numberOfBombNext > 0) ? 
                        styles.squareBombNext 
                        : styles.squareNoBombNext 
                    )
                ) : ( props.flagged ) ?
                styles.squareFlaged
                : styles.squareclose
            }
            style={ (props.index % props.boardWidth === 0 ) ? {clear:"left"} : {} }
            >{ 
        ( props.revealed ) ?
            ( props.haveBomb) ? "X" : props.numberOfBombNext 
            : 
            ( props.flagged ) ? "?" : ""
            }
        </div>
    </>;

}

export default DemineurSquare;