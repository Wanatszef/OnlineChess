import p5 from 'p5';
import Piece from '../src/gameComponents/Piece';
import AIBoard from '../src/gameComponents/AIBoard';

const sketch = (p: p5) => {
    
    let pieces: Piece[][] = [];
    let board = new AIBoard(pieces);

    p.setup = () => {
        p.createCanvas(1000, 1000);
        p.background(220);
        p.noLoop();
        board.draw(p,100);
    };

    p.draw = () => 
    {
        p.background(220);
        board.draw(p,100);
    };

    p.mousePressed = () => {
        board.mousePressed(p);
        p.draw();
    };
    
};

new p5(sketch);