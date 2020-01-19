import * as PIXI from "pixi.js"

import {TileBorder, Tile} from "@app/Tile";

let app = new PIXI.Application({
    resizeTo: window,
    antialias: true
});

//Hide the scroll bars and remove the white outline
document.body.style.overflow = "hidden";
document.body.style.padding = "0";
document.body.style.margin = "0";

document.body.appendChild(app.view);


function drawBoard(app, x, y, width, height) {
    let xSpacing = width / 9;
    let ySpacing = height / 9;

    let xOffset = x;
    let yOffset = y;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let x = xSpacing * i;
            let y = ySpacing * j;

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

            let tile = new Tile(x + xOffset, y + yOffset, xSpacing, ySpacing, border);
            tile.render(app);
        }
    }
}

/*eslint-disable max-lines-per-function */
/*eslint-disable max-statements */
function setup() {
    drawBoard(app, 200, 200, 800, 800)
}

//Load up the cat
app.loader
    .load(setup);

