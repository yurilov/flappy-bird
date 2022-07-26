import { Container, Graphics, Loader } from "pixi.js";
import { IScene, SceneManager } from "../sceneManager/SceneManager";

// import LobbyScene from "../lobbyScene/LobbyScene"; // will replace GameScene after fix with start game field
import { GameScene } from "../gameScene/GameScene";

export class LoaderScene extends Container implements IScene {
    private _loaderBar: Container;
    private _loaderBarBorder: Graphics;
    private _loaderBarFill: Graphics;

    constructor() {
        super();

        const loaderBarWidth = SceneManager.width * 0.8;

        this._loaderBarFill = new Graphics();
        this._loaderBarFill.beginFill(0x008800, 1);
        this._loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this._loaderBarFill.endFill();
        this._loaderBarFill.scale.x = 0;

        this._loaderBarBorder = new Graphics();
        this._loaderBarBorder.lineStyle(10, 0x0, 1);
        this._loaderBarBorder.drawRect(0, 0, loaderBarWidth, 50);

        this._loaderBar = new Container();
        this._loaderBar.addChild(this._loaderBarFill);
        this._loaderBar.addChild(this._loaderBarBorder);
        this._loaderBar.position.x =
            (SceneManager.width - this._loaderBar.width) / 2;
        this._loaderBar.position.y =
            (SceneManager.height - this._loaderBar.height) / 2;
        this.addChild(this._loaderBar);

        Loader.shared
            .add("../../resources/bird.json")
            .add("../../resources/environment.json");

        Loader.shared.onProgress.add(this.downloadProgress, this);
        Loader.shared.onComplete.once(this.gameLoaded, this);

        Loader.shared.load();
    }

    private downloadProgress(loader: Loader): void {
        const progressRatio = loader.progress / 100;
        this._loaderBarFill.scale.x = progressRatio;
    }

    private gameLoaded(): void {
        SceneManager.changeScene(
            new GameScene(SceneManager, SceneManager.width, SceneManager.height)
            // new LobbyScene(SceneManager.width, SceneManager.height, SceneManager) // will replace GameScene after fix with start game field
        );
    }

    public update(framesPassed: number): void {
        framesPassed;
    }
}
