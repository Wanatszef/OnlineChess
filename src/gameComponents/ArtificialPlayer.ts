import { deflateSync } from "bun";
import Piece from "./Piece";
import King from "./King";
import Queen from "./Queen";
import Bishop from "./Bishop";
import Rook from "./Rook";
import Pawn from "./Pawn";
import Knight from "./Knight";
import Board from "./Board";
import Position from "./Position";

class ArtificialPlayer
{
    color: string

    board: Board;

    whiteScore: number;

    blackScore: number;

    pieceValues: Record<string, number> = {
        'P': 10,  // pionek biały
        'p': -10,  // pionek czarny
        'N': 30,  // skoczek biały
        'n': -30,  // skoczek czarny
        'B': 30,  // goniec biały
        'b': -30,  // goniec czarny
        'R': 50,  // wieża biała
        'r': -50,  // wieża czarna
        'Q': 90,  // hetman biały
        'q': -90,  // hetman czarny
        'K': 0,  // król biały
        'k': 0   // król czarny
    };
    constructor(color: string, board: Board)
    {
        this.whiteScore =0;
        this.blackScore =0;
        this.color = color;
        this.board = board;
    }

        public piecesArrayToFEN(pieces: (Piece | null)[][]): string {
            let output: string = '';
        
            for (let i = 0; i < 8; i++) {
                let counter: number = 0; 
        
                for (let j = 0; j < 8; j++) {
                    const tempPiece = pieces[i][j];
        
                    if (tempPiece) {
                        if (counter > 0) {
                            output += String(counter);
                            counter = 0;
                        }
                        if (tempPiece.color === 'white') {
                            if (tempPiece instanceof King) output += 'K';
                            else if (tempPiece instanceof Queen) output += 'Q';
                            else if (tempPiece instanceof Rook) output += 'R';
                            else if (tempPiece instanceof Bishop) output += 'B';
                            else if (tempPiece instanceof Knight) output += 'N';
                            else if (tempPiece instanceof Pawn) output += 'P';
                        } else {
                            if (tempPiece instanceof King) output += 'k';
                            else if (tempPiece instanceof Queen) output += 'q';
                            else if (tempPiece instanceof Rook) output += 'r';
                            else if (tempPiece instanceof Bishop) output += 'b';
                            else if (tempPiece instanceof Knight) output += 'n';
                            else if (tempPiece instanceof Pawn) output += 'p';
                        }
                    } else {
                        counter++; 
                    }
                }

                if (counter > 0) {
                    output += String(counter);
                }
        

                if (i < 7) {
                    output += '/';
                }
            }
        
            return output;
        }

        /*
        Position(kolumna,rząd);
        board[rzad][kolumna];
        */
    

        public getScore(fENArray: String) :number
        {
            let score: number = 0;
            
            for(const char of fENArray)
            {
                if(this.pieceValues[char])
                {
                    score+= this.pieceValues[char];
                }
            }

            return score;
        }

        public miniMax(pieces: (Piece | null)[][], depth: number, maximazingPlayer: boolean): number
        {
            let bestMove: Position = new Position(0,0);
            let bestToMovePiece: Piece| null = null;
            if(depth === 0)
            {
                this.move(pieces, bestToMovePiece, bestMove);
                return this.getScore(this.piecesArrayToFEN(pieces));

            }

            if(maximazingPlayer)
            {
                let maxEval: number = -Infinity;
                for (let i = 0; i < 8; i++) 
                    {
                        for (let j = 0; j < 8; j++) 
                        {
                            const piece = pieces[i][j];
                            if(piece&&piece.color == this.color)
                            {
                                    for(let x = 0; x<piece.moves.length; x++)
                                    {
                                        let nextGen :(Piece | null)[][] = this.board.copyBoard(pieces);
                                        nextGen = this.move(nextGen, piece, piece.moves()[x]);
                                        let eval = this.miniMax(nextGen,depth-1,false);
                                    }        
                            }
                            
                        }
                    }
            }

            if(!maximazingPlayer)
                {
                    let minEval: number = Infinity;
                    for (let i = 0; i < 8; i++) 
                        {
                            for (let j = 0; j < 8; j++) 
                            {
                                const piece = pieces[i][j];
                                if(piece&&piece.color !== this.color)
                                {
                                        for(let x = 0; x<piece.moves.length; x++)
                                        {
                                            let nextGen :(Piece | null)[][] = this.board.copyBoard(pieces);
                                            nextGen = this.move(nextGen, piece, piece.moves()[x]);
                                            let eval = this.miniMax(nextGen,depth-1,true);
                                            minEval = (eval < minEval) ? eval : minEval;
                                        }        
                                }
                                
                            }
                        }
                }
                
        }

        public makeBestMove()
        {
            let bestMove: number = -1;
            let piece: Piece;
            
            for (let i = 0; i < 8; i++) 
            {
                for (let j = 0; j < 8; j++) 
                {
                    const piece = this.board.pieces[i][j];
                    if(piece&&piece.color == this.color)
                    {
                        
                            for(let x = 0; x<piece.moves.length; x++)
                            {

                            }
                        
                    }
                    
                }
            }
        }

        public move(pieces: (Piece | null)[][], piece: Piece, position: Position): (Piece | null)[][]
        {               
            pieces[position.getY()][position.getX()] = piece;
            pieces[piece.getPosition().getY()][piece.getPosition().getX()] = null;
            piece.setPosition(position);
            return pieces;
        }






        

    
}

export default ArtificialPlayer;