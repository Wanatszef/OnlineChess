import Piece from "./Piece"
import p5 from 'p5';
import Position from "./Position";
import Pawn from "./Pawn";

class Board
{
    pieces: (Piece | null)[][];

    pressedPiece: (Piece|null) = null;

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
        
    }

    update(p: p5)
    {

    }
   
    mousePressed(p: p5) {
        const col = Math.floor((p.mouseX - 50) / 100); 
        const row = Math.floor((p.mouseY - 50) / 100); 
    
        if (col >= 0 && col < 8 && row >= 0 && row < 8) {
            if(this.pressedPiece)
            {
                let tempPosition: Position = new Position(col, row);
                const possibleMoves = this.pressedPiece.moves();
                for (let move of possibleMoves)
                {
                    if(tempPosition.getX()=== move.getX() && tempPosition.getY() === move.getY())
                    {
                        this.pieces[this.pressedPiece.getPosition().getY()][this.pressedPiece.getPosition().getX()] = null;
                        this.pieces[tempPosition.getY()][tempPosition.getX()] = null;
                        this.pieces[tempPosition.getY()][tempPosition.getX()] = this.pressedPiece;
                        this.pressedPiece.setPosition(tempPosition);
                        if (this.pressedPiece instanceof Pawn) 
                            {
                                this.pressedPiece.moved = true;
                            }
                    }
                }
            }
            const piece = this.pieces[row][col];
            if (piece) {
                this.pressedPiece = piece;
                console.log(this.pressedPiece.getPosition().getX() + " " + this.pressedPiece.getPosition().getY());
            } else {
                const pressedPosition = new Position(col, row);
    
                if (this.pressedPiece) {
                    const possibleMoves = this.pressedPiece.moves();
                    for (let move of possibleMoves) 
                        {
                        if (move.getX() === pressedPosition.getX() && move.getY() === pressedPosition.getY()) 
                        {
                            console.log("correct move");
                            this.pieces[this.pressedPiece.getPosition().getY()][this.pressedPiece.getPosition().getX()] = null;
                            this.pieces[pressedPosition.getY()][pressedPosition.getX()] = this.pressedPiece;
                            this.pressedPiece.setPosition(pressedPosition);
                            if (this.pressedPiece instanceof Pawn) 
                            {
                                this.pressedPiece.moved = true;
                            }
                        }
                    }
                }
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
    

    private initializePieces(): void 
    {
        for (let i = 0; i < 8; i++) 
        {
            this.pieces[1][i] = new Pawn('black', this, new Position(i, 1)); 
            this.pieces[6][i] = new Pawn('white', this, new Position(i, 6)); 
        }
    }
    

    constructor(pieces: Piece[][])
    {
        this.pieces = Array.from({ length: 8 }, () => Array(8).fill(null));
        this.initializePieces();
    }
}

export default Board;