import Piece from "./Piece";

class Bishop extends Piece
{
    getPosition(position: Position): Position {
        throw new Error("Method not implemented.");
    }
    
    moves(): string[] {
        throw new Error("Method not implemented.");
    }
    draw(p: import("p5")): null {
        throw new Error("Method not implemented.");
    }
    update(p: import("p5")): null {
        throw new Error("Method not implemented.");
    }

}