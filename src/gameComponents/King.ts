import Board from "./Board";
import Piece from "./Piece";
import Position from "./Position";

class King extends Piece
{
    icon: string = '♚';
    moved: boolean = false;

    constructor(color: string, board: Board, position: Position)
   {
       super(color,board,position);
   }
   
   moves(): Position[] {
    let positions: Position[] = [];
    const potentialMoves: [number, number][] = 
    [
        [1, 0],  
        [0, 1],  
        [-1, 0], 
        [0, -1], 
        [1, 1],  
        [-1, -1], 
        [1, -1],  
        [-1, 1]  
    ];

    for (let move of potentialMoves) 
    {
        let x = this.position.getX() + move[0];
        let y = this.position.getY() + move[1];

        if (x>= 0 && x < 8 && y>= 0 && y < 8) 
            {
                let newPosition = new Position(x, y);
                let tempPiece = this.board.checkPosition(newPosition);

            if (tempPiece) 
                {
                    if (tempPiece.color !== this.color) 
                        {
                            positions.push(newPosition);
                        }
                } 
                else 
                    {   
                        positions.push(newPosition);
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

export default King;
    

