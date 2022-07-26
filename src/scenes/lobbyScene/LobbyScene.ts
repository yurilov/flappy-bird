import { Container, Loader, Sprite } from "pixi.js";
import { TitleStyle } from "../../utils/titleStyle/titleStyle";
import { IScene, SceneManager } from "../sceneManager/SceneManager";
import { StartGameField } from "./startGameField/StartGameField";

export class LobbyScene extends Container implements IScene 
{
  private startGameField: StartGameField;
  private gameWidth: number;
  private gameHeight: number;
  private style: TitleStyle;
  protected manager: SceneManager;

  constructor(gameWidth: number, gameHeight: number, manager: SceneManager) 
  {
    super();
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.style = new TitleStyle(this.gameWidth);
    this.startGameField = new StartGameField(
      this.gameWidth,
      this.gameHeight,
      this.style
    );

    this.manager = manager;
    this.setup();
  }

  public update()
  { }

  private setup(): void 
  {
    const textures =
      Loader.shared.resources["../../resources/environment.json"].textures;

    if (textures) 
    {
      const backgroundTexture = textures["background.png"];
      const backgroundImg = new Sprite(backgroundTexture);
      this.addChild(backgroundImg);
    }

    this.addChild(this.startGameField);
  }
}
