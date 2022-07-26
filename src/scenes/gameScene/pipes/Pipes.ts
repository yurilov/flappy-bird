import { futimes } from "fs";
import { Container, Resource, Sprite, Texture } from "pixi.js";
import { GameScene } from "../GameScene";

export class Pipes extends Container {
    private _gameScene: GameScene;
    private _topPipe: Sprite;
    private _bottomPipe: Sprite;
    private _passed: boolean;
    private _pipesSprites: Sprite[];
    private _textures: ITextures;

    constructor(textures: ITextures, gameScene: GameScene) {
        super();
        this._textures = textures;
        this._gameScene = gameScene;
        this._passed = false;
        this._pipesSprites = [];
        this._topPipe = new Sprite(textures["pipe-top.png"]);
        this._bottomPipe = new Sprite(textures["pipe-bottom.png"]);
        this.updatePipesSprites(this._topPipe, this._bottomPipe);
        this.compose();
    }

    public resetPosition(): void {
        this._topPipe.x = 1600;
        this._bottomPipe.x = 1600;
        this._topPipe.y = -300;
        this._bottomPipe.y = 700;
    }

    public get pipesSprites() {
        return this._pipesSprites;
    }

    public spawnPipesLine(): void {
        const topPipeY = randomInteger(-400, 100);
        const gap = 1000;
        const topPipe = new Sprite(this._textures["pipe-top.png"]);
        topPipe.x = 1600;
        topPipe.y = topPipeY;
        const bottomPipe = new Sprite(this._textures["pipe-bottom.png"]);
        bottomPipe.x = 1600;
        bottomPipe.y = topPipeY + gap;

        this.updatePipesSprites(topPipe, bottomPipe);
    }

    public update(delta: number): void {
        this._topPipe.x -= delta * 2;
        this._bottomPipe.x -= delta * 2;

        if (this._topPipe.x < 200 && !this._passed) {
            this._passed = true;
            this._gameScene.updateScoreByOne();
        }

        if (this._topPipe.x % 300 === 0) {
            this.spawnPipesLine();
        }
    }

    private updatePipesSprites(topPipe: Sprite, bottomPipe: Sprite) {
        this._pipesSprites.push(topPipe, bottomPipe);
        this.addChild(topPipe, bottomPipe);
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

function randomInteger(min: number, max: number): number {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
