import { Container, Resource, Sprite, Texture } from "pixi.js";
// import GameScene from "../GameScene";

export default class Pipes extends Container {
  //   private gameScene: GameScene;
  private topPipe: Sprite;
  private bottomPipe: Sprite;
  // private passed: bollean = false;

  constructor(textures: ITextures) {
    super();
    // this.gameScene = gameScene;

    this.topPipe = new Sprite(textures["pipe-top.png"]);
    this.bottomPipe = new Sprite(textures["pipe-bottom.png"]);
    this.compose();
  }

  private compose(): void {
    this.addChild(this.topPipe);
    this.addChild(this.bottomPipe);
    this.resetPosition();
    this.scale.set(0.5, 0.5);
  }

  public resetPosition(): void {
    // let randomY = Math.random() * 250 - 200;
    this.topPipe.x = 1600;
    this.bottomPipe.x = 1600;
    this.topPipe.y = -300;
    this.bottomPipe.y = 700;
  }

  public update(): void {}
}

export interface ITextures {
  [name: string]: Texture<Resource>;
}
