import Piece from "./Piece"
import p5, { POSTERIZE } from 'p5';
import Position from "./Position";
import Pawn from "./Pawn";
import Rook from "./Rook";
import Knight from "./Knight";
import Bishop from "./Bishop";
import Queen from "./Queen";
import King from "./King";

class Board
{
    width = 1000;
    height = 1000;
    pieces: (Piece | null)[][];

    winner = 'nobody';

    turn: string = 'white';

    pressedPiece: (Piece|null) = null;

    showModal = false;

    draw(p: p5, tileSize: number)
    {
     for(let i: number = 0; i<8; i++)
     {
        for(let j: number = 0; j<8; j++)
        {
            if(i%2==j%2)
            {
                p.fill(255, 255, 204);
                p.square(i*tileSize +50, j*tileSize +50,tileSize);
            }
            else
            {
                p.fill(102, 102, 153);
                p.square(i*tileSize+50, j*tileSize+50,tileSize);
            }
        }
     }
     p.stroke(1);
     p.fill(15);
     p.textSize(10);
     p.text('8',20,98);
     p.text('7',20,98 +100);
     p.text('6',20,98 +200);
     p.text('5',20,98 +300);
     p.text('4',20,98 +400);
     p.text('3',20,98 +500);
     p.text('2',20,98 +600);
     p.text('1',20,98 +700);
     p.text('A',83,870);
     p.text('B',83+100,870);
     p.text('C',83+200,870);
     p.text('D',83+300,870);
     p.text('E',83+400,870);
     p.text('F',83+500,870);
     p.text('G',83+600,870);
     p.text('H',83+700,870);

        for(let i: number = 0; i<8; i++)
        {
           for(let j: number = 0; j<8; j++)
           {
            const piece = this.pieces[i][j];
            if(piece)
            {
                piece.draw(p);
            }
           }
        }
        if (this.pressedPiece) {
            const positions: Position[] = this.pressedPiece.moves();
            for (let i = 0; i < positions.length; i++) {
                p.fill(0, 53, 255, 153);
                p.square(positions[i].getX() * tileSize + 50, positions[i].getY() * tileSize + 50, tileSize);
            }
        }

        if (this.showModal) 
            {
                // Tło modala
                p.fill(0, 0, 0, 200); // Półprzezroczyste tło
                p.rect(100, 100, this.width - 200, this.height - 200, 20); // Prostokąt z zaokrąglonymi rogami
        
                // Treść modala
                p.fill(255);
                p.textSize(32);
                p.text(this.winner + " Wygrał!", this.width / 2, this.height / 2 - 50);
        
                // Przycisk "OK"
                p.fill(100, 200, 100);
                p.rect(this.width / 2 - 50, this.height / 2 + 50, 100, 50, 10);
                p.fill(255);
                p.textSize(24);
                p.text("OK", this.width / 2, this.height / 2 + 75);
            }
        
    }

    update(p: p5)
    {

    }
   
    mousePressed(p: p5) 
    {
        const col = Math.floor((p.mouseX - 50) / 100); 
        const row = Math.floor((p.mouseY - 50) / 100); 

        if (col >= 0 && col < 8 && row >= 0 && row < 8) 
        {
            if (this.pressedPiece) 
            {
                let tempPosition: Position = new Position(col, row);
                const possibleMoves = this.pressedPiece.moves();

                for (let move of possibleMoves) 
                {
                    if (tempPosition.getX() === move.getX() && tempPosition.getY() === move.getY()) 
                    {
                        const initialPosition: Position = this.pressedPiece.getPosition();
                        const tempPositionPiece = this.pieces[tempPosition.getY()][tempPosition.getX()];

                        this.pieces[initialPosition.getY()][initialPosition.getX()] = null;
                        this.pieces[tempPosition.getY()][tempPosition.getX()] = this.pressedPiece;
                        this.pressedPiece.setPosition(tempPosition);

                        if (this.pressedPiece instanceof Pawn || this.pressedPiece instanceof Rook || this.pressedPiece instanceof King) 
                        {
                            this.pressedPiece.moved = true;
                        }

                        if (this.pressedPiece instanceof King) 
                        {
                            const kingInitialX = initialPosition.getX();

                            if (tempPosition.getX() === kingInitialX + 2) 
                            {
                                const rook = this.pieces[initialPosition.getY()][kingInitialX + 3];
                                if (rook instanceof Rook) 
                                {
                                    this.pieces[initialPosition.getY()][kingInitialX + 3] = null;
                                    this.pieces[initialPosition.getY()][kingInitialX + 1] = rook;
                                    rook.setPosition(new Position(kingInitialX + 1, initialPosition.getY()));
                                }
                            }
                            else if (tempPosition.getX() === kingInitialX - 2) 
                            {
                                const rook = this.pieces[initialPosition.getY()][kingInitialX - 4];
                                if (rook instanceof Rook) 
                                {
                                    this.pieces[initialPosition.getY()][kingInitialX - 4] = null;
                                    this.pieces[initialPosition.getY()][kingInitialX - 1] = rook;
                                    rook.setPosition(new Position(kingInitialX - 1, initialPosition.getY()));
                                }
                            }
                        }

                        if (this.isKingOnTarget()) 
                        {
                            console.log("Król na celowniku");
                            this.pieces[initialPosition.getY()][initialPosition.getX()] = this.pressedPiece;
                            this.pressedPiece.setPosition(initialPosition);

                            if (tempPositionPiece) 
                            {
                                this.pieces[tempPosition.getY()][tempPosition.getX()] = tempPositionPiece;
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
                            if(this.isCheckmate(this.turn === 'white' ? 'black' : 'white'))
                            {
                                this.winner = this.turn === 'white' ? 'white' : 'black';
                            }
                            return; 
                        }
                    }
                }
                this.pressedPiece = null;
            } 
            else 
            {
                const piece = this.pieces[row][col];
                if (piece) 
                {
                    if (piece.color === this.turn) 
                    {
                        this.pressedPiece = piece;
                    } 
                    else 
                    {
                        console.log("Nie Twoja tura!");
                    }
                }
            }
        }

        if (this.showModal) 
            {
                const buttonX = this.width / 2 - 50;
                const buttonY = this.height / 2 + 50;
        
                if (
                    p.mouseX > buttonX &&
                    p.mouseX < buttonX + 100 &&
                    p.mouseY > buttonY &&
                    p.mouseY < buttonY + 50
                ) 
                {
                    this.showModal = false;
                    location.reload(); 
                }
            }
        p.redraw();
    }

    
    
    

    public checkPosition(position: Position): Piece | null {
        const row = position.getY();
        const col = position.getX();
    
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            return this.pieces[row][col];
        }
        return null;
    }
    
    public initializePieces(): void 
    {
        for (let i = 0; i < 8; i++) 
        {
            this.pieces[1][i] = new Pawn('black', this, new Position(i, 1)); 
            this.pieces[6][i] = new Pawn('white', this, new Position(i, 6)); 
        }

        this.pieces[0][0] = new Rook('black',this, new Position(0,0));
        this.pieces[0][7] = new Rook('black',this, new Position(7,0));

        this.pieces[7][0] = new Rook('white',this, new Position(0,7));
        this.pieces[7][7] = new Rook('white',this, new Position(7,7));

        this.pieces[7][1] = new Knight('white',this, new Position(1,7));
        this.pieces[7][6] = new Knight('white',this, new Position(6,7));

        this.pieces[0][1] = new Knight('black',this, new Position(1,0));
        this.pieces[0][6] = new Knight('black',this, new Position(6,0));

        this.pieces[7][2] = new Bishop('white',this, new Position(2,7));
        this.pieces[7][5] = new Bishop('white',this, new Position(5,7));

        this.pieces[0][2] = new Bishop('black',this, new Position(2,0));
        this.pieces[0][5] = new Bishop('black',this, new Position(5,0));

        this.pieces[0][3] = new Queen('black',this, new Position(3,0));

        this.pieces[7][3] = new Queen('white',this, new Position(3,7));

        this.pieces[0][4] = new King('black',this, new Position(4,0));

        this.pieces[7][4] = new King('white',this, new Position(4,7));


    }
    
    public copyBoard(board: (Piece | null)[][]): (Piece | null)[][] {
        return board.map(row =>
            row.map(piece => piece ? Object.assign(Object.create(Object.getPrototypeOf(piece)), piece) : null)
        );
    }
    

    public isKingOnTarget(): Boolean
    {
        const kingColor: String = this.turn;
        let king = null;

        for(let i: number = 0; i<8; i++)
            {
               for(let j: number = 0; j<8; j++)
               {
                let tempPiece = this.pieces[i][j];
                if(tempPiece instanceof King && tempPiece.color === kingColor)
                {
                    king = tempPiece;
                }

               }
            }

        if(king !== null)
        {
            for(let i: number = 0; i<8; i++)
                {
                for(let j: number = 0; j<8; j++)
                {
                    let tempPiece = this.pieces[i][j];

                    if(tempPiece && tempPiece.color != kingColor && king !== null)
                    {
                        for(let z: number = 0; z<tempPiece.moves().length; z++)
                        {
                            if(tempPiece.moves()[z].getX() === king.getPosition().getX() && tempPiece.moves()[z].getY() === king.getPosition().getY())
                            {
                                return true;
                            }
                        }
                    }
                }
                }
        }
        return false;
    }

    isCheckmate(color: string): boolean 
    {
        let king: King | null = null;
        console.log("sprawdzenie szachu")

        for (let row = 0; row < 8; row++) 
        {
            for (let col = 0; col < 8; col++) 
            {
                const piece = this.pieces[row][col];
                if (piece instanceof King && piece.color === color) 
                {
                    king = piece;
                    break;
                }
            }
        }

        if (!king) 
        {
            console.log(`Nie znaleziono króla ${color}`);
            return false;
        }

        if (!this.isKingOnTarget()) 
        {
            return false; 
        }

        const possibleMoves = king.moves();
        for (let move of possibleMoves) 
        {
            const tempPosition = king.getPosition();
            const targetPiece = this.pieces[move.getY()][move.getX()];

            this.pieces[tempPosition.getY()][tempPosition.getX()] = null;
            this.pieces[move.getY()][move.getX()] = king;
            king.setPosition(move);

            const isStillInCheck = this.isKingOnTarget();

            king.setPosition(tempPosition);
            this.pieces[tempPosition.getY()][tempPosition.getX()] = king;
            this.pieces[move.getY()][move.getX()] = targetPiece;

            if (!isStillInCheck) 
            {
                return false; 
            }
        }

        for (let row = 0; row < 8; row++) 
        {
            for (let col = 0; col < 8; col++) 
            {
                const piece = this.pieces[row][col];
                if (piece && piece.color === color && !(piece instanceof King)) 
                {
                    const moves = piece.moves();
                    for (let move of moves) 
                    {
                        const tempPosition = piece.getPosition();
                        const targetPiece = this.pieces[move.getY()][move.getX()];

                        this.pieces[tempPosition.getY()][tempPosition.getX()] = null;
                        this.pieces[move.getY()][move.getX()] = piece;
                        piece.setPosition(move);

                        const isStillInCheck = this.isKingOnTarget();

                        piece.setPosition(tempPosition);
                        this.pieces[tempPosition.getY()][tempPosition.getX()] = piece;
                        this.pieces[move.getY()][move.getX()] = targetPiece;

                        if (!isStillInCheck) 
                        {
                            return false; 
                        }
                    }
                }
            }
        }

        return true; 
    }

    constructor(pieces: Piece[][])
    {
        this.pieces = Array.from({ length: 8 }, () => Array(8).fill(null));
        this.initializePieces();
    }
}

export default Board;