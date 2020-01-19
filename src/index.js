import * as PIXI from "pixi.js"

import Key from "@app/Key"

let app = new PIXI.Application({
    resizeTo: window,
    antialias: true
});

//Hide the scroll bars and remove the white outline
document.body.style.overflow = "hidden";
document.body.style.padding = "0";
document.body.style.margin = "0";

document.body.appendChild(app.view);

function drawVerticalLines(app, width, height, count, x_offset, y_offset, draw_sub_lines=false) {

    let spacing =  width / (count + 1);
    let color = 0x666666;

    if (draw_sub_lines) {
        color = 0xE5E5E5;
    }

    let i = 1;
    for (i = 1; i <= count; i ++) {
        let line = new PIXI.Graphics();
        let x = spacing * i
        line.lineStyle(4, color, 1);
        line.moveTo(x + x_offset, 0 + y_offset);
        line.lineTo(x + x_offset, height + y_offset);
        app.stage.addChild(line);

        if (draw_sub_lines) {
            drawVerticalLines(app, spacing, height, 2, x_offset + spacing * (i-1), y_offset,false);
        }
    }

    if (draw_sub_lines) {
        drawVerticalLines(app, spacing, height, 2, x_offset + spacing * (i-1), y_offset,false);
    }

}

function drawHorizontalLines(app, width, height, count, x_offset, y_offset, draw_sub_lines=false) {

    let spacing =  height / (count + 1);
    let color = 0x666666;

    if (draw_sub_lines) {
        color = 0xE5E5E5;
    }

    let i = 1;
    for (i = 1; i <= count; i ++) {
        let line = new PIXI.Graphics();
        line.lineStyle(4, color, 1);
        line.moveTo(0 + x_offset, i * spacing + y_offset);
        line.lineTo(width + x_offset, i * spacing + y_offset);
        app.stage.addChild(line);

        if (draw_sub_lines) {
            drawHorizontalLines(app, width, spacing, 2, x_offset,y_offset + spacing * (i - 1), false);
        }
    }

    if (draw_sub_lines) {
        drawHorizontalLines(app, width, spacing, 2, x_offset,y_offset + spacing * (i - 1), false);
    }

}

function drawBoard(app, x, y, width, height) {
    drawVerticalLines(app, width, height, 2, x,y, true);
    drawHorizontalLines(app, width, height, 2,x,y, true );

    //draw the board outline

    //horizontal outlines
    let line = new PIXI.Graphics();
    //0xE5E5E5
    line.lineStyle(4, 0xE5E5E5, 1);
    line.moveTo(x, y);
    line.lineTo(x, height + y);
    app.stage.addChild(line);

    line = new PIXI.Graphics();
    //0xE5E5E5
    line.lineStyle(4, 0xE5E5E5, 1);
    line.moveTo(x + width, 0 + y);
    line.lineTo(x + width, height + y);
    app.stage.addChild(line);

    //vertical outlines
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
function setup(loader, resources) {

    drawBoard(app, 200,200, 800,800);



}

//Load up the cat
app.loader
    .load(setup);

