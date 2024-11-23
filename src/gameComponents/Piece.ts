import p5 from 'p5';
import Board from './Board';
import Position from './Position';

abstract class Piece
{
    color: string;

    board: Board;

    position: Position;

    abstract moves(): Position[];
   

    constructor(color: string, board: Board, position: Position)
    {
        this.position = position;
        this.board = board;
        this.color = color;
    }

   abstract draw(p: p5): void;

   abstract update(p: p5): null;

   getPosition(): Position
   {
    return this.position;
   }

   setPosition(position: Position): void
   {
    this.position = position;
   }

}

export default Piece;