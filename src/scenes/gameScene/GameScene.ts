import { Container, Loader, Sprite, Texture } from "pixi.js";
import { SceneManager, IScene } from "../sceneManager/SceneManager";
import { Background } from "./background/Background";
import { Bird } from "./bird/Bird";
import { Pipes } from "./pipes/Pipes";
import { UI } from "./ui/UI";
import birdAtlas from "../../resources/bird.json";
import { PauseScreen } from "./pauseScreen/PauseScreen";

export class GameScene extends Container implements IScene {
    private _gameWidth: number;
    private _gameHeight: number;
    private _ui: UI;
    private _background: Background;
    private _bird: Bird;
    private _pipes: Pipes;
    private _paused: boolean;
    private _pauseScreen: PauseScreen;
    protected _manager: SceneManager;

    constructor(manager: SceneManager, gameWidth: number, gameHeight: number) {
        super();
        this._gameWidth = gameWidth;
        this._gameHeight = gameHeight;
        this._paused = false;

        const envTextures = Loader.shared.resources["environment"].textures!;

        const bcgTexture = envTextures["background.png"];
        this._background = new Background(
            bcgTexture,
            this.gameWidth,
            this.gameHeight
        );

        const birdTextures = this.getBirdTextures();
        this._bird = new Bird(birdTextures);

        this._pipes = new Pipes(envTextures, this);

        this._ui = new UI(this);

        this._pauseScreen = new PauseScreen(this);

        this.compose();

        window.addEventListener("keydown", this.handleEscape);

        this._manager = manager;
    }

    public get gameWidth(): number {
        return this._gameWidth;
    }

    public get gameHeight(): number {
        return this._gameHeight;
    }

    public get paused(): boolean {
        return this._paused;
    }

    public set paused(newValue: boolean) {
        this._paused = newValue;
    }

    public update(delta: number): void {
        this._background.update(delta);
        this._bird.updateBird();
        this._pipes.update(delta);
        this.onBirdCollision();
    }

    public updateScoreByOne() {
        const currentScore = this._ui.score;
        this._ui.updateScore(currentScore + 1);
    }

    private compose(): void {
        this.addChild(this._background);
        this.addChild(this._bird);
        this.addChild(this._pipes);
        this.addChild(this._ui);
    }

    private onBirdCollision(): void {
        const pipes = this._pipes.pipesSprites;

        for (let i = 0; i < pipes.length; i++) {
            const bird = this._bird;
            const damaged =
                this.checkCollision(bird, pipes[i]) ||
                this.checkIfBirdOutOfScene();

            if (damaged) {
                SceneManager.stop();
                this._bird.removeListenerFromWindow();
                this._ui.showLoseScreen();
                this._pipes.onGameEnd();
                window.removeEventListener("keydown", this.handleEscape);

                //added timeout to be able to see the loseScreen if user still clicking spacebar
                setTimeout(() => {
                    window.addEventListener("keydown", this.restartGame);
                }, 1000);
            }
        }
    }

    private restartGame = (e: KeyboardEvent): void => {
        if (e.key === " ") {
            SceneManager.start();
            this._bird.resetBird();
            this._ui.onGameRestart();
            window.removeEventListener("keydown", this.restartGame);
            window.addEventListener("keydown", this.handleEscape);
        }
    };

    private handleEscape = (e: KeyboardEvent): void => {
        if (e.code === "Escape") {
            if (!this.paused) {
                SceneManager.stop();
                this.paused = true;
            } else {
                SceneManager.start();
                this._pipes.timeStamp = Date.now();
                this.paused = false;
            }
        }
    };

    private checkCollision(firstObj: Sprite, secondObj: Sprite): boolean {
        const firstObjBounds = firstObj.getBounds();
        const secondObjBounds = secondObj.getBounds();

        return firstObjBounds.intersects(secondObjBounds);
    }

    private checkIfBirdOutOfScene(): boolean {
        const birdPositionY = this._bird.y;

        if (birdPositionY >= this.gameHeight || birdPositionY <= 0) return true;

        return false;
    }

    private getBirdTextures(): Texture[] {
        const birdSheet = Loader.shared.resources["bird"].textures!;

        const animationFrames = birdAtlas.animations.frame;

        let birdTextures = [];

        for (let i = 0; i < animationFrames.length; i++) {
            const texture = birdSheet[animationFrames[i]];
            birdTextures.push(texture);
        }

        return birdTextures;
    }
}
