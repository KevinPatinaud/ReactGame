export interface HistoLine {
    colorSelected : string[];
    positionned : ColorValidationPosition;
}

export interface ColorValidationPosition
{
    well : number;
    bad : number;
}