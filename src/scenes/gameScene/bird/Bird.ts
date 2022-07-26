import { Sprite, Texture } from "pixi.js";

export class Bird extends Sprite {
    private _keyPressed: boolean = false;
    private _fallSpeed: number = 0.1;

    constructor(texture: Texture) {
        super(texture);
        this.scale.set(0.1, 0.1);
        this.resetBird();

        window.addEventListener("keydown", (e) => this.checkSpace(e));
        window.addEventListener("keyup", (e) => this.releaseSpace(e));
    }

    public resetBird(): void {
        this._fallSpeed = 0.1;
        this.x = 200;
        this.y = 20;
    }

    public updateBird(): void {
        this._fallSpeed += 0.15;
        this.y += this._fallSpeed;
        this.rotation = this._fallSpeed / 50;
    }

    private releaseSpace(e: KeyboardEvent) {
        if (e.key === " ") {
            this._keyPressed = false;
        }
    }

    private checkSpace(e: KeyboardEvent) {
        if (e.key === " " && !this._keyPressed) {
            this._fallSpeed = -7;
            this._keyPressed = true;
        }
    }
}
