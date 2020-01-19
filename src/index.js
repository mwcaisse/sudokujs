import * as PIXI from "pixi.js"

let app = new PIXI.Application({
    resizeTo: window,
    antialias: true
});

//Hide the scroll bars and remove the white outline
document.body.style.overflow = "hidden";
document.body.style.padding = "0";
document.body.style.margin = "0";

document.body.appendChild(app.view);

function drawVerticalLines(app, width, height, count, xOffset, yOffset, drawSubLines=false) {

    let spacing = width / (count + 1);
    let color = 0x666666;

    if (drawSubLines) {
        color = 0xE5E5E5;
    }

    let i = 1;
    for (i = 1; i <= count; i++) {
        let line = new PIXI.Graphics();
        let x = spacing * i
        line.lineStyle(4, color, 1);
        line.moveTo(x + xOffset, 0 + yOffset);
        line.lineTo(x + xOffset, height + yOffset);
        app.stage.addChild(line);

        if (drawSubLines) {
            drawVerticalLines(app, spacing, height, 2, xOffset + (spacing * (i-1)), yOffset, false);
        }
    }

    if (drawSubLines) {
        drawVerticalLines(app, spacing, height, 2, xOffset + (spacing * (i-1)), yOffset, false);
    }

}

function drawHorizontalLines(app, width, height, count, xOffset, yOffset, drawSubLines=false) {

    let spacing = height / (count + 1);
    let color = 0x666666;

    if (drawSubLines) {
        color = 0xE5E5E5;
    }

    let i = 1;
    for (i = 1; i <= count; i++) {
        let line = new PIXI.Graphics();
        line.lineStyle(4, color, 1);
        line.moveTo(0 + xOffset, (i * spacing) + yOffset);
        line.lineTo(width + xOffset, (i * spacing) + yOffset);
        app.stage.addChild(line);

        if (drawSubLines) {
            drawHorizontalLines(app, width, spacing, 2, xOffset, yOffset + (spacing * (i - 1)), false);
        }
    }

    if (drawSubLines) {
        drawHorizontalLines(app, width, spacing, 2, xOffset, yOffset + (spacing * (i - 1)), false);
    }

}

function drawBoard(app, x, y, width, height) {
    drawVerticalLines(app, width, height, 2, x, y, true);
    drawHorizontalLines(app, width, height, 2, x, y, true);

    //Draw the board outline

    //Horizontal outlines
    let line = new PIXI.Graphics();
    //0xE5E5E5
    line.lineStyle(4, 0xE5E5E5, 1);
    line.moveTo(x, y);
    line.lineTo(x, height + y);
    app.stage.addChild(line);

    line = new PIXI.Graphics();
    line.lineStyle(4, 0xE5E5E5, 1);
    line.moveTo(x + width, 0 + y);
    line.lineTo(x + width, height + y);
    app.stage.addChild(line);

    //Vertical outlines
    line = new PIXI.Graphics();
    line.lineStyle(4, 0xE5E5E5, 1);
    line.moveTo(x, y);
    line.lineTo(x + width, y);
    app.stage.addChild(line);

    line = new PIXI.Graphics();
    line.lineStyle(4, 0xE5E5E5, 1);
    line.moveTo(x, y + height);
    line.lineTo(x + width, y + height);
    app.stage.addChild(line);
}

/*eslint-disable max-lines-per-function */
/*eslint-disable max-statements */
function setup() {
    drawBoard(app, 200, 200, 800, 800);
}

//Load up the cat
app.loader
    .load(setup);

