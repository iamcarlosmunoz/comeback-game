import Phaser from 'phaser'
import IntroGame from './scenes/IntroGame'
import MenuGame from './scenes/MenuGame'

export const App = function () {

    this.VERSION = '0.0.1';
    this.IS_DEV = true;
    this.WIDTH = 1366;
    this.HEIGHT = 768;
    this.URL = 'https://github.com/iamcarlosmunoz/comeback-game'

}

App.prototype.start = function() {

    // Scenes
    let scenes = [
        IntroGame,
        MenuGame
    ];

    // Game config
    const config = {
        type: Phaser.AUTO,
        parent: 'output',
        title: '>_COMEBACK',
        ulr: this.URL,
        version: this.VERSION,
        width: this.WIDTH,
        height: this.HEIGHT,
        scene: scenes,
        pixelArt: false,
        backgroundColor: "#000",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        }
    }

    // Create game app
    let game = new Phaser.Game(config);

    // centerY: Math.round(0.5 * this.HEIGHT),
}