
export default interface SquareProps {
    index : number;
    boardWidth : number;
    haveBomb : boolean;
    revealed:boolean;
    revealFunct : Function;
    numberOfBombNext: number;
    
}
