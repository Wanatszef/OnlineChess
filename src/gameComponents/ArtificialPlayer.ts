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

        public miniMax(
            pieces: (Piece | null)[][],
            depth: number,
            maximizingPlayer: boolean
        ): { score: number, move: { from: Position, to: Position } | null }
        {
            if (depth === 0)
            {
                let tempColor = 'non'
                if(maximizingPlayer === true)
                {
                    tempColor = this.color;
                    tempColor = (tempColor === 'white') ? 'white' : 'black';
                }
                return { score: this.getScore(this.piecesArrayToFEN(pieces), tempColor), move: null };
            }
        
            if (maximizingPlayer)
            {
                let maxEval = -Infinity;
                let bestMove = null;
        
                for (let i = 0; i < 8; i++)
                {
                    for (let j = 0; j < 8; j++)
                    {
                        const piece = pieces[i][j];
                        if (piece !== null && piece.color === this.color)
                        {
                            for (const position of piece.moves())
                            {
                                const nextGen = this.move(this.copyBoard(pieces), piece.position, position);
                                const evaluation = this.miniMax(nextGen, depth - 1, false).score;
                                
        
                                if (evaluation > maxEval)
                                {
                                    console.log(`Nowa maksymalna ocena: ${evaluation} dla ruchu ${piece.constructor.name} na ${position.getX() + 1},${position.getY() + 1}`);
                                    maxEval = evaluation;
                                    bestMove = { from: piece.position, to: position };
                                }
                            }
                        }
                    }
                }
        
                return { score: maxEval, move: bestMove };
            }
            else
            {
                let minEval = Infinity;
                let bestMove = null;
        
                for (let i = 0; i < 8; i++)
                {
                    for (let j = 0; j < 8; j++)
                    {
                        const piece = pieces[i][j];
                        if (piece !== null && piece.color !== this.color)
                        {
                            for (const position of piece.moves())
                            {
                                const nextGen = this.move(this.copyBoard(pieces), piece.position, position);
                                const evaluation = this.miniMax(nextGen, depth - 1, true).score;
        
                                if (evaluation < minEval)
                                {
                                    minEval = evaluation;
                                    bestMove = { from: piece.position, to: position };
                                }
                            }
                        }
                    }
                }
                return { score: minEval, move: bestMove };
            }
        }
        

        public makeBestMove(pieces: (Piece | null)[][]): (Piece | null)[][] 
        {
            const { move, score } = this.miniMax(pieces, 3, true);

            if (move)
            {
                let tempPiece = pieces[move.from.getY()][move.from.getX()];
                if(tempPiece)
                {
                    console.log(`Komputer poruszył: ${tempPiece.constructor.name} na ${move.to.getX()},${move.to.getY()}`);
                }
                
               const { from, to } = move;
               return this.move(pieces, from, to);
            }
            else
            {
                return pieces;
            }
        }


        public move(pieces: (Piece | null)[][], from: Position, to: Position): (Piece | null)[][] 
        {
            const newBoard = this.copyBoard(pieces); 

            const pieceToMove = newBoard[from.getY()][from.getX()]; 
            newBoard[to.getY()][to.getX()] = pieceToMove; 
            newBoard[from.getY()][from.getX()] = null; 

            if (pieceToMove) 
            {
                pieceToMove.setPosition(to); 
            }

            return newBoard; 
        }


        public getScore(fENArray: String, color: string): number
        {
            let score: number = 0;
            let blackPieces: number = 0;
            let whitePieces: number = 0;
        
            for (const char of fENArray)
            {
                if (this.pieceValues[char])
                {
                    const value = this.pieceValues[char];
                    if(char === char.toLowerCase())
                    {
                        blackPieces += value;
                    }
                    else
                    {
                        whitePieces +=value;
                    }
                    
                }
            }
            if(color === 'black')
            {
                return whitePieces - blackPieces;
            }
            else
            {
                return blackPieces - whitePieces;
            }
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