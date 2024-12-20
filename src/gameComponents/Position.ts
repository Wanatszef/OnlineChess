class Position
{
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public getX(): number
    {
        return this.x;
    }

    public getY(): number
    {
        return this.y;
    }

    public setX(x: number)
    {
        this.x = x;
    }

    public setY(y: number)
    {
        this.y = y;
    }
}

export default Position;