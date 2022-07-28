import { SceneManager } from "./scenes/sceneManager/SceneManager";
import { LoaderScene } from "./scenes/loaderScene/LoaderScene";

const gameWidth = 1000;
const gameHeight = 600;

SceneManager.initialize(gameWidth, gameHeight, 0xcc6b8e);

const loaderScene: LoaderScene = new LoaderScene();
SceneManager.changeScene(loaderScene);
