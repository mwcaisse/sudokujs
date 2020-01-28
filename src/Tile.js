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

const TileEvent = Object.freeze({
    NUMBER_CLEARED: "number_cleared",
    NUMBER_SET: "number_set"
});

class Tile extends PIXI.utils.EventEmitter {

    constructor(x, y, width, height, border=TileBorder.NONE) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.border = border;

        this.borderWidth = 4;

        this.number = null;
        this.gameNumber = false;

        this.textStyle = new PIXI.TextStyle({
            fill: 0x7F7FFF,
            fontWeight: "bolder",
            fontSize: "75px"
        });

        this.container = new PIXI.Container();
        this.background = new PIXI.Graphics();
        this.numberText = null;

        this.selected = false;

        this.error = false;

        this.init();
        this.initClickEvents();
        this.initEventListeners();
    }

    init() {
        this.container.x = this.x;
        this.container.y = this.y;
        this.container.width = this.width;
        this.container.height = this.height;
        this.container.interactive = true;

        this.background.alpha = 0;
        this.background.beginFill(0x4a5e80, 1);
        this.background.drawRect(0, 0, this.width, this.height);

        this.container.addChild(this.background);

        this.drawLine(this.container, 0, 0, 0, this.height, this.determineColor(TileBorder.LEFT));
        this.drawLine(this.container, this.width, 0, this.width, this.height,
            this.determineColor(TileBorder.RIGHT));

        this.drawLine(this.container, 0, 0, this.width, 0, this.determineColor(TileBorder.TOP));
        this.drawLine(this.container, 0, this.height, this.width, this.height,
            this.determineColor(TileBorder.BOTTOM));


        this.numberText = new PIXI.Text(this.number || "", this.textStyle);
        this.numberText.anchor.set(0.5);
        this.numberText.position.set((this.width / 2.0), (this.height / 2.0));
        this.container.addChild(this.numberText);
    }

    initClickEvents() {
        window.addEventListener("click", event => {
            //Left click
            if (event.button === 0) {

                let pos = this.container.getGlobalPosition();
                if (event.clientX >= pos.x &&
                    event.clientY >= pos.y &&
                    event.clientX <= (pos.x + this.container.width) &&
                    event.clientY <= (pos.y + this.container.height)) {

                    this.selected = true;
                    this.updateBackground();
                }
                else if (this.selected) {
                    this.selected = false;
                    this.updateBackground();
                }
            }
        });

        window.addEventListener("keyup", event => {
            let numKey = parseInt(event.key, 10);
            if (!this.gameNumber && this.selected) {
                console.log(numKey);
                if (numKey === 0 || numKey === this.number) {
                    this.clearNumber();
                }              
                else {
                    this.setNumber(numKey, false);
                }
            }
        });
    }

    initEventListeners() {
        this.on(TileEvent.NUMBER_CLEARED, () => {
            this.number = null;
            this.numberText.text = "";
        });
        this.on(TileEvent.NUMBER_SET, event => {
            this.number = event.number;
            this.gameNumber = event.gameNumber;

            if (this.numberText) {
                this.numberText.text = this.number;
            }
            if (this.gameNumber) {
                this.textStyle.fill = 0xFFFFFF;
            }
        });
    }

    render(container) {
        container.addChild(this.container);
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

    setNumber(number, gameNumber = false) {
        this.emit(TileEvent.NUMBER_SET, {
            number: number,
            gameNumber: gameNumber
        });
    }

    clearNumber() {
        this.emit(TileEvent.NUMBER_CLEARED);
    }

    setError(error) {
        this.error = error;
        this.updateBackground();
    }

    updateBackground() {
        if (this.error || this.selected) {
            this.background.alpha = 0.75;
        }
        else {
            this.background.alpha = 0;
        }
    }


}

export {
    Tile, TileBorder, TileEvent
}