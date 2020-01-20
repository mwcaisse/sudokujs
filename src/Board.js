import {Tile, TileBorder} from "@app/Tile";
import * as PIXI from "pixi.js";

import TestGame from "@app/assets/games/test.gme"

class Board {

    constructor(x, y, width, height) {
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

        console.log(TestGame);
        console.log(numbers);

        for (let i = 0; i < this.rows; i++) {
            this.tiles[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                let x = xSpacing * i;
                let y = ySpacing * j;

                this.tiles[i][j] = new Tile(x, y, xSpacing, ySpacing, Board.determineBorderType(i, j));

                if (numbers[j][i] >= 1) {
                    this.tiles[i][j].setNumber(numbers[j][i]);
                }

                this.tiles[i][j].render(this.container);
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