import Phaser from 'phaser'

import Player from '../gameObjects/Player'

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

        //  Set the camera and physics bounds 
        this.cameras.main.setBounds(0, 0, 2000, 500);
        this.physics.world.setBounds(0, 0, 2000, 500);

        // Controls
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

        this.add.rectangle(0, 0, 2000,500, 0xff4242).setOrigin(0)

        // Create Texto
        this.text = this.add.text(
            this.centerX,
            260,
            'GAMEPLAY',
            { font: '70px San Serif', fill: '#fff' }
        ).setOrigin(0.5)

        this.astronaut = new Player(this, 200, 200, 'player',2, this.cameras)


    }

    update() {

        if (this.right.isDown) {
            this.astronaut.move('right')
        } else if (this.left.isDown) {
            this.astronaut.move('left')
        } else {
            this.astronaut.move('')
        }
        
        // @ts-ignore
        if (this.up.isDown && this.astronaut.body.onFloor()) {
            this.astronaut.move('up')          
        }

    }
}