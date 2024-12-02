import Piece from "./Piece"
import p5, { POSTERIZE } from 'p5';
import Position from "./Position";
import Pawn from "./Pawn";
import Rook from "./Rook";
import Knight from "./Knight";
import Bishop from "./Bishop";
import Queen from "./Queen";
import King from "./King";
import Board from "./Board";
import ArtificialPlayer from "./ArtificialPlayer";

class AIBoard extends Board
{
    playerColor: string = '';

    artificialPlayer: ArtificialPlayer;

    constructor(pieces: Piece[][])
    {
        
        super(pieces);
        
        let tempNumber = Math.random();
        if(tempNumber>0.5)
        {
            this.playerColor = 'white';
            this.artificialPlayer = new ArtificialPlayer('black',this);
        }
        else
        {
            this.playerColor = 'black';
            this.artificialPlayer = new ArtificialPlayer('white',this);
        }


        console.log("player Color: " + this.playerColor);
    }


    mousePressed(p: p5) {
        
        const col = Math.floor((p.mouseX - 50) / 100); 
        const row = Math.floor((p.mouseY - 50) / 100); 
    
        if (col >= 0 && col < 8 && row >= 0 && row < 8) {
            if (this.pressedPiece) 
                {
                let tempPosition: Position = new Position(col, row);
                const possibleMoves = this.pressedPiece.moves();
                for (let move of possibleMoves) {
                    if (tempPosition.getX() === move.getX() && tempPosition.getY() === move.getY()) 
                        {
                            const intialPosition : Position=  this.pressedPiece.getPosition();
                            const tempPositionPiece = this.pieces[tempPosition.getY()][tempPosition.getX()];

                            this.pieces[this.pressedPiece.getPosition().getY()][this.pressedPiece.getPosition().getX()] = null;
                            this.pieces[tempPosition.getY()][tempPosition.getX()] = this.pressedPiece;
                            this.pressedPiece.setPosition(tempPosition);
        
                            if (this.pressedPiece instanceof Pawn || this.pressedPiece instanceof Rook || this.pressedPiece instanceof King) 
                            {
                                this.pressedPiece.moved = true;
                            }

                            if(this.isKingOnTarget() === true)
                            {
                                console.log("król na celowniku");
                                this.pieces[intialPosition.getY()][intialPosition.getX()] = this.pressedPiece;
                                this.pressedPiece.setPosition(intialPosition);

                                if(tempPositionPiece)
                                {
                                    this.pieces[tempPosition.getY()][tempPosition.getX()] = tempPositionPiece;
                                    break;
                                }
                                else
                                {
                                    this.pieces[tempPosition.getY()][tempPosition.getX()] = null;
                                }
                            }
                            else
                            {
                                this.turn = this.turn === 'white' ? 'black' : 'white';
                                this.pressedPiece = null;
                                return; 
                            }
                    }
                }
                this.pressedPiece = null;
            } else 
            {
                const piece = this.pieces[row][col];
                if (piece) 
                    {
                    if (piece.color === this.turn && piece.color === this.playerColor) 
                    {
                        this.pressedPiece = piece;
                    } 
                    else 
                    {
                        this.pieces = this.artificialPlayer.makeBestMove(this.pieces);
                        this.turn = 'white';
                    }
                }
            }
        }
        
        p.redraw();
    }
}

export default AIBoard;