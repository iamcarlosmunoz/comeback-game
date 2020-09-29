import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

    constructor() {
        super({key: 'Game'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
    }

    create() {
        this.scene.run('GameUI')

        // Create Texto
        this.text = this.add.text(
            this.centerX,
            260,
            'GAMEPLAY',
            { font: '70px San Serif', fill: '#fff' }
        )
        this.text.setOrigin(0.5)
    }
}