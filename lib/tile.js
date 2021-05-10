class Tile {
    static length = 106.25;
    static colors = {
        2: {
            font: 'bold 55px Arial',
            fontColor: '#776e65',
            tileColor: '#eee4da'
        },
        4: {
            font: 'bold 55px Arial',
            fontColor: '#776e65',
            tileColor: '#ede0c8'
        },
        8: {
            font: 'bold 55px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#f2b179'
        },
        16: {
            font: 'bold 55px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#f59562'
        },
        32: {
            font: 'bold 55px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#f67c5f'
        },
        64: {
            font: 'bold 55px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#f65e3b'
        },
        128: {
            font: 'bold 50px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#edcf72'
        },
        256: {
            font: 'bold 50px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#edcc61'
        },
        512: {
            font: 'bold 50px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#edc850'
        },
        1024: {
            font: 'bold 40px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#edc53f'
        },
        2048: {
            font: 'bold 40px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#edc22e'
        },
        default: {
            font: 'bold 40px Arial',
            fontColor: '#f9f6f2',
            tileColor: '#edc22e'
        },
    }

    constructor(column, row, padding) {
        this.val = Math.random() < 0.95 ? 2 : 4;
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
        const colors = Tile.colors.hasOwnProperty(this.val) ? 
            Tile.colors[this.val] : 
            Tile.colors.default;
        ctx.fillStyle = colors.tileColor;
        ctx.fillRect(
            this.x,
            this.y,
            Tile.length,
            Tile.length
        )

        ctx.font= colors.font;
        ctx.fillStyle = colors.fontColor;
        ctx.textAlign= 'center'; 
        ctx.textBaseline = 'middle';
        ctx.fillText(
            this.val, 
            this.x + (Tile.length / 2),
            this.y + (Tile.length / 2) + 4
        )
    }
}
