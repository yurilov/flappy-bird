import { AnimatedSprite, Texture } from "pixi.js";

export class Bird extends AnimatedSprite {
    private _keyPressed: boolean = false;
    private _fallSpeed: number = 0.1;

    constructor(textures: Texture[]) {
        super(textures);
        this.scale.set(0.1, 0.1);
        this.resetBird();
        this.animationSpeed = 0.1;

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
        this.play();
    }

    private releaseSpace(e: KeyboardEvent) {
        if (e.key === " ") {
            this._keyPressed = false;
        }
    }

    private checkSpace(e: KeyboardEvent) {
        if (e.key === " " && !this._keyPressed) {
            this._fallSpeed = -4;
            this._keyPressed = true;
        }
    }
}
