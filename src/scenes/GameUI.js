import Phaser from 'phaser'

export default class GameUI extends Phaser.Scene {

    constructor() {
        super({key: 'GameUI'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
    }

    create() {
        this.add.rectangle(0, 500, this.scale.width, 300, 0x6666ff).setOrigin(0);
        this.add.rectangle()
    }
}