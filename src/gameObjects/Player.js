import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, type, scale, cameras) {
        super(scene, x, y, type)

        // Add Sprite 
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // set Properties
        this.setScale(scale)
        this.setOrigin(0.5)
        this.setCollideWorldBounds(true)
        this.setGravityY(1000)

        cameras.main.startFollow(this, false, 0.05, 0.05)

    }


    move(direction) {
        switch(direction) {
            case 'right':
                this.setVelocityX(600)
                this.flipX = false
                break
            case 'left':
                this.setVelocityX(-600)
                this.flipX = true
                break
            case 'jump':
                this.setVelocityY(-700)
                break
            default:
                this.setVelocityX(0)
                break
        }
    }
}