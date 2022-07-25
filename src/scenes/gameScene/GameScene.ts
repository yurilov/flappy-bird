import { Container, Loader } from "pixi.js";
import SceneManager, { IScene } from "../sceneManager/SceneManager";
import Background from "./background/Background";

export default class GameScene extends Container implements IScene{
    background: Background;
    manager: SceneManager;
    gameWidth: number;
    gameHeight: number;

    constructor(
        manager: SceneManager,
        gameWidth: number,
        gameHeight: number) {
        
        super();
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        const bcgTexture = Loader.shared.resources["../../resources/environment.json"].textures!["background.png"]
        this.background = new Background(bcgTexture, gameWidth, gameHeight);
        this.addChild(this.background);
        this.manager = manager;
    }

    public update(delta:number):void {
        this.background.update(delta);
    }
}