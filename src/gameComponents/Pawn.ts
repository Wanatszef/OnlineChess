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
        if (this.color === 'white') 
            {
                
                let leftAttack = new Position(this.position.getX()-1, this.position.getY() - 1);
                let piece = this.board.checkPosition(leftAttack);
                if(piece)
                {
                    if(piece.color !== this.color)
                    {
                        positions.push(leftAttack);
                    }
                }

                let rightAttack = new Position(this.position.getX()+1, this.position.getY() - 1);
                piece = this.board.checkPosition(rightAttack);
                if(piece)
                {
                    if(piece.color !== this.color)
                    {
                        positions.push(rightAttack);
                    }
                }
            
            let oneStep = new Position(this.position.getX(), this.position.getY() - 1);
            if (this.board.checkPosition(oneStep) === null) {
                positions.push(oneStep);
            }
    
            if (!this.moved) {
                let twoSteps = new Position(this.position.getX(), this.position.getY() - 2);
                if (this.board.checkPosition(twoSteps) === null && this.board.checkPosition(oneStep)=== null) {
                    positions.push(twoSteps);
                }
            }
        } 
        else 
        {
            let leftAttack = new Position(this.position.getX()+1, this.position.getY() + 1);
            
            let piece = this.board.checkPosition(leftAttack);
            if(piece)
            {
                if(piece.color !== this.color)
                {
                    positions.push(leftAttack);
                }
            }
             

            let rightAttack: Position = new Position(this.position.getX()-1, this.position.getY() + 1);

            piece = this.board.checkPosition(rightAttack);
            if(piece)
            {
                if(piece.color !== this.color)
                {
                    positions.push(rightAttack);
                }
            }
             

            let oneStep = new Position(this.position.getX(), this.position.getY() + 1);
            if (this.board.checkPosition(oneStep) === null) {
                positions.push(oneStep);
            }
    
            if (!this.moved) {
                let twoSteps = new Position(this.position.getX(), this.position.getY() + 2);
                if (this.board.checkPosition(twoSteps) === null && this.board.checkPosition(oneStep)=== null) {
                    positions.push(twoSteps);
                }
            }
        }
        for (let i = positions.length - 1; i >= 0; i--) {
            let move = positions[i];
            if (move.getX() > 7 || move.getX() < 0 || move.getY() > 7 || move.getY() < 0) {
                positions.splice(i, 1);
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
export default Pawn;