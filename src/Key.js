
class Key {

    constructor(keyCode) {
        this.keyCode = keyCode;

        this.listeners = []

        this.pressed = false;

        this.init();
    }

    init() {
        window.addEventListener("keydown", this.pressHandler.bind(this), false);
        window.addEventListener("keyup", this.releaseHandler.bind(this), false);
    }

    destroy() {
        window.removeEventListener("keydown", this.pressHandler);
        window.removeEventListener("keyup", this.releaseHandler);
    }

    pressHandler(event) {
        console.log("key pressed: " + event.key);
        if (event.key === this.keyCode) {
            if (!this.pressed) {
                this.pressed = true
                this.notify();
            }
            event.preventDefault();
        }
    }

    releaseHandler(event) {
        if (event.key === this.keyCode) {
            if (this.pressed) {
                this.pressed = false;
                this.notify();
            }
            event.preventDefault();
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        let index = this.listeners.indexOf(listener);
        if (index >=0) {
            this.listeners.splice(index, 1)
        }
    }

    notify() {
        this.listeners.forEach(e => e(this.pressed))
    }
}

export default Key