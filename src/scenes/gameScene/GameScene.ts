import { Container, Loader } from "pixi.js";
import SceneManager, { IScene } from "../sceneManager/SceneManager";
import Background from "./background/Background";
import Bird from "./bird/Bird";
import Pipes from "./pipes/Pipes";

export default class GameScene extends Container implements IScene {
  background: Background;
  manager: SceneManager;
  gameWidth: number;
  gameHeight: number;
  bird: Bird;
  pipes: Pipes;
  score: number = 0;

  constructor(manager: SceneManager, gameWidth: number, gameHeight: number) {
    super();
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    const envTextures =
      Loader.shared.resources["../../resources/environment.json"].textures!;

    const bcgTexture = envTextures["background.png"];
    this.background = new Background(bcgTexture, gameWidth, gameHeight);

    const birdSheet =
      Loader.shared.resources["../../resources/bird.json"].textures!;
    this.bird = new Bird(birdSheet["frame-1.png"]);

    this.pipes = new Pipes(envTextures);

    this.compose();
    this.manager = manager;
  }

  public update(delta: number): void {
    this.background.update(delta);
    this.bird.updateBird();
  }

  private compose(): void {
    this.addChild(this.background);
    this.addChild(this.bird);
    this.addChild(this.pipes);
  }

  public updateScore(newScore: number) {
    this.score = newScore;
  }
}
