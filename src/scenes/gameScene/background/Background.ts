import { TilingSprite, Texture } from "pixi.js";

export class Background extends TilingSprite {
    constructor(texture: Texture, width: number, height: number) {
        super(texture, width, height);
    }

    public update(delta: number): void {
        this.tilePosition.x -= delta * 0.3;
    }
}
