import * as PIXI from "pixi.js";

const TileBorder = Object.freeze({
    LEFT: "left",
    RIGHT: "right",
    TOP: "top",
    BOTTOM: "bottom",
    TOP_LEFT: "top_left",
    TOP_RIGHT: "top_right",
    BOTTOM_LEFT: "bottom_left",
    BOTTOM_RIGHT: "bottom_right",
    NONE: "none"
});

class Tile {

    constructor(x, y, width, height, border=TileBorder.NONE) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.border = border;

        this.borderWidth = 4;
    }

    render(app) {
        this.drawLine(app, this.x, this.y, this.x, this.height + this.y, this.determineColor(TileBorder.LEFT));
        this.drawLine(app, this.x + this.width, this.y, this.x + this.width, this.height + this.y,
            this.determineColor(TileBorder.RIGHT));

        this.drawLine(app, this.x, this.y, this.x + this.width, this.y, this.determineColor(TileBorder.TOP));
        this.drawLine(app, this.x, this.y + this.height, this.x + this.width, this.y + this.height,
            this.determineColor(TileBorder.BOTTOM));
    }


    determineColor(linePlacement) {
        if (this.border.includes(linePlacement)) {
            return 0xE5E5E5;
        }
        return 0x666666;
    }

    drawLine(app, startX, startY, endX, endY, color) {
        let line = new PIXI.Graphics();
        line.lineStyle(this.borderWidth, color, 1);
        line.moveTo(startX, startY);
        line.lineTo(endX, endY);
        app.stage.addChild(line);
    }
}

export {
    Tile, TileBorder
}
