import { t } from "elysia";
import Board from "./Board";
import Piece from "./Piece";
import Position from "./Position";

class Knight extends Piece{

    icon: string = '♞';

    constructor(color: string, board: Board, position: Position)
    {
        super(color,board,position);
    }

    moves(): Position[] {
        let positions: Position[] = [];
        const potentialMoves: [number, number][] = [
            [1, -2], [2, -1], [2, 1], [1, 2],
            [-1, 2], [-2, 1], [-2, -1], [-1, -2]
        ];
    
        for (let move of potentialMoves) {
            let newX = this.position.getX() + move[0];
            let newY = this.position.getY() + move[1];
            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                let newPosition = new Position(newX, newY);
                let tempPiece = this.board.checkPosition(newPosition);
                if (tempPiece) {
                    if (tempPiece.color !== this.color) {
                        positions.push(newPosition); // Pole z przeciwnikiem
                    }
                } else {
                    positions.push(newPosition); // Puste pole
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

export default Knight;
