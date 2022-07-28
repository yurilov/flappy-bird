import { Container, Resource, Sprite, Texture } from "pixi.js";
import { GameScene } from "../GameScene";

export class Pipes extends Container {
    private _gameScene: GameScene;
    private _pipesSprites: Sprite[];
    private _textures: ITextures;
    private _timeStamp: number;
    private _passedPipesIndexes: number[];

    constructor(textures: ITextures, gameScene: GameScene) {
        super();
        this._textures = textures;
        this._gameScene = gameScene;
        this._pipesSprites = [];

        this._timeStamp = Date.now();
        this._passedPipesIndexes = [];
        this.compose();
    }

    public get timeStamp(): number {
        return this._timeStamp;
    }

    public set timeStamp(newStamp: number) {
        this._timeStamp = newStamp;
    }

    public get passedPipesIndexes(): number[] {
        return this._passedPipesIndexes;
    }

    public updatePassedPipesIndexes(passedPipeIndex: number): void {
        this.passedPipesIndexes.push(passedPipeIndex);
    }

    public get pipesSprites() {
        return this._pipesSprites;
    }

    public spawnPipesLine(): void {
        const topPipeY = randomInteger(-400, 0);
        const gap = 1000;
        const topPipe = new Sprite(this._textures["pipe-top.png"]);
        topPipe.x = 2000;
        topPipe.y = topPipeY;
        const bottomPipe = new Sprite(this._textures["pipe-bottom.png"]);
        bottomPipe.x = 2000;
        bottomPipe.y = topPipeY + gap;

        this.updatePipesSprites(topPipe, bottomPipe);
    }

    public update(delta: number): void {
        const currentTime = Date.now();
        const timePassed = currentTime - this.timeStamp;

        this._pipesSprites.forEach((pipe) => {
            pipe.x -= delta * 2;
        });

        this.checkIfBirdPassedPipeLine();

        if (timePassed >= 5000) {
            this.spawnPipesLine();
            this.timeStamp = currentTime;
        }
    }

    public onGameEnd(): void {
        const numberOfChildren = this.children.length;
        this._pipesSprites = [];
        this.removeChildren(0, numberOfChildren);
    }

    public onGameRestart(): void {
        this.spawnPipesLine();
    }

    private checkIfBirdPassedPipeLine(): void {
        const pipesSprites = this.pipesSprites;

        for (let index = 0; index < pipesSprites.length; index += 2) {
            const pipe = pipesSprites[index];

            if (pipe.x <= 200 && !this.passedPipesIndexes.includes(index)) {
                this._gameScene.updateScoreByOne();
                this.updatePassedPipesIndexes(index);
            }
        }
    }

    private updatePipesSprites(topPipe: Sprite, bottomPipe: Sprite): void {
        this._pipesSprites.push(topPipe, bottomPipe);
        this.addChild(topPipe, bottomPipe);
    }

    private compose(): void {
        this.scale.set(0.5, 0.5);
        this.spawnPipesLine();
    }
}

export interface ITextures {
    [name: string]: Texture<Resource>;
}

function randomInteger(min: number, max: number): number {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
