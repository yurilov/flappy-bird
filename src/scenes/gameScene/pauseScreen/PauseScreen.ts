import { Container, TextStyle, Text } from "pixi.js";
import { GameScene } from "../GameScene";

export class PauseScreen extends Container
{
	private _pauseMessage: Text;
	private _gameScene: GameScene;

	constructor(gameScene: GameScene)
	{
		super();
		this._gameScene = gameScene;

		const titleStyle = new TextStyle({
			fontFamily: "Roboto",
			fontSize: 55,
			align: "center",
			fontWeight: "bold",
			fill: [ "#4F455D" ],
			wordWrap: true,
			wordWrapWidth: 400,
		});

		this._pauseMessage = new Text("Paused", titleStyle);
		this._pauseMessage.x =
			this._gameScene.gameWidth / 2 - this._pauseMessage.width / 2;
		this._pauseMessage.y =
			this._gameScene.gameHeight / 2 - this._pauseMessage.height / 2;

		this.addChild(this._pauseMessage);
	}
}
