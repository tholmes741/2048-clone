class Game {
    static padding = 15;
    constructor(ctx) {
        this.ctx = ctx;
        this.score = 0;
        this.tiles = new Array(4).fill(new Array(4).fill(null));
    }

    init() {
        this.drawBackground();
        this.placeRandomTile();
        this.placeRandomTile();
        this.drawTiles();

    }

    drawBackground() {
        this.ctx.fillStyle = 'rgb(238, 228, 218)';
        const length = 106.25
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
                    tile.draw(this.ctx, Game.padding);
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


        const [x, y] = empties[Math.floor(Math.random() * empties.length)];
        this.tiles[x][y] = new Tile(x, y);
    }

}

