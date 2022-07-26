import { Container, Loader } from "pixi.js";
import { SceneManager, IScene } from "../sceneManager/SceneManager";
import { Background } from "./background/Background";
import { Bird } from "./bird/Bird";
import { Pipes } from "./pipes/Pipes";
import { UI } from "./ui/UI";

export class GameScene extends Container implements IScene {
    private _background: Background;
    private _manager: SceneManager;
    public gameWidth: number;
    public gameHeight: number;
    private _bird: Bird;
    private _pipes: Pipes;
    public ui: UI;

    constructor(manager: SceneManager, gameWidth: number, gameHeight: number) {
        super();
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        const envTextures =
            Loader.shared.resources["../../resources/environment.json"]
                .textures!;

        const bcgTexture = envTextures["background.png"];
        this._background = new Background(
            bcgTexture,
            this.gameWidth,
            this.gameHeight
        );

        const birdSheet =
            Loader.shared.resources["../../resources/bird.json"].textures!;
        this._bird = new Bird(birdSheet["frame-1.png"]);

        this._pipes = new Pipes(envTextures, this);

        this.ui = new UI(this);
        this.compose();
        this._manager = manager;
    }

    public update(delta: number): void {
        this._background.update(delta);
        this._bird.updateBird();
        this._pipes.update(delta);
    }

    private compose(): void {
        this.addChild(this._background);
        this.addChild(this._bird);
        this.addChild(this._pipes);
        this.addChild(this.ui);
    }
}
