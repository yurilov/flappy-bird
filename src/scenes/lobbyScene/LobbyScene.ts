import { Container, Loader, Sprite } from "pixi.js";
import TitleStyle from "../../utils/titleStyle/titleStyle";
import { IScene, SceneManager } from "../sceneManager/SceneManager";
import StartGameField from "./startGameField/StartGameField";

export default class LobbyScene extends Container implements IScene {
  startGameField: StartGameField;
  gameWidth: number;
  gameHeight: number;
  style: TitleStyle;
  protected manager: SceneManager;

  constructor(gameWidth: number, gameHeight: number, manager: SceneManager) {
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

  setup(): void {
    const textures =
      Loader.shared.resources["../../resources/environment.json"].textures;

    if (textures) {
      const backgroundTexture = textures["background.png"];
      const backgroundImg = new Sprite(backgroundTexture);
      this.addChild(backgroundImg);
    }

    this.addChild(this.startGameField);
  }
  update() {}
}
