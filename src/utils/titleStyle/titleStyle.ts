import { TextStyle } from "pixi.js";

export class TitleStyle extends TextStyle
{
  constructor(gameWidth: number)
  {
    super({
      fontFamily: "Roboto",
      fill: "#FFFFFF",
      fontSize: 36,
      wordWrap: true,
      wordWrapWidth: gameWidth / 2 - 100,
    });
  }
}
