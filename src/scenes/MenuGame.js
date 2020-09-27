export default class MenuGame extends Phaser.Scene {

    constructor() {
        super({key: 'MenuGame'})
    }

    init() {}
    preload() {}
    create() {

        const centerY =  Math.round(0.5 * this.sys.game.config.height)
        const centerX =  Math.round(0.5 * this.sys.game.config.width)

        this.text = this.add.text(
            centerX,
            centerY,
            'MENU',
            { font: '50px San Serif', fill: '#fff' }
        )
        this.text.setOrigin(0.5)

    }
    update() {}

}