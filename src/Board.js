import {Tile, TileBorder} from "@app/Tile";
import * as PIXI from "pixi.js";

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

        for (let i = 0; i < this.rows; i++) {
            this.tiles[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                let x = xSpacing * i;
                let y = ySpacing * j;

                this.tiles[i][j] = new Tile(x, y, xSpacing, ySpacing, this.determineBorderType(i, j));
                this.tiles[i][j].render(this.container);
            }
        }
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