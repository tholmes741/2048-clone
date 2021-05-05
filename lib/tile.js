class Tile {
    static length = 106.25;

    constructor(row, column) {
        this.val = Math.random() < 0.95 ? 2 : 4;
        this.row = row;
        this.column = column;
    }

    draw(ctx, padding) {
        ctx.fillStyle = 'white';
        ctx.fillRect(
            padding + (Tile.length + padding) * this.row,
            padding + (Tile.length + padding) * this.column,
            Tile.length,
            Tile.length
        )
        ctx.font= '55px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign= 'center'; 
        ctx.textBaseline = 'middle';
        ctx.fillText(
            this.val, 
            (padding + (Tile.length + padding) * this.row) + (Tile.length / 2),
            padding + (Tile.length + padding) * this.column + (Tile.length / 2)
        )
    }

}
