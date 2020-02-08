import {Tile, TileBorder, TileEvent} from "@app/Tile";
import * as PIXI from "pixi.js";

import TestGame from "@app/assets/games/test.gme"

class Board extends PIXI.utils.EventEmitter {

    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.rows = 9;
        this.cols = 9;
        this.tiles = new Array(this.rows);
        this.container = new PIXI.Container();
        this.init();
    }

    init() {
        this.container.x = this.x;
        this.container.y = this.y;
        this.container.width = this.width;
        this.container.height = this.height;

        let xSpacing = this.width / this.rows;
        let ySpacing = this.height / this.cols;

        let numbers = this.parseBoard(TestGame);

        for (let i = 0; i < this.rows; i++) {
            this.tiles[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                let x = xSpacing * i;
                let y = ySpacing * j;

                this.tiles[i][j] = new Tile(this, x, y, xSpacing, ySpacing, Board.determineBorderType(i, j));
                this.tiles[i][j].render(this.container);

                if (numbers[j][i] >= 1) {
                    this.tiles[i][j].setNumber(numbers[j][i], true);
                }

                this.tiles[i][j].on(TileEvent.NUMBER_SET, event => {
                    this.onTileNumberChanged(TileEvent.NUMBER_SET, event);
                });

                this.tiles[i][j].on(TileEvent.NUMBER_CLEARED, () => {
                    this.onTileNumberChanged(TileEvent.NUMBER_CLEARED);
                });
            }
        }

    }

    parseBoard(gameString) {
        let numbers = new Array(this.rows);

        let rows = gameString.split("\n");
        for (let i = 0; i < this.rows; i++) {
            numbers[i] = new Array(this.cols);
            let cols = rows[i].split(" ");
            for (let j = 0; j < this.cols; j++) {
                numbers[i][j] = parseInt(cols[j], 10);
            }
        }

        return numbers;
    }

    /**
     * Check if the board has any errors
     */
    /*eslint-disable max-lines-per-function */
    /*eslint-disable max-depth*/
    /*eslint-disable complexity */
    validateBoard() {
        let errors = new Array(this.rows);
        let squareSize = 3;
        let valid = true;

        //Check columns
        for (let i = 0; i < this.rows; i++) {
            errors[i] = new Array(this.cols);
            let colSets = new Array(squareSize);

            for (let a = 0; a < squareSize; a++) {
                colSets[a] = new Set();
            }

            let error = false;
            for (let j=0; j < this.cols; j++) {
                let tile = this.tiles[i][j];
                if (tile.number < 1) {
                    continue;
                }
                colSets[Math.floor(j / squareSize)].add(tile.number);
            }

            let common = new Set();
            for (let s of [...colSets]) {
                for (let num of [...s]) {
                    if (common.has(num)) {
                        error = true;
                    }
                    common.add(num)
                }
            }
            if (error) {
                valid = false;
                console.log("Col: " + (i + 1) + " has error!");
                for (let j=0; j < this.cols; j++) {
                    errors[i][j] = true;
                }
            }
        }

        //Check rows
        for (let j = 0; j < this.cols; j++) {
            let rowSets = new Array(squareSize);

            for (let a= 0; a < squareSize; a++) {
                rowSets[a] = new Set();
            }

            let error = false;
            for (let i=0; i < this.rows; i++) {
                let tile = this.tiles[i][j];
                if (tile.number < 1) {
                    continue;
                }
                rowSets[Math.floor(i/squareSize)].add(tile.number);
            }

            let common = new Set();
            for (let s of [...rowSets]) {
                for (let num of [...s]) {
                    if (common.has(num)) {
                        error = true;
                    }
                    common.add(num)
                }
            }

            if (error) {
                valid = false;
                console.log("Row: " + (j + 1) + " has error!");
                for (let i=0; i < this.cols; i++) {
                    errors[i][j] = true;
                }
            }
        }

        //Check squares 3x3
        for (let i = 0; i < this.rows / squareSize; i++) {
            for (let j = 0; j < this.cols / squareSize; j++) {
                let error = false;
                let squareSet = new Set();

                for (let si = 0; si < squareSize; si++) {
                    for (let sj = 0; sj < squareSize; sj++) {
                        let tile = this.tiles[(i * squareSize) + si][(j * squareSize) + sj]
                        if (tile.number < 1) {
                            continue;
                        }
                        if (squareSet.has(tile.number)) {
                            error = true;
                        }
                        squareSet.add(tile.number);
                    }
                }

                if (error) {
                    valid = false;
                    console.log("Square: (" + i + ", " + j + ") has error!");
                    for (let si = 0; si < squareSize; si++) {
                        for (let sj = 0; sj < squareSize; sj++) {
                            errors[(i * squareSize) + si][(j * squareSize) + sj] = true;
                        }
                    }
                }

            }
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.tiles[i][j].setError(errors[i][j] === true);
            }
        }

        return valid;
    }

    checkGameFinished(boardValid) {
        if (!boardValid) {
            return false;
        }

        //If the board is valid and every square has a number in it, then the game is finished

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j< this.cols; j++) {
                if (!this.tiles[i][j].hasNumber()) {
                    return false;
                }
            }
        }

        //eslint-disable-next-line no-alert
        alert("Yay! You finished the game biiiitch.");

        return true;
    }

    onTileNumberChanged() {
        let isValid = this.validateBoard();
        this.checkGameFinished(isValid);
    }

    render(container) {
        container.addChild(this.container);
    }

    static determineBorderType(i, j) {
        let bottom = (j + 1) % 3 === 0,
            left = i % 3 === 0,
            right = (i + 1) % 3 === 0,
            top = j % 3 === 0;

        let border = TileBorder.NONE;
        if (left && top) {
            border = TileBorder.TOP_LEFT
        }
        else if (left && bottom) {
            border = TileBorder.BOTTOM_LEFT
        }
        else if (left) {
            border = TileBorder.LEFT;
        }
        else if (right && top) {
            border = TileBorder.TOP_RIGHT;
        }
        else if (right && bottom) {
            border = TileBorder.BOTTOM_RIGHT;
        }
        else if (right) {
            border = TileBorder.RIGHT;
        }
        else if (top) {
            border = TileBorder.TOP;
        }
        else if (bottom) {
            border = TileBorder.BOTTOM;
        }
        return border;
    }
}

export default Board