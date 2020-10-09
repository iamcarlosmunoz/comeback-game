import Phaser from 'phaser'

export default class Bootloader extends Phaser.Scene {

    constructor() {
        super({key: 'Bootloader', active: true})
    }

    preload() {
        // Logos
        this.load.path = 'images/'
        this.load.image('logo_phaser', 'logos/phaser.png')
        this.load.image('logo_bestcresw', 'logos/bestcrew-studios.png')
        this.load.image('btn_fullscreen', 'icons/maximize.png')
        this.load.image('player', 'sprites/bird.png')

        // Instructions
        this.load.spritesheet('right', 'sprites/instructions/right.png',{ frameWidth: 254, frameHeight: 62 })
        this.load.spritesheet('jump', 'sprites/instructions/jump.png',{ frameWidth: 254, frameHeight: 62 })
        this.load.spritesheet('left', 'sprites/instructions/left.png',{ frameWidth: 254, frameHeight: 62 })
        this.load.image('instructions_panel', 'sprites/instructions/panel.png')
        this.load.spritesheet('btn_run', 'sprites/instructions/btn_run.png',{ frameWidth: 146, frameHeight: 146 })
        this.load.spritesheet('action_light', 'sprites/instructions/action_light.png',{ frameWidth: 40, frameHeight: 40 })

        // Status bar
        this.load.image('status_main','sprites/status/main.png')

        // Background
        this.load.image('background', 'sprites/background/background.png')
        this.load.image('stars', 'sprites/background/stars.png')
        this.load.image('wall', 'sprites/background/wall.png')
        this.load.image('pipeline', 'sprites/background/pipeline.png')
        this.load.image('floor', 'sprites/background/floor.png')
        this.load.image('curve', 'sprites/background/curve.png')
        this.load.image('fog', 'sprites/background/fog.png')
        this.load.image('light', 'sprites/background/light.png')
        this.load.image('lamp', 'sprites/background/lamp.png')

        // Obstacles
        this.load.image('obstacle_001', 'sprites/obstacles/001.png')
        
        // Player
        this.load.atlas('astronaut', 'sprites/astronaut/astronaut.png', 'sprites/astronaut/astronaut_atlas.json')
        this.load.json('astronaut_anim', 'sprites/astronaut/astronaut_anim.json')

        this.load.on('complete', () => {
            // this.scene.start('IntroGame')
            this.scene.start('Transition', { nextScene: 'Game'})
        })
    }
}