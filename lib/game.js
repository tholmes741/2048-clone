class Game {
    static padding = 15;
    static gridSize = 4;

    constructor(ctx) {
        this.ctx = ctx;
        this.score = 0;
        this.grid = [
            new Array(4).fill(null),
            new Array(4).fill(null),
            new Array(4).fill(null),
            new Array(4).fill(null)
        ];
    }

    init() {
        this.placeRandomTile();
        this.placeRandomTile();
        this.draw();
        document.addEventListener("keydown", this.keyPressed.bind(this));
    }

    draw() {
        this.ctx.clearRect(0, 0, 500, 500);
        this.drawBackground();
        this.drawTiles();
    }

    keyPressed(e) {
        let combineF;
        let shiftF;
        if (e.keyCode === 37) {
            combineF = this.combineLeft.bind(this);
            shiftF = this.shiftLeft.bind(this);
        } else if (e.keyCode === 38) {
            combineF = this.combineUp.bind(this);
            shiftF = this.shiftUp.bind(this);
        } else if (e.keyCode === 39) {
            combineF = this.combineRight.bind(this);
            shiftF = this.shiftRight.bind(this);
        } else if (e.keyCode === 40) {
            combineF = this.combineDown.bind(this);
            shiftF = this.shiftDown.bind(this);
        }
        
        if (combineF && shiftF) {
            const combined = combineF();
            const shifted = shiftF();
            if (combined || shifted) {
                this.placeRandomTile();
            }
            this.draw();
        }
        
    }

    drawBackground() {
        this.ctx.fillStyle = 'rgba(238, 228, 218, 0.35)';
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
        for (let x of this.grid) {
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
        for (let x = 0; x < Game.gridSize; x++) {
            for (let y = 0; y < Game.gridSize; y++) {
                if (this.grid[x][y] === null) {
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
        this.grid[x][y] = new Tile(x, y, Game.padding);
    }

    combineLeft() {
        let combined = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let i = 0;
            let j = 1;
            let tiles = this.grid[x];
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
                    combined = true;
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
        return combined;
    }

    combineRight() {
        let combined = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let i = Game.gridSize - 2;
            let j = Game.gridSize - 1;
            let tiles = this.grid[x];
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
                    combined = true;
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
        return combined;
    }

    combineUp() {
        let combined = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let i = 0;
            let j = 1;
            while (j < Game.gridSize) {
                if (this.grid[i][x] === null) {
                    i++;
                    j++;
                    continue;
                } else if (this.grid[j][x] === null) {
                    j++;
                    continue;
                }

                if (this.grid[i][x].val === this.grid[j][x].val) {
                    combined = true;
                    this.grid[i][x].val *= 2;
                    this.grid[j][x] = null;
                    i = j + 1;
                    j = i + 1;
                    continue;
                }

                i = j;
                j++;
            }
        }
        return combined;
    }

    /**
     * TODO: combine functions combineUp with combineLeft
     * as well as combineDown with combineRight
     */
    combineDown() {
        let combined = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let i = Game.gridSize - 2;
            let j = Game.gridSize - 1;
            while (i >= 0) {
                if (this.grid[j][x] === null) {
                    i--;
                    j--;
                    continue;
                } else if (this.grid[i][x] === null) {
                    i--;
                    continue;
                }

                if (this.grid[j][x].val === this.grid[i][x].val) {
                    combined = true;
                    this.grid[j][x].val *= 2;
                    this.grid[i][x] = null;
                    j = i - 1;
                    i = j - 1;
                    continue;
                }

                j = i;
                i--;
            }
        }
        return combined;
    }

    shiftLeft() {
        let shifted = false;
        for (let i = 0; i < Game.gridSize; i++) {
            this.grid[i].filter(tile => tile !== null).forEach((tile, idx) => {
                if (tile.row !== idx) {
                    this.grid[tile.column][tile.row] = null;
                    tile.row = idx;
                    this.grid[tile.column][tile.row] = tile;
                    shifted = true;
                }
            })
        }
        return shifted;
    }

    shiftRight() {
        let shifted = false;
        for (let i = 0; i < Game.gridSize; i++) {
            this.grid[i].filter(tile => tile !== null).reverse().forEach((tile, idx) => {
                if (tile.row !== Game.gridSize - 1 - idx) {
                    this.grid[tile.column][tile.row] = null;
                    tile.row = Game.gridSize - 1 - idx;
                    this.grid[tile.column][tile.row] = tile;
                    shifted = true;
                }
            })
        }
        return shifted;
    }

    shiftUp() {
        let shifted = false;
        for (let i = 0; i < Game.gridSize; i++) {
            this.grid.map(row => row[i]).filter(tile => tile !== null).forEach((tile, idx) => {
                if (tile.column !== idx) {
                    this.grid[tile.column][tile.row] = null;
                    tile.column = idx;
                    this.grid[tile.column][tile.row] = tile;
                    shifted = true;
                }
            })
        }
        return shifted;
    }

    shiftDown() {
        let shifted = false;
        for (let i = 0; i < Game.gridSize; i++) {
            this.grid.map(row => row[i]).filter(tile => tile !== null).reverse().forEach((tile, idx) => {
                if (tile.column !== Game.gridSize - 1 - idx) {
                    this.grid[tile.column][tile.row] = null;
                    tile.column = Game.gridSize - 1 - idx;
                    this.grid[tile.column][tile.row] = tile;
                    shifted = true;
                }
            })
        }
        return shifted;
    }

}

