import { Container, Resource, Sprite, Texture } from "pixi.js";
import { GameScene } from "../GameScene";

export class Pipes extends Container {
    private _gameScene: GameScene;
    private _topPipe: Sprite;
    private _bottomPipe: Sprite;
    private _passed: boolean = false;

    constructor(textures: ITextures, gameScene: GameScene) {
        super();
        this._gameScene = gameScene;

        this._topPipe = new Sprite(textures["pipe-top.png"]);
        this._bottomPipe = new Sprite(textures["pipe-bottom.png"]);
        this.compose();
    }

    public resetPosition(): void {
        this._topPipe.x = 1600;
        this._bottomPipe.x = 1600;
        this._topPipe.y = -300;
        this._bottomPipe.y = 700;
    }

    public update(delta: number): void {
        this._topPipe.x -= delta * 2;
        this._bottomPipe.x -= delta * 2;

        if (this._topPipe.x < 200 && !this._passed) {
            this._passed = true;
            this._gameScene.updateScoreByOne();
        }
    }

    private compose(): void {
        this.addChild(this._topPipe);
        this.addChild(this._bottomPipe);
        this.resetPosition();
        this.scale.set(0.5, 0.5);
    }
}

export interface ITextures {
    [name: string]: Texture<Resource>;
}
