import Phaser from 'phaser'

export default class MenuGame extends Phaser.Scene {

    constructor() {
        super({key: 'MenuGame'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
    }
    
    preload() {}

    create() {

        this.text = this.add.text(
            this.centerX,
            this.centerY,
            'MENU',
            { font: '50px San Serif', fill: '#fff' }
        )
        this.text.setOrigin(0.5)

    }
    update() {}

}