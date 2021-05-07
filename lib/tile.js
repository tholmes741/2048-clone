class Tile {
    static length = 106.25;

    constructor(column, row, padding) {
        this.val = Math.random() < 0.95 ? 2 : 4;
        // this.val = Math.floor(Math.random() * 100) ;
        this.row = row;
        this.column = column;
        this.padding = padding;
    }

    get x () {
        return this.padding + (Tile.length + this.padding) * this.row;
    }

    get y () {
        return this.padding + (Tile.length + this.padding) * this.column;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(
            this.x,
            this.y,
            Tile.length,
            Tile.length
        )
        //TODO: update size and color based on value
        ctx.font= '55px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign= 'center'; 
        ctx.textBaseline = 'middle';
        ctx.fillText(
            this.val, 
            this.x + (Tile.length / 2),
            this.y + (Tile.length / 2)
        )
    }

}
