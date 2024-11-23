import Piece from "./Piece";
import Board from "./Board";
import Position from "./Position";
import p5 from 'p5';

class Pawn extends Piece
{
     moved: boolean = false;
     icon: string = '♟';


    constructor(color: string, board: Board, position: Position)
    {
        super(color,board,position);
    }

    moves(): Position[] {
        let positions: Position[] = [];
        if (this.color === 'white') {
            let oneStep = new Position(this.position.getX(), this.position.getY() - 1);
            if (this.board.checkPosition(oneStep) === null) {
                positions.push(oneStep);
            }
    
            if (!this.moved) {
                let twoSteps = new Position(this.position.getX(), this.position.getY() - 2);
                if (this.board.checkPosition(twoSteps) === null) {
                    positions.push(twoSteps);
                }
            }
        } else {
            let oneStep = new Position(this.position.getX(), this.position.getY() + 1);
            if (this.board.checkPosition(oneStep) === null) {
                positions.push(oneStep);
            }
    
            if (!this.moved) {
                let twoSteps = new Position(this.position.getX(), this.position.getY() + 2);
                if (this.board.checkPosition(twoSteps) === null) {
                    positions.push(twoSteps);
                }
            }
        }
        return positions;
    }
    
    draw(p: p5) 
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
            p.fill(0);
            p.text(this.icon,this.position.getX()*100+67, this.position.getY()*100+125);
        }

    }
    update(p: import("p5")): null {
        throw new Error("Method not implemented.");
    }
    
}
export default Pawn;