import React , {useState} from 'react'
import styles from './DemineurSquare.module.css';
import SquareProps from './SquareProps';




function DemineurSquare ( props : any)
{

    return <> 
        <button onClick={()=>{props.revealFunct(props.index);}} onContextMenu={()=>{props.switchFlag(props.index);}} className={ (props.revealed) ? ( (props.haveBomb) ? styles.squareIsBomb : ((props.numberOfBombNext > 0) ? styles.squareBombNext : styles.squareNoBombNext )) : styles.squareclose}>{ 
        ( props.revealed ) ?
            ( props.haveBomb) ? "X" : props.numberOfBombNext 
            : 
            ( props.flagged ) ? "?" : "."
            }
        </button>
        { ((props.index + 1) % props.boardWidth === 0 ) ? <br/> : <></> }
    </>;

}

export default DemineurSquare;