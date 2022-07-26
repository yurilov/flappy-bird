import { Container, Text, TextStyle } from "pixi.js";
import { GameScene } from "../GameScene";

export class UI extends Container {
    private readonly LOCAL_KEY: string = "hiScore";
    private _score: number = 0;
    private _highestScore: number = this.getHighestScore();
    private _scoreField: Text;
    private _highestScoreField: Text;
    private _loseMessageField: Text;
    private _gameScene: GameScene;

    constructor(gameScene: GameScene) {
        super();

        this._gameScene = gameScene;
        const style = new TextStyle({
            fontFamily: "Roboto",
            fontSize: 26,
            fontWeight: "bold",
            fill: ["#4F455D"],
        });

        this._scoreField = new Text("Score: 0", style);
        this._scoreField.x = 10;
        this._scoreField.y = 10;

        this._highestScoreField = new Text(
            `Highest score : ${this._highestScore}`,
            style
        );
        this._highestScoreField.x =
            this._gameScene.gameWidth - this._highestScoreField.width - 10;
        this._highestScoreField.y = 10;

        const loseFieldStyle = new TextStyle({
            fontFamily: "Roboto",
            fontSize: 55,
            align: "center",
            fontWeight: "bold",
            fill: ["#4F455D "],
            wordWrap: true,
            wordWrapWidth: 400,
        });

        this._loseMessageField = new Text(
            "GAME OVER press spacebar to restart the game",
            loseFieldStyle
        );
        this._loseMessageField.x =
            this._gameScene.gameWidth / 2 - this._loseMessageField.width / 2;
        this._loseMessageField.y =
            this._gameScene.gameHeight / 2 - this._loseMessageField.height / 2;

        this.compose();
    }

    private compose(): void {
        this.addChild(this._scoreField);
        this.addChild(this._highestScoreField);
        this.addChild(this._loseMessageField);
    }

    public getScore(): number {
        return this._score;
    }

    public updateScore(newScore: number): void {
        this._score = newScore;
        this._scoreField.text = `Score: ${this._score}`;
    }

    public showLoseScreen(): void {
        if (this._score > this._highestScore) {
            this._highestScore = this._score;
            this.setHighestScore(this._highestScore);
        }

        this.addChild(this._loseMessageField);
    }

    public onGameRestart(): void {
        this.updateScore(0);
        this.removeChild(this._loseMessageField);
    }

    public getHighestScore(): number {
        const localData = localStorage.getItem(this.LOCAL_KEY);

        if (!localData) return 0;

        return Number(JSON.parse(localData));
    }

    public setHighestScore(newRecord: number): void {
        localStorage.setItem(this.LOCAL_KEY, newRecord.toString());
    }
}
