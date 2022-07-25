import { Sprite, Texture } from "pixi.js";

export default class Bird extends Sprite {
  private keyPressed: boolean = false;
  private fallSpeed: number = 0.1;

  constructor(texture: Texture) {
    super(texture);
    this.scale.set(0.1, 0.1);
    this.resetBird();

    window.addEventListener("keydown", (e) => this.checkSpace(e));
    window.addEventListener("keyup", (e) => this.releaseSpace(e));
  }

  public resetBird(): void {
    this.fallSpeed = 0.1;
    this.x = 200;
    this.y = 20;
  }

  public updateBird(): void {
    this.fallSpeed += 0.15;
    this.y += this.fallSpeed;
    this.rotation = this.fallSpeed / 50;
  }

  private checkSpace(e: KeyboardEvent) {
    if (e.key === " " && !this.keyPressed) {
      this.fallSpeed = -7;
      this.keyPressed = true;
    }
  }

  private releaseSpace(e: KeyboardEvent) {
    if (e.key === " ") {
      this.keyPressed = false;
    }
  }
}
