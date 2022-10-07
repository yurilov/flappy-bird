import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";

export class SceneManager
{
	private static _app: Application;
	private static _currentScene: IScene;
	private static _width: number;
	private static _height: number;

	public static get width(): number
	{
		return SceneManager._width;
	}

	public static get height(): number
	{
		return SceneManager._height;
	}

	public static initialize(
		width: number,
		height: number,
		background: number
	): void
	{
		SceneManager._width = width;
		SceneManager._height = height;

		SceneManager._app = new Application({
			view: document.querySelector("canvas") as HTMLCanvasElement,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: background,
			width: width,
			height: height,
		});

		SceneManager._app.ticker.add(SceneManager.update);
	}

	public static changeScene(newScene: IScene): void
	{
		if (SceneManager._currentScene)
		{
			SceneManager._app.stage.removeChild(SceneManager._currentScene);
			SceneManager._currentScene.destroy();
		}

		SceneManager._currentScene = newScene;
		SceneManager._app.stage.addChild(SceneManager._currentScene);
	}

	public static stop(): void
	{
		SceneManager._app.stop();
	}

	public static start(): void
	{
		SceneManager._app.start();
	}

	private static update(framesPassed: number): void
	{
		if (SceneManager._currentScene)
		{
			SceneManager._currentScene.update(framesPassed);
		}
	}
}

export interface IScene extends DisplayObject
{
	update(framesPassed: number): void;
}
