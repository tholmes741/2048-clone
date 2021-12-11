class Game {
    static padding = 15;
    static gridSize = 4;
    static animationTime = 100;
    constructor(ctx) {
        this.ctx = ctx;
        this.score = 0;
        this.tiles = [];
        this.lastKeyPressed = 0;
        this.shouldAnimate = false;
        
    }

    get grid() {
        const grid = [
            new Array(4).fill(null),
            new Array(4).fill(null),
            new Array(4).fill(null),
            new Array(4).fill(null)
        ];
        for (let tile of this.tiles) {
            if (!tile.toRemove) {
                grid[tile.column][tile.row] = tile
            }
        }
        return grid;
    }

    logGrid() {
        this.grid.forEach(row => {
            console.log(row.map(tile => tile ? tile.val : null))
        })
    }

    init() {
        this.placeRandomTile();
        this.placeRandomTile();
        requestAnimationFrame(this.draw.bind(this));
        document.addEventListener("keydown", this.keyPressed.bind(this));
    }

    draw(time) {
        if (this.shouldAnimate === true) {
            this.lastKeyPressed = time;
            this.shouldAnimate = false;
        }
        this.ctx.clearRect(0, 0, 500, 500);
        this.drawBackground();
        const percentage = Math.min(1, (time - this.lastKeyPressed) / Game.animationTime);
        this.drawTiles(percentage);
        requestAnimationFrame(this.draw.bind(this));
    }

    keyPressed(e) {
        let handleF;
        if (e.keyCode === 37) {
            handleF = this.handleLeftPressed.bind(this);
        } else if (e.keyCode === 38) {
            handleF = this.handleUpPressed.bind(this);
        } else if (e.keyCode === 39) {
            handleF = this.handleRightressed.bind(this);
        } else if (e.keyCode === 40) {
            handleF = this.handleDownPressed.bind(this);
        } else if (e.keyCode === 72) {
            this.logGrid();
        }
        
        if (handleF) {
            const shifted = handleF();
            if (shifted) {
                setTimeout(() => this.placeRandomTile(), Game.animationTime)
                this.shouldAnimate = true;
            }
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

    drawTiles(percentage) {
        for (let tile of this.tiles) {
            tile.draw(this.ctx, percentage);
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
        const tile = new Tile(x, y, Game.padding, this.removeTile.bind(this));
        this.tiles.push(tile);
    }

    placeTile(x, y) {
        const tile = new Tile(x, y, Game.padding, this.removeTile.bind(this));
        this.tiles.push(tile);
    }

    removeTile(tileToRemove) {
        this.tiles = this.tiles.filter(tile => tile !== tileToRemove)
    }

    handleLeftPressed() {
        let hasMoved = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let tiles = this.grid[x];
            let previousTile = null;
        
            for (let i = 0; i < tiles.length; i++) {
                let tile = tiles[i];
                if (tile === null) {
                    continue;
                } else if (i === 0) {
                    previousTile = tile;
                    continue;
                }

                if (previousTile === null) {
                    tile.setPosition(0, null);
                    hasMoved = true;
                    previousTile = tile;
                } else if (!previousTile.toCombine && previousTile.val === tile.val) {
                    previousTile.toCombine = true;
                    tile.toRemove = true;
                    tile.setPosition(previousTile.row, previousTile.column);
                    hasMoved = true;
                } else if (previousTile.row + 1 !== tile.row) {
                    tile.setPosition(previousTile.row + 1, null)
                    hasMoved = true;
                    previousTile = tile;
                } else {
                    previousTile = tile;
                }

            }
        }

        return hasMoved;
    }

    handleRightressed() {
        let hasMoved = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let tiles = this.grid[x];
            let previousTile = null;
            for (let i = Game.gridSize - 1; i >= 0; i--) {
                let tile = tiles[i];
                if (tile === null) {
                    continue;
                } else if (i === Game.gridSize - 1) {
                    previousTile = tile;
                    continue;
                }

                if (previousTile === null) {
                    tile.setPosition(Game.gridSize - 1, null);
                    hasMoved = true;
                    previousTile = tile;
                } else if (!previousTile.toCombine && previousTile.val === tile.val) {
                    previousTile.toCombine = true;
                    tile.toRemove = true;
                    tile.setPosition(previousTile.row, previousTile.column);
                    hasMoved = true;
                } else if (previousTile.row - 1 !== tile.row) {
                    tile.setPosition(previousTile.row - 1, null)
                    hasMoved = true;
                    previousTile = tile;
                } else {
                    previousTile = tile;
                }
            }
        }

        return hasMoved;
    }

    handleUpPressed() {
        let hasMoved = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let tiles = this.grid.map(row => row[x]);
            let previousTile = null;
        
            for (let i = 0; i < tiles.length; i++) {
                let tile = tiles[i];
                if (tile === null) {
                    continue;
                } else if (i === 0) {
                    previousTile = tile;
                    continue;
                }

                if (previousTile === null) {
                    tile.setPosition(null, 0);
                    hasMoved = true;
                    previousTile = tile;
                } else if (!previousTile.toCombine && previousTile.val === tile.val) {
                    previousTile.toCombine = true;
                    tile.toRemove = true;
                    tile.setPosition(previousTile.row, previousTile.column);
                    hasMoved = true;
                } else if (previousTile.column + 1 !== tile.column) {
                    tile.setPosition(null, previousTile.column + 1)
                    hasMoved = true;
                    previousTile = tile;
                } else {
                    previousTile = tile;
                }

            }
        }

        return hasMoved;
    }

    handleDownPressed() {
        let hasMoved = false;
        for (let x = 0; x < Game.gridSize; x++) {
            let tiles = this.grid.map(row => row[x]);
            let previousTile = null;
        
            for (let i = Game.gridSize - 1; i >= 0; i--) {
                let tile = tiles[i];
                if (tile === null) {
                    continue;
                } else if (i === Game.gridSize - 1) {
                    previousTile = tile;
                    continue;
                }

                if (previousTile === null) {
                    tile.setPosition(null, Game.gridSize - 1);
                    hasMoved = true;
                    previousTile = tile;
                } else if (!previousTile.toCombine && previousTile.val === tile.val) {
                    previousTile.toCombine = true;
                    tile.toRemove = true;
                    tile.setPosition(previousTile.row, previousTile.column);
                    hasMoved = true;
                } else if (previousTile.column - 1 !== tile.column) {
                    tile.setPosition(null, previousTile.column - 1)
                    hasMoved = true;
                    previousTile = tile;
                } else {
                    previousTile = tile;
                }

            }
        }

        return hasMoved;
    }
}

