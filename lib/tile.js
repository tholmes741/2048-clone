class Tile {
    static length = 106.25;
    static animationTime = 250;
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

    constructor(column, row, padding, removeTile = () => {}) {
        this.val = Math.random() < 0.9 ? 2 : 4;
        this._row = row;
        this._column = column;
        this._previousRow = row;
        this._previousColumn = column;
        this.padding = padding;
        this.removeTile = removeTile
    }

    getX(p) {
        const diff = this.row - this._previousRow;
        return this.padding + (Tile.length + this.padding) * (this._previousRow + diff * p);
    }

    getY(p) {
        const diff = this.column - this._previousColumn;
        return this.padding + (Tile.length + this.padding) * (this._previousColumn + diff * p);
    }

    set row(row) {
        this._previousRow = this._row;
        this._row = row;
    }

    get row() {
        return this._row;
    }

    set column(column) {
        this._previousColumn = this._column;
        this._column = column;
    }

    get column() {
        return this._column;
    }

    setPosition(row ,column) {
        if (row === null) {
            row = this.row;
        }
        if (column === null) {
            column = this.column;
        }
        this.row = row;
        this.column = column;
    }

// if tile is a new tile change the size based on time drawn
    draw(ctx, percentage) {
        if (percentage === 1) { 
            this.setPosition(null, null);
        }
        const colors = Tile.colors.hasOwnProperty(this.val) ? 
            Tile.colors[this.val] : 
            Tile.colors.default;
        ctx.fillStyle = colors.tileColor;
        const x = this.getX(percentage);
        const y = this.getY(percentage);
        ctx.fillRect(
            x,
            y,
            Tile.length,
            Tile.length
        )

        ctx.font= colors.font;
        ctx.fillStyle = colors.fontColor;
        ctx.textAlign= 'center'; 
        ctx.textBaseline = 'middle';
        ctx.fillText(
            this.val, 
            x + (Tile.length / 2),
            y + (Tile.length / 2) + 4
        )
    }
}
