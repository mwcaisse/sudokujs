import * as PIXI from "pixi.js"

import Board from "@app/Board"

let app = new PIXI.Application({
    resizeTo: window,
    antialias: true
});

//Hide the scroll bars and remove the white outline
document.body.style.overflow = "hidden";
document.body.style.padding = "0";
document.body.style.margin = "0";

document.body.appendChild(app.view);


/*eslint-disable max-lines-per-function */
/*eslint-disable max-statements */
function setup() {
    //Let's center the board
    let width = 1200;
    let height = 1200;
    let x = (app.view.width / 2) - (width / 2)
    let y = (app.view.height / 2) - (height / 2)

    let board = new Board(x, y, width, height);
    board.render(app.stage);
}

//Load up the cat
app.loader
    .load(setup);

