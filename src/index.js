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


//Load up the cat
app.loader
    .add("cat", "assets/cat.png")
    .load((loader, resources) => {
        let catSprite = new PIXI.Sprite(resources.cat.texture);

        catSprite.anchor.set(0.5, 0.5);

        catSprite.x = app.view.width / 2;
        catSprite.y = app.view.height / 2;

        app.stage.addChild(catSprite);

        app.ticker.add(() => {
            catSprite.rotation += 0.02;
        });
    });
