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

        //  Set the camera and physics bounds to be the size of 4x4 bg images
        this.cameras.main.setBounds(0, 0, 2000, 500);
        this.physics.world.setBounds(0, 0, 2000, 500);

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
        )
        this.text.setOrigin(0.5)

        this.player = this.physics.add.sprite(200,200,'player').setScale(2).setOrigin(0.5)
        this.player.setCollideWorldBounds(true)
        this.player.setGravityY(1000)
        this.cameras.main.startFollow(this.player, false, 0.05, 0.05)

    }

    update() {

        if (this.right.isDown) {
            this.player.setVelocityX(600)
            this.player.flipX = false
        } else if (this.left.isDown) {
            this.player.setVelocityX(-600)
            this.player.flipX = true
        } else {
            this.player.setVelocityX(0)
        }
        
        // @ts-ignore
        if (this.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-700)            
        }

    }
}