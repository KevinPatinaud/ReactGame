import React , {Component, FunctionComponent, useState} from 'react';
import DemineurSquare from './DemineurSquare';
import SquareProps from './SquareProps';
import useSound from 'use-sound';
import boomSFX from '../sounds/boom.mp3';
import styles from './DemineurSquare.module.css';
import { lookupService } from 'dns';


enum endStatusEnum  {
    loose,
    win,
    notYet
}



function generateListOfBomb(totalAmountOfSquare : number , nbOfBombToSet : number)
{
    var result:number[] = new Array();

    while ( result.length < nbOfBombToSet )
    {
        var nb = Math.trunc ( Math.random() * totalAmountOfSquare );
        if ( result.indexOf( nb ) === -1 ){
            result.push( nb );
        } 
    }

    return result;
}



// Generate a new board
function generateBoard(boardWidth : number , nbOfBomb : number)
{
    const b:SquareProps[] = new Array();

    var lstOfBomb = generateListOfBomb( boardWidth * boardWidth , nbOfBomb );

    

     // count the number of bomb for each case
    for ( var i = 0 ; i < boardWidth * boardWidth; i ++)
    {
        var nbOfBombNext = 0;

        var cg = ( i % boardWidth > 0) ? false : true;
        var cd = (i % boardWidth < boardWidth - 1) ? false : true;
        var ch = ( i >= boardWidth) ? false : true;
        var cb = ( i < boardWidth * (boardWidth - 1) ) ? false : true;

        
        if ( ! cg && lstOfBomb.indexOf(i - 1 ) >= 0 )
            nbOfBombNext ++;
        
        if ( ! cd && lstOfBomb.indexOf(i + 1 ) >= 0 )
            nbOfBombNext ++;
    
        if ( ! ch && lstOfBomb.indexOf(i - boardWidth ) >= 0 )
            nbOfBombNext ++;
        
        if ( ! cb && lstOfBomb.indexOf(i + boardWidth ) >= 0 )
            nbOfBombNext ++;


        if ( ! cg &&  ! ch && lstOfBomb.indexOf(i - boardWidth - 1 ) >= 0)
            nbOfBombNext ++;

        if ( ! cg && ! cb && lstOfBomb.indexOf(i + boardWidth - 1 ) >= 0)
            nbOfBombNext ++;


        if (  ! cd &&  ! ch && lstOfBomb.indexOf(i - boardWidth + 1 ) >= 0)
            nbOfBombNext ++;

        if (  ! cd && ! cb && lstOfBomb.indexOf(i + boardWidth + 1 ) >= 0)
            nbOfBombNext ++;


        const sqProps = { index:i, boardWidth:boardWidth, haveBomb:( lstOfBomb.indexOf(i) >= 0 ) , numberOfBombNext:nbOfBombNext ,  revealed:false, revealFunct:()=>{} , flagged:false, switchFlag:()=>{} };
        
        b.push( sqProps );
        
    }


    return b;
}



function Demineur(props : any)
{
    const [ boardWidth , setBoardWidth] = useState(props.width);
    const [ numberOfBomb , setNumberOfBomb] = useState( props.nmbBomb ); 
   const [ board , setBoard] = useState(generateBoard(boardWidth , numberOfBomb));
   const[dspBoard , setDspBoard] = useState(board.map( (sqr : SquareProps) => <>{DemineurSquare(sqr)}</> ));
   const [ endStatus , setEndStatus ] = useState(endStatusEnum.notYet);
  const [ playBoom ] =  useSound(boomSFX);

  document.addEventListener('contextmenu', event => event.preventDefault());


  function updateBoard(b : SquareProps[] )
  {
    setBoard(b); 
    setDspBoard( b.map( (sqr : SquareProps) => <>{DemineurSquare(sqr)}</> ) );
  }

   
   function revealSquare(index:number)
   { 
       if ( index !== null && endStatus == endStatusEnum.notYet  )
       {

            if ( board[index].haveBomb )
            {
                playBoom();
                setEndStatus(endStatusEnum.loose );
            }

           console.log("revealSquare( " + index + " )");
           if ( ! board[index].revealed )
           {
                board[index].revealed = true; 
                
                // if the current isn't near to a bomb, reveal all nearest square
                if ( board[index].numberOfBombNext == 0 && ! board[index].haveBomb)
                {
                        if ( index % boardWidth > 0) revealSquare( index - 1) ;
                        if (index % boardWidth < boardWidth - 1)  revealSquare( index + 1) ;
                        if ( index >= boardWidth) revealSquare( index - boardWidth) ;
                        if ( index < boardWidth * (boardWidth - 1) ) revealSquare( index + boardWidth) ;
                }
            }

            console.log ("revealed : " + board.reduce( (cnt , elm ) => ( (elm.revealed) ? cnt + 1 : cnt ) , 0 ));
            if ( board.reduce( (cnt , elm ) => ( (elm.revealed) ? cnt + 1 : cnt ) , 0 ) >= boardWidth * boardWidth - numberOfBomb)
            {
                setEndStatus( endStatusEnum.win );
            }

            updateBoard(board);
            console.log ( board );
       }
    }


    function switchFlag(index:number)
    {
        console.log(index);
        board[index].flagged = ! board[index].flagged;
        updateBoard(board);
    }

   board.map((elm : SquareProps) => {elm.revealFunct = revealSquare; elm.switchFlag = switchFlag});

    console.log( board );
    return <div className={styles.demineursquare}>
        { ( endStatus == endStatusEnum.win ) ?
        <h1>Winner !</h1>   
        :  ( endStatus == endStatusEnum.loose ) ?
        <h1>Boom ! You loose</h1>
        : <h1>Let's play</h1>
        }
        {dspBoard}
        </div>;
}


export default Demineur;