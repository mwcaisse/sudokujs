import * as PIXI from "pixi.js"

let app = new PIXI.Application({
    width: 1024,
    height: 1024,
    antialias: true
});

document.body.appendChild(app.view);
