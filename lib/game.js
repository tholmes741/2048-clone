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
        this.tiles[0][0] = new Tile(0, 0, Game.padding);
        this.tiles[0][1] = new Tile(0, 1, Game.padding);
        // this.placeRandomTile();
        // this.placeRandomTile();
        // this.placeRandomTile();
        // this.placeRandomTile();
        // this.placeRandomTile();
        // this.placeRandomTile();
        // this.placeRandomTile();
        // this.placeRandomTile();
        this.draw();
        console.log(this.tiles);
debugger;
        this.combineRight();
        this.shiftRight();
        // this.combineLeft();
        // this.shiftLeft();
        this.draw();
        console.log(this.tiles);

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

    combineRight() {
        for (let x = 0; x < this.tiles.length; x++) {
            let i = this.tiles.length - 2;
            let j = this.tiles.length - 1;
            let tiles = this.tiles[x];
            while (i >= 0) {
                if (tiles[j] === null) {
                    i--;
                    j--;
                    continue;
                } else if (tiles[i] === null) {
                    i--;
                    continue;
                }

                if (tiles[j].val === tiles[i].val) {
                    tiles[j].val *= 2;
                    tiles[i] = null;
                    j = i - 1;
                    i = j - 1;
                    continue;
                }

                j = i;
                i--;
            }
        }
    }

    shiftLeft() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].filter(tile => tile !== null).forEach((tile, idx) => {
                this.tiles[tile.column][tile.row] = null;
                tile.row = idx;
                tile.column = i;
                this.tiles[tile.column][tile.row] = tile;
            })
        }
    }

    shiftRight() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].filter(tile => tile !== null).reverse().forEach((tile, idx) => {
                this.tiles[tile.column][tile.row] = null;
                tile.row = this.tiles.length - 1 - idx;
                tile.column = i;
                this.tiles[tile.column][tile.row] = tile;
            })
        }
    }

}

