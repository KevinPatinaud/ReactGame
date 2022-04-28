import React , {useState} from 'react'
import styles from './DemineurSquare.module.css';
import SquareProps from './SquareProps';

function endLine(index:number , boardWidth:number)
{
    if ((index + 1) % boardWidth === 0 ) 
    {
        return <br/>;
    }
    return ;
}


function DemineurSquare ( props : SquareProps )
{

    return <> 
        <button onClick={()=>{props.revealFunct(props.index);}} onContextMenu={()=>{props.switchFlag(props.index);}} className={ (props.revealed) ? ( (props.haveBomb) ? styles.squareIsBomb : ((props.numberOfBombNext > 0) ? styles.squareBombNext : styles.squareNoBombNext )) : styles.squareclose}>{ 
        ( props.revealed ) ?
            ( props.haveBomb) ? "X" : props.numberOfBombNext 
            : 
            ( props.flagged ) ? "?" : "."
            }
        </button>
        { endLine(props.index , props.boardWidth) }
    </>;

}

export default DemineurSquare;