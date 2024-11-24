import Board from "./Board";
import Piece from "./Piece";
import Position from "./Position";

class Rook extends Piece
{   
    
    moved: boolean = false;
    icon: string = '♜';

    constructor(color: string, board: Board, position: Position)
    {
        super(color,board,position);
    }


    moves(): Position[] {
        let positions: Position[] = [];
        let rightDir = true;
        let leftDir = true;
        let upDir = true;
        let downDir = true;
    
        for (let i = 1; i < 8; i++) { 
            let right = new Position(this.getPosition().getX() + i, this.getPosition().getY());
            let left = new Position(this.getPosition().getX() - i, this.getPosition().getY());
            let up = new Position(this.getPosition().getX(), this.getPosition().getY() - i);
            let down = new Position(this.getPosition().getX(), this.getPosition().getY() + i);
    
            if (right.getX() < 8 && rightDir) {
                if (this.board.checkPosition(right) === null) {
                    positions.push(right);
                } else {
                    let piece = this.board.checkPosition(right);
                    if (piece && piece.color !== this.color) {
                        positions.push(right);
                    }
                    rightDir = false;
                }
            }
    
            if (left.getX() >= 0 && leftDir) {
                if (this.board.checkPosition(left) === null) {
                    positions.push(left);
                } else {
                    let piece = this.board.checkPosition(left);
                    if (piece && piece.color !== this.color) {
                        positions.push(left);
                    }
                    leftDir = false;
                }
            }
    
            if (up.getY() >= 0 && upDir) {
                if (this.board.checkPosition(up) === null) {
                    positions.push(up);
                } else {
                    let piece = this.board.checkPosition(up);
                    if (piece && piece.color !== this.color) {
                        positions.push(up);
                    }
                    upDir = false;
                }
            }
    
            if (down.getY() < 8 && downDir) {
                if (this.board.checkPosition(down) === null) {
                    positions.push(down);
                } else {
                    let piece = this.board.checkPosition(down);
                    if (piece && piece.color !== this.color) {
                        positions.push(down);
                    }
                    downDir = false;
                }
            }
        }
    
        return positions;
    }
    
     
     
     draw(p: import("p5")): void {
        p.textSize(80);
        if(this.color === 'white')
        {
            p.strokeWeight(4);
            p.stroke(12);
            p.fill(255);
            p.text(this.icon,this.position.getX()*100+67, this.position.getY()*100+125);
        }
        else
        {
            p.stroke(240);
            p.fill(4, 4, 4);
            p.text(this.icon,this.position.getX()*100+67, this.position.getY()*100+125);
            p.stroke(12);
        }
     }

     update(p: import("p5")): null {
         throw new Error("Method not implemented.");
     }
     
}

export default Rook;