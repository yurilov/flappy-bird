import { config } from "./config/config";
import { LoaderScene } from "./scenes/loaderScene/LoaderScene";
import { SceneManager } from "./scenes/sceneManager/SceneManager";
const { gameHeight, gameWidth, backgroundColor } = config;

SceneManager.initialize(gameWidth, gameHeight, backgroundColor);
SceneManager.changeScene(new LoaderScene(SceneManager));
