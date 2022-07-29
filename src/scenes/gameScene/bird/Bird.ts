import { AnimatedSprite, Texture } from "pixi.js";

export class Bird extends AnimatedSprite {
    private _keyPressed: boolean;
    private _fallSpeed: number;

    constructor(textures: Texture[]) {
        super(textures);

        this._keyPressed = false;
        this._fallSpeed = 0.1;
        this.scale.set(0.1, 0.1);
        this.resetBird();
        this.animationSpeed = 0.1;
    }

    public resetBird(): void {
        this._fallSpeed = 0.1;
        this.x = 200;
        this.y = 20;
        this.addListenerToWindow();
    }

    public updateBird(): void {
        this._fallSpeed += 0.15;
        this.y += this._fallSpeed;
        this.rotation = this._fallSpeed / 50;
        this.play();
    }

    public addListenerToWindow(): void {
        window.addEventListener("keydown", this.checkSpace);
        window.addEventListener("keyup", this.releaseSpace);
    }

    public removeListenerFromWindow(): void {
        window.removeEventListener("keydown", this.checkSpace);
        window.removeEventListener("keyup", this.releaseSpace);
    }

    private releaseSpace = (e: KeyboardEvent):void => {
        if (e.key === " ") {
            this.animationSpeed = 0.1;
            this._keyPressed = false;
        }
    };

    private checkSpace = (e: KeyboardEvent):void => {
        if (e.key === " " && !this._keyPressed) {
            this._fallSpeed = -3;
            this.animationSpeed = 0.3;
            this._keyPressed = true;
        }
    };
}
