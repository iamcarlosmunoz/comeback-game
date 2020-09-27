import Phaser from 'phaser'
import IntroGame from './scenes/IntroGame'
import MenuGame from './scenes/MenuGame'

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
    ulr: 'https://github.com/iamcarlosmunoz/comeback-game',
    version: '0.0.1',
    width: 1366,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: scenes,
    pixelArt: false,
    backgroundColor: "#000",
    banner: {
        hidePhaser: false,
        text: '#ffffff',
        background: [
            '#4068ff',
            '#222223',            
            '#0279ff',
            '#0202ff',
            '#30345f'
        ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
}

// Create game app
export default new Phaser.Game(config);