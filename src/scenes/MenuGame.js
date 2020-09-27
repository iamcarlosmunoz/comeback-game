import Phaser from 'phaser'

export default class MenuGame extends Phaser.Scene {

    constructor() {
        super({key: 'MenuGame'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
    }

    create() {

        // Create Texto
        this.text = this.add.text(
            this.centerX,
            this.centerY,
            'MENU',
            { font: '50px San Serif', fill: '#fff' }
        )
        this.text.setOrigin(0.5)

        // Create btn_fullscreen
        this.btn_fullscreen = this.add.image(100,100,'btn_fullscreen').setScale(0.3)

        this.btn_fullscreen.setInteractive().on('pointerdown', function() {

            if (this.scale.isFullscreen)
            {
                this.scale.stopFullscreen();
            }
            else
            {
                this.scale.startFullscreen();
            }

        }, this);
    }
    update() {}

}