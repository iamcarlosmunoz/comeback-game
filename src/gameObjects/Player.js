import Phaser from 'phaser'

let timeOne, timeTwo, timeThree

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

    movePlayer(dropZones, instructions, lights) {

        let action = dropZones[0].data.get('action')
        let action2 = dropZones[1].data.get('action')
        let action3 = dropZones[2].data.get('action')

        if (action === 'right' && action2 === '' && action3 === '') {
            // Move Player
            this.move('right')
            // Turn on indicators
            instructions[0].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move('');  instructions[0].setFrame(0); lights[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { lights[1].setFrame(0); lights[2].setFrame(1) }, 2000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === 'left' && action2 === '' && action3 === '') {
            // Move Player
            this.move('left')
            // Turn on indicators
            instructions[1].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move('');  instructions[1].setFrame(0); lights[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { lights[1].setFrame(0); lights[2].setFrame(1) }, 2000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === 'right' && action2 === 'jump' && action3 === '') {
            // Move Player
            this.move('right')
            this.move('jump')
            // Turn on indicators
            instructions[0].setFrame(1)
            instructions[2].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { instructions[0].setFrame(0) }, 500)
            timeTwo = setTimeout(() => { this.move(''); instructions[2].setFrame(0) ; lights[2].setFrame(1) }, 1000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === 'left' && action2 === 'jump' && action3 === '') {
            // Move Player
            this.move('left')
            this.move('jump')
            // Turn on indicators
            instructions[1].setFrame(1)
            instructions[2].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { instructions[1].setFrame(0) }, 500)
            timeTwo = setTimeout(() => { this.move(''); instructions[2].setFrame(0) ; lights[2].setFrame(1) }, 1000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        }
    }

    stopTimerPlayer(){
        clearTimeout(timeOne)
        clearTimeout(timeTwo)
        clearTimeout(timeThree)
    }
}