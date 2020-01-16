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

/*eslint-disable max-lines-per-function */
/*eslint-disable max-statements */
function setup(loader, resources) {
    let catSprite = new PIXI.Sprite(resources.cat.texture);

    catSprite.anchor.set(0.5, 0.5);

    catSprite.x = app.view.width / 2;
    catSprite.y = app.view.height / 2;

    app.stage.addChild(catSprite);

    let down = new Key("ArrowDown"),
        left = new Key("ArrowLeft"),
        right = new Key("ArrowRight"),
        up = new Key("ArrowUp");

    catSprite.speed = 5;
    catSprite.vx = 0;
    catSprite.vy = 0;

    left.addListener((pressed) => {
        if (pressed) {
            catSprite.vx = -1 * catSprite.speed;
            console.log("LEFT PRESSED");
        }
        else {
            catSprite.vx = 0;
        }
    });

    right.addListener((pressed) => {
        if (pressed) {
            catSprite.vx = catSprite.speed;
        }
        else {
            catSprite.vx = 0;
        }
    });

    up.addListener((pressed) => {
        if (pressed) {
            catSprite.vy = -1 * catSprite.speed;
        }
        else {
            catSprite.vy = 0;
        }
    });

    down.addListener((pressed) => {
        if (pressed) {
            catSprite.vy = catSprite.speed;
        }
        else {
            catSprite.vy = 0;
        }
    });

    catSprite.tick = (delta) => {
        catSprite.x += catSprite.vx * delta;
        catSprite.y += catSprite.vy * delta;
    };

    app.ticker.add(catSprite.tick);
}

//Load up the cat
app.loader
    .add("cat", "assets/cat.png")
    .load(setup);

