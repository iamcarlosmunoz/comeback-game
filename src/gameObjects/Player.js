import Phaser from 'phaser'

let timeOne, timeTwo, timeThree, timeFour

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
        this.body.setSize(40, 110)
        this.body.setOffset(50,10)

        // set Anims Player
        scene.dataAnim = scene.cache.json.get('astronaut_anim')
        scene.anims.fromJSON(scene.dataAnim)
        this.anims.play('idle')

        cameras.startFollow(this, false, 0.05, 0.05)

    }

    move(direction) {
        switch(direction) {
            case 'right':
                this.anims.play('walk')
                this.setVelocityX(400)
                this.flipX = false
                break
            case 'left':
                this.anims.play('walk')
                this.setVelocityX(-400)
                this.flipX = true
                break
            case 'jump':
                this.anims.play('jump')
                this.setVelocityY(-800)
                break
            default:
                this.anims.play('idle')
                this.setVelocityX(0)
                break
        }
    }

    movePlayer(dropZones, instructions, lights) {

        let action = dropZones[0].data.get('action')
        let action2 = dropZones[1].data.get('action')
        let action3 = dropZones[2].data.get('action')

        if (action === 'right' && action2 === '' && action3 === '') { // RIGHT
            // Move Player
            this.move('right')
            // Turn on indicators
            instructions[0].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move(''); instructions[0].setFrame(0); lights[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { lights[1].setFrame(0); lights[2].setFrame(1) }, 2000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === '' && action2 === '' && action3 === 'right') {
            timeOne = setTimeout(() => { lights[0].setFrame(1) }, 1000)
            timeTwo = setTimeout(() => { lights[0].setFrame(0); lights[1].setFrame(1) }, 2000)
            timeThree = setTimeout(() => { this.move('right'); instructions[0].setFrame(1); lights[1].setFrame(0) }, 2500)
            timeFour = setTimeout(() => { this.move(''); instructions[0].setFrame(0) }, 3000)
        } else if (action === '' && action2 === 'right' && action3 === '') {
            timeOne = setTimeout(() => { lights[0].setFrame(1) }, 1000)
            timeTwo = setTimeout(() => { this.move('right'); instructions[0].setFrame(1); lights[0].setFrame(0) }, 1500)
            timeThree = setTimeout(() => { this.move(''); instructions[0].setFrame(0); lights[2].setFrame(1) }, 2000)
            timeFour = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === 'left' && action2 === '' && action3 === '') { // LEFT
            // Move Player
            this.move('left')
            // Turn on indicators
            instructions[1].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move(''); instructions[1].setFrame(0); lights[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { lights[1].setFrame(0); lights[2].setFrame(1) }, 2000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === '' && action2 === '' && action3 === 'left') {
            timeOne = setTimeout(() => { lights[0].setFrame(1) }, 1000)
            timeTwo = setTimeout(() => { lights[0].setFrame(0); lights[1].setFrame(1) }, 2000)
            timeThree = setTimeout(() => { this.move('left'); instructions[1].setFrame(1); lights[1].setFrame(0) }, 2500)
            timeFour = setTimeout(() => { this.move(''); instructions[1].setFrame(0) }, 3000)
        } else if (action === '' && action2 === 'left' && action3 === '') {
            timeOne = setTimeout(() => { lights[0].setFrame(1) }, 1000)
            timeTwo = setTimeout(() => { this.move('left'); instructions[1].setFrame(1); lights[0].setFrame(0) }, 1500)
            timeThree = setTimeout(() => { this.move(''); instructions[1].setFrame(0); lights[2].setFrame(1) }, 2000)
            timeFour = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === 'right' && action2 === 'left' && action3 === '') { // RIGHT AND LEFT
            // Move Player
            this.move('right')
            // Turn on indicators
            instructions[0].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move('left'); instructions[0].setFrame(0); instructions[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { this.move('');instructions[1].setFrame(0); lights[2].setFrame(1) }, 1000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === 'left' && action2 === 'right' && action3 === '') {
            // Move Player
            this.move('left')
            // Turn on indicators
            instructions[1].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move('right'); instructions[1].setFrame(0); instructions[0].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { this.move('');instructions[0].setFrame(0); lights[2].setFrame(1) }, 1000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 3000)
        } else if (action === 'right' && action2 === '' && action3 === 'left') {
            // Move Player
            this.move('right')
            // Turn on indicators
            instructions[0].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move(''); instructions[0].setFrame(0); lights[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { this.move('left'); instructions[1].setFrame(1); lights[1].setFrame(0) }, 1500)
            timeThree = setTimeout(() => { this.move(''); instructions[1].setFrame(0) }, 2000)
        } else if (action === 'left' && action2 === '' && action3 === 'right') {
            // Move Player
            this.move('left')
            // Turn on indicators
            instructions[1].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move(''); instructions[1].setFrame(0); lights[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { this.move('right'); instructions[0].setFrame(1); lights[1].setFrame(0) }, 1500)
            timeThree = setTimeout(() => { this.move(''); instructions[0].setFrame(0) }, 2000)
        } else if (action === 'right' && action2 === 'jump' && action3 === '') { // LONG JUMP
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
        } else if (action === 'jump' && action2 === 'right' && action3 === '') { // SHORT JUMP
            // Move Player
            this.move('jump')
            // Turn on indicators
            instructions[2].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move('right'); instructions[0].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { this.move(''); instructions[2].setFrame(0); instructions[0].setFrame(0); lights[2].setFrame(1) }, 1000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 2000)
        } else if (action === 'jump' && action2 === 'left' && action3 === '') {
            // Move Player
            this.move('jump')
            // Turn on indicators
            instructions[2].setFrame(1)
            // Stop player and turn off indicators
            timeOne = setTimeout(() => { this.move('left'); instructions[1].setFrame(1) }, 500)
            timeTwo = setTimeout(() => { this.move(''); instructions[2].setFrame(0); instructions[1].setFrame(0); lights[2].setFrame(1) }, 1000)
            timeThree = setTimeout(() => { lights[2].setFrame(0) }, 2000)
        }
    }

    stopTimerPlayer(){
        clearTimeout(timeOne)
        clearTimeout(timeTwo)
        clearTimeout(timeThree)
        clearTimeout(timeFour)
    }
}