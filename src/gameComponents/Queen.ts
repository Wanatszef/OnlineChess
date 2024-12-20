import Board from "./Board";
import Piece from "./Piece";
import Position from "./Position";

class Queen extends Piece
{
    icon: string = '♛';

     constructor(color: string, board: Board, position: Position)
    {
        super(color,board,position);
    }
    

    moves(): Position[] 
    {
        let positions: Position[] = [];
        let rightUpDir = true;
        let leftUpDir = true;
        let rightDownDir = true;
        let leftDownDir = true;
        let rightDir = true;
        let leftDir = true;
        let upDir = true;
        let downDir = true;
    
        for (let i = 1; i < 8; i++) {
            let rightUp = new Position(this.getPosition().getX() + i, this.getPosition().getY() -i);
            let leftUP = new Position(this.getPosition().getX() - i, this.getPosition().getY()-i);
            let rightDown = new Position(this.getPosition().getX() +i , this.getPosition().getY() + i);
            let leftDown= new Position(this.getPosition().getX()-i, this.getPosition().getY() + i);
            let right = new Position(this.getPosition().getX() + i, this.getPosition().getY());
            let left = new Position(this.getPosition().getX() - i, this.getPosition().getY());
            let up = new Position(this.getPosition().getX(), this.getPosition().getY() - i);
            let down = new Position(this.getPosition().getX(), this.getPosition().getY() + i);
    
            if (rightUp.getX() < 8 && rightUp.getY() > 0 && rightUpDir) {
                if (this.board.checkPosition(rightUp) === null) {
                    positions.push(rightUp);
                } else {
                    let piece = this.board.checkPosition(rightUp);
                    if (piece && piece.color !== this.color) {
                        positions.push(rightUp);
                    }
                    rightUpDir = false;
                }
            }
    
            if (leftUP.getX() >= 0 && leftUP.getY() >= 0 &&leftUpDir) {
                if (this.board.checkPosition(leftUP) === null) {
                    positions.push(leftUP);
                } else {
                    let piece = this.board.checkPosition(leftUP);
                    if (piece && piece.color !== this.color) {
                        positions.push(leftUP);
                    }
                    leftUpDir = false;
                }
            }
    
            if (rightDown.getY() < 8 && rightDown.getX() < 8 && rightDownDir) {
                if (this.board.checkPosition(rightDown) === null) {
                    positions.push(rightDown);
                } else {
                    let piece = this.board.checkPosition(rightDown);
                    if (piece && piece.color !== this.color) {
                        positions.push(rightDown);
                    }
                    rightDownDir = false;
                }
            }
    
            if (leftDown.getY() < 8 && leftDown.getX() >= 0  && leftDownDir) {
                if (this.board.checkPosition(leftDown) === null) {
                    positions.push(leftDown);
                } else {
                    let piece = this.board.checkPosition(leftDown);
                    if (piece && piece.color !== this.color) {
                        positions.push(leftDown);
                    }
                    leftDownDir = false;
                }
            }
            
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
    draw(p: import("p5")): void 
    {
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

export default Queen;