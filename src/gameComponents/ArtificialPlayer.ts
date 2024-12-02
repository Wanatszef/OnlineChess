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

    pieceValues: Record<string, number> = {
        'P': 10,  // pionek biały
        'p': 10,  // pionek czarny
        'N': 30,  // skoczek biały
        'n': 30,  // skoczek czarny
        'B': 30,  // goniec biały
        'b': 30,  // goniec czarny
        'R': 50,  // wieża biała
        'r': 50,  // wieża czarna
        'Q': 90,  // hetman biały
        'q': 90,  // hetman czarny
        'K': 0,  // król biały
        'k': 0   // król czarny
    };
    constructor(color: string, board: Board)
    {
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


        public miniMax(pieces: (Piece | null)[][], depth: number, maximizingPlayer: boolean) :number
        {

            if(depth == 0)
            {
                return this.getScore(this.piecesArrayToFEN(pieces));
            }

            if(maximizingPlayer)
            {
                let maxEval: number = -Infinity

                for (let i = 0; i < 8; i++) 
                {
                    for (let j = 0; j < 8; j++) 
                    {
                        let piece = pieces[i][j];
                        if(piece !== null && piece.color === this.color)
                        {
                           
                            if(piece.moves().length > 0)
                            {
                                for(let position of piece.moves())
                                {
                                    let nextGen: (Piece | null)[][] = this.copyBoard(pieces);
                                    nextGen = this.move(nextGen, piece.position, position);
                                    let evaluation = this.miniMax(nextGen,depth-1,false);
                                    maxEval = this.max(maxEval, evaluation);
                                }
                            }
                        }
                    }
                }
                return maxEval;
            }

            if(!maximizingPlayer)
                {
                    let minEval: number = Infinity
    
                    for (let i = 0; i < 8; i++) 
                    {
                        for (let j = 0; j < 8; j++) 
                        {
                            let piece = pieces[i][j];
                            if(piece !== null && piece.color !== this.color)
                            {
                               
                                if(piece.moves().length > 0)
                                {
                                    for(let position of piece.moves())
                                    {
                                        let nextGen: (Piece | null)[][] = this.copyBoard(pieces);
                                        nextGen = this.move(nextGen, piece.position, position);
                                        let evaluation = this.miniMax(nextGen,depth-1,true);
                                        minEval = this.max(minEval, evaluation);
                                    }
                                }
                            }
                        }
                    }
                    return minEval;
                }

                return 0;
        }

        public makeBestMove(pieces: (Piece | null)[][])
        {
           
        
        }

        public move(pieces: (Piece | null)[][], from: Position, to: Position): (Piece | null)[][] 
        {
            const newBoard = this.copyBoard(pieces); 

            const pieceToMove = newBoard[from.getY()][from.getX()]; 
            newBoard[to.getY()][to.getX()] = pieceToMove; 
            newBoard[from.getY()][from.getX()] = null; 

            if (pieceToMove) {
                pieceToMove.setPosition(to); 
            }

            return newBoard; 
        }


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

        public copyBoard(board: (Piece | null)[][]): (Piece | null)[][] {
            return board.map(row =>
                row.map(piece => piece ? Object.assign(Object.create(Object.getPrototypeOf(piece)), piece) : null)
            );
        }

        public max(n1: number, n2: number)
        {
            if(n1 > n2)
            {
                return n1;
            }
            if(n1 < n2)
            {
                return n2;
            }
            else
            {
                return n1;
            }
        }

        public min(n1: number, n2: number)
        {
            if(n1 < n2)
            {
                return n1;
            }
            if(n1 > n2)
            {
                return n2;
            }
            else
            {
                return n1;
            }
        }
    
}

export default ArtificialPlayer;