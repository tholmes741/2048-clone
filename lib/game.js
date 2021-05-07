class Game {
    static padding = 15;
    constructor(ctx) {
        this.ctx = ctx;
        this.score = 0;
        this.tiles = [
            new Array(4).fill(null),
            new Array(4).fill(null),
            new Array(4).fill(null),
            new Array(4).fill(null)
        ];
    }

    init() {
        this.placeRandomTile();
        this.placeRandomTile();
        this.placeRandomTile();
        this.placeRandomTile();
        this.placeRandomTile();
        this.draw();
        console.log(this.tiles);
debugger;
        this.combineLeft();
        this.shiftLeft();
        console.log(this.tiles);
        // setTimeout(this.shiftLeft.bind(this), 1000);

    }

    draw() {
        this.ctx.clearRect(0, 0, 500, 500);
        this.drawBackground();
        this.drawTiles();
    }

    drawBackground() {
        this.ctx.fillStyle = 'rgb(238, 228, 218)';
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.ctx.fillRect(
                    Game.padding + (Tile.length + Game.padding) * i,
                    Game.padding + (Tile.length + Game.padding) * j,
                    Tile.length,
                    Tile.length
                );
            }
        }
    }

    drawTiles() {
        for (let x of this.tiles) {
            for (let tile of x) {
                if (tile !== null) {
                    tile.draw(this.ctx);
                }
            }
        }
    }

    /**
     * Returns all locations that don't have a tile 
     */
    emptyTiles() {
        let empties = [];
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[x].length; y++) {
                if (this.tiles[x][y] === null) {
                    empties.push([x, y]);
                }
            }
        }

        return empties;
    }

    placeRandomTile() {
        const empties = this.emptyTiles();
        if (empties.length === 0) {
            return;
        }

        const [x,y] = empties[Math.floor(Math.random() * empties.length)];
        this.tiles[x][y] = new Tile(x, y, Game.padding);
    }

    combineLeft() {
        for (let x = 0; x < this.tiles.length; x++) {
            let i = 0;
            let j = 1;
            let tiles = this.tiles[x];
            while (j < tiles.length) {
                if (tiles[i] === null) {
                    i++;
                    j++;
                    continue;
                } else if (tiles[j] === null) {
                    j++;
                    continue;
                }

                if (tiles[i].val === tiles[j].val) {
                    tiles[i].val *= 2;
                    tiles[j] = null;
                    i = j + 1;
                    j = i + 1;
                    continue;
                }

                i = j;
                j++;
            }
        }
    }

    shiftLeft() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].filter(tile => tile !== null).forEach((tile, idx) => {
                this.tiles[tile.column][tile.row] = null;
                tile.row = idx;
                tile.column = i;
                this.tiles[i][idx] = tile;
            })
        }
    }

}

