import React from 'react';
import { render, screen } from '@testing-library/react';
import DemineurSquare from './DemineurSquare';

describe('<DemineurSquare />', () => {
    describe('When a square is initialize', () => {
        it("should be closed" , () => {
        const { container } = render(<DemineurSquare index={12} boardWidth={10} haveBomb={false} numberOfBombNext={5}  revealed={false} revealFunct={()=>{}} flagged={false} switchFlag={()=>{} }/>);
        expect(container.classList.contains('squareclose'));
        });
    });
    describe('When a square is flagged', () => {
        it("should be flagged" , () => {
        const { container } = render(<DemineurSquare index={12} boardWidth={10} haveBomb={false} numberOfBombNext={5}  revealed={false} revealFunct={()=>{}} flagged={false} switchFlag={()=>{} }/>);
        expect(container.classList.contains('squareFlagged'));
        });
    });
});
