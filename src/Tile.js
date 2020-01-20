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

        this.number = null;

        this.textStyle = new PIXI.TextStyle({
            fill: 0x7F7FFF,
            fontWeight: "bolder",
            fontSize: "75px"
        });
    }

    render(container) {
        this.drawLine(container, this.x, this.y, this.x, this.height + this.y, this.determineColor(TileBorder.LEFT));
        this.drawLine(container, this.x + this.width, this.y, this.x + this.width, this.height + this.y,
            this.determineColor(TileBorder.RIGHT));

        this.drawLine(container, this.x, this.y, this.x + this.width, this.y, this.determineColor(TileBorder.TOP));
        this.drawLine(container, this.x, this.y + this.height, this.x + this.width, this.y + this.height,
            this.determineColor(TileBorder.BOTTOM));

        if (this.number) {
            let text = new PIXI.Text(this.number, this.textStyle);
            text.anchor.set(0.5);
            text.position.set(this.x + (this.width / 2.0), this.y + (this.height / 2.0));
            container.addChild(text);
        }
    }


    determineColor(linePlacement) {
        if (this.border.includes(linePlacement)) {
            return 0xE5E5E5;
        }
        return 0x666666;
    }

    drawLine(container, startX, startY, endX, endY, color) {
        let line = new PIXI.Graphics();
        line.lineStyle(this.borderWidth, color, 1);
        line.moveTo(startX, startY);
        line.lineTo(endX, endY);
        container.addChild(line);
    }

    setNumber(number) {
        this.number = number;
    }

    clearNumber() {
        this.number = null;
    }
}

export {
    Tile, TileBorder
}
