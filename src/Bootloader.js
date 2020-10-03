import Phaser from 'phaser'

export default class Bootloader extends Phaser.Scene {

    constructor() {
        super({key: 'Bootloader', active: true})
    }

    preload() {
        this.load.path = 'images/'
        this.load.image('logo_phaser', 'logos/phaser.png')
        this.load.image('logo_bestcresw', 'logos/bestcrew-studios.png')
        this.load.image('btn_fullscreen', 'icons/maximize.png')
        this.load.image('player', 'sprites/bird.png')

        // Intrucciones
        this.load.spritesheet('right', 'sprites/instructions/right.png',{ frameWidth: 254, frameHeight: 62 })
        this.load.spritesheet('jump', 'sprites/instructions/jump.png',{ frameWidth: 254, frameHeight: 62 })
        this.load.spritesheet('left', 'sprites/instructions/left.png',{ frameWidth: 254, frameHeight: 62 })
        this.load.image('instructions_panel', 'sprites/instructions/panel.png')
        this.load.spritesheet('btn_run', 'sprites/instructions/btn_run.png',{ frameWidth: 146, frameHeight: 146 })

        //barra estado
        this.load.image('status_main','sprites/status/main.png')

        this.load.on('complete', () => {
            this.scene.start('Game')
        })
    }
}