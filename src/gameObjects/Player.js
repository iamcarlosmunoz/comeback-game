import Phaser from 'phaser'

let timeOne, timeTwo, timeThree

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, config.type)

        this.setData({
			speed: 200,
			jumpSpeed: 550,
			gravity: 800
		})

        // set Anims Player
        config.scene.dataAnim = config.scene.cache.json.get('astronaut_anim')
        config.scene.anims.fromJSON(config.scene.dataAnim)

        // Add Sprite 
        config.scene.add.existing(this)
        config.scene.physics.add.existing(this)
        this.create(config)

    }

    create(config) {

        // set Properties
        this.setScale(config.scale)
        this.setOrigin(0.5)
        this.setCollideWorldBounds(true)
        this.setGravityY(this.data.values.gravity)
        this.body.setSize(40, 110)
        this.body.setOffset(50,10)

        // set anim
        this.anims.play('idle')

    }

    move(direction) {
        if (direction == 'STOP') {
            this.setVelocityX(0)
            this.data.values.speed = 200
            this.data.values.jumpSpeed = 550 
            this.anims.play('idle')
        }
        
        if (direction == 'LEFT') {
            this.setVelocityX(-this.data.values.speed)
            this.setFlipX(true)
            this.anims.play('walk')
        }
        else if (direction == 'RIGHT') {
            this.setVelocityX(this.data.values.speed)
            this.setFlipX(false)
            this.anims.play('walk')
        }

        if (direction == 'JUMP') {
            this.setVelocityY(-this.data.values.jumpSpeed)
            this.anims.play('jump')
        }
    }

    movePlayer(game) {

        let moves = game.dropZones[0].data.get('action') + game.dropZones[1].data.get('action') + game.dropZones[2].data.get('action')

        switch(moves) {
            case 'RSS':
            case 'LSS':
                // Move Player
                this.move(game.dropZones[0].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                // Turn on indicators
                game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(0); 
                    game.lights[1].setFrame(1) 
                    this.move('STOP')
                }, 500)
                timeTwo = setTimeout(() => { 
                    game.lights[1].setFrame(0)
                    game.lights[2].setFrame(1)
                }, 1500)
                timeThree = setTimeout(() => { game.lights[2].setFrame(0) }, 2500)
                break
            
            case 'SSR':
            case 'SSL':
                game.lights[0].setFrame(1)
                timeOne = setTimeout(() => { 
                    game.lights[0].setFrame(0); 
                    game.lights[1].setFrame(1)
                }, 1000)
                timeTwo = setTimeout(() => { 
                    this.move(game.dropZones[2].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1)
                    game.lights[1].setFrame(0) 
                }, 2000)
                timeThree = setTimeout(() => { 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(0) 
                    this.move('STOP')
                }, 2500)
                break

            case 'SRS':
            case 'SLS':
                game.lights[0].setFrame(1)
                timeOne = setTimeout(() => { 
                    game.lights[0].setFrame(0) 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(1)
                    this.move(game.dropZones[1].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 1000)
                timeTwo = setTimeout(() => { 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.lights[2].setFrame(1) 
                    this.move('STOP')
                }, 1500)
                timeThree = setTimeout(() => { game.lights[2].setFrame(0) }, 2500)
                break

            case 'LRS':
            case 'RLS':
                // Move Player
                this.move(game.dropZones[0].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                // Turn on indicators
                game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                    this.move(game.dropZones[1].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 500)
                timeTwo = setTimeout(() => { 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.lights[2].setFrame(1) 
                    this.move('STOP')
                }, 1000)
                timeThree = setTimeout(() => { game.lights[2].setFrame(0) }, 2500)
                break

            case 'SLR':
            case 'SRL':
                game.lights[0].setFrame(1)
                timeOne = setTimeout(() => { 
                    game.lights[0].setFrame(0) 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(1)
                    this.move(game.dropZones[1].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 1500)
                timeTwo = setTimeout(() => { 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                    this.move(game.dropZones[2].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 2000)
                timeThree = setTimeout(() => { 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(0) 
                    this.move('STOP')
                }, 2500)
                break

            case 'LSR':
            case 'RSL':
                // Move Player
                this.move(game.dropZones[0].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                // Turn on indicators
                game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.lights[1].setFrame(1) 
                    this.move('STOP')
                }, 500)
                timeTwo = setTimeout(() => { 
                    game.lights[1].setFrame(0) 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1)
                    this.move(game.dropZones[2].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 1500)
                timeThree = setTimeout(() => { 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(0) 
                    this.move('STOP')
                }, 2000)
                break

            case 'RJS':
            case 'LJS':
                // Move Player
                this.data.values.speed = 350
                this.data.values.jumpSpeed = 620
                this.move(game.dropZones[0].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                this.move('JUMP')
                // Turn on indicators
                game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(1)
                game.instructions[2].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(0) }, 500)
                timeTwo = setTimeout(() => { this.move('STOP') ; game.instructions[2].setFrame(0) ; game.lights[2].setFrame(1) }, 1000)
                timeThree = setTimeout(() => { game.lights[2].setFrame(0) }, 2000)
                break

            case 'SRJ':
            case 'SLJ':
                this.data.values.speed = 350
                this.data.values.jumpSpeed = 620
                game.lights[0].setFrame(1)
                timeOne = setTimeout(() => { 
                    game.lights[0].setFrame(0)
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(1)
                    game.instructions[2].setFrame(1) 
                    this.move(game.dropZones[1].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                    this.move('JUMP')
                }, 1000)
                timeTwo = setTimeout(() => { game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(0) }, 1500)
                timeThree = setTimeout(() => { this.move('STOP') ; game.instructions[2].setFrame(0) }, 2000)
                break

            case 'JSS':
                // Move Player
                this.move('JUMP')
                // Turn on indicators
                game.instructions[2].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { this.move('STOP'); game.instructions[2].setFrame(0); game.lights[1].setFrame(1) }, 1000)
                timeTwo = setTimeout(() => { game.lights[1].setFrame(0); game.lights[2].setFrame(1) }, 1800)
                timeThree = setTimeout(() => { game.lights[2].setFrame(0) }, 2300)
                break

            case 'SJS':
                game.lights[0].setFrame(1)
                timeOne = setTimeout(() => { this.move('JUMP'); game.instructions[2].setFrame(1); game.lights[0].setFrame(0) }, 1000)
                timeTwo = setTimeout(() => { this.move('STOP'); game.instructions[2].setFrame(0); game.lights[2].setFrame(1) }, 2000)
                timeThree = setTimeout(() => { game.lights[2].setFrame(0) }, 3000)
                break
            case 'SSJ':
                game.lights[0].setFrame(1)
                timeOne = setTimeout(() => { game.lights[0].setFrame(0); game.lights[1].setFrame(0) }, 1000)
                timeTwo = setTimeout(() => { this.move('JUMP'); game.instructions[2].setFrame(1); game.lights[2].setFrame(0) }, 2000)
                timeThree = setTimeout(() => { this.move('STOP'); game.instructions[2].setFrame(0) }, 3000)
                break
            
            case 'JLS':
            case 'JRS':
                // Move Player
                this.move('JUMP')
                // Turn on indicators
                game.instructions[2].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    this.move(game.dropZones[1].data.get('action') === 'R' ? 'RIGHT': 'LEFT'); 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                }, 500)
                timeTwo = setTimeout(() => { 
                    game.instructions[2].setFrame(0)
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.lights[2].setFrame(1) 
                    this.move('STOP')
                }, 1000)
                timeThree = setTimeout(() => { game.lights[2].setFrame(0) }, 2000)
                break

            case 'SJL':
            case 'SJR':
                game.lights[0].setFrame(1)
                timeOne = setTimeout(() => { 
                    game.instructions[2].setFrame(1)
                    game.lights[0].setFrame(0) 
                    this.move('JUMP')
                }, 1000)
                timeTwo = setTimeout(() => { 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                    this.move(game.dropZones[2].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 1500)
                timeThree = setTimeout(() => { 
                    game.instructions[2].setFrame(0)
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(0) 
                    this.move('STOP')
                }, 2000)
                break

            case 'JSL':
            case 'JSR':
                // Move Player
                this.move('JUMP')
                // Turn on indicators
                game.instructions[2].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    game.instructions[2].setFrame(0); 
                    game.lights[1].setFrame(1) 
                    this.move('STOP')
                }, 1000)
                timeTwo = setTimeout(() => { 
                    game.lights[1].setFrame(0)
                    game.lights[2].setFrame(1)
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                    this.move(game.dropZones[2].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 2000)
                timeThree = setTimeout(() => { 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(0) 
                    this.move('STOP')
                }, 2500)
                break

            case 'JLR':
            case 'JRL':
                // Move Player
                this.move('JUMP')
                // Turn on indicators
                game.instructions[2].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    this.move(game.dropZones[1].data.get('action') === 'R' ? 'RIGHT': 'LEFT'); 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                }, 500)
                timeTwo = setTimeout(() => { 
                    game.instructions[2].setFrame(0)
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                    this.move(game.dropZones[2].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 1000)
                timeThree = setTimeout(() => { 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(0) 
                    this.move('STOP')
                }, 1500)
                break

            case 'LRJ':
            case 'RLJ':
                // Move Player
                this.move(game.dropZones[0].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                // Turn on indicators
                game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(1) 
                    game.instructions[2].setFrame(1)
                    // Move Player
                    this.data.values.speed = 350
                    this.data.values.jumpSpeed = 620
                    this.move(game.dropZones[1].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                    this.move('JUMP')                    
                }, 500)
                timeTwo = setTimeout(() => { 
                    game.instructions[game.dropZones[1].data.get('action') === 'R' ? 0: 1].setFrame(0)
                    game.instructions[2].setFrame(0)
                    this.move('STOP')
                }, 1500)
                break

            case 'LJR':
            case 'RJL':
                // Move Player
                this.data.values.speed = 350
                this.data.values.jumpSpeed = 620
                this.move(game.dropZones[0].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                this.move('JUMP')
                // Turn on indicators
                game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(1)
                game.instructions[2].setFrame(1)
                // Stop player and turn off indicators
                timeOne = setTimeout(() => { 
                    game.instructions[game.dropZones[0].data.get('action') === 'R' ? 0: 1].setFrame(0) 
                }, 500)
                timeTwo = setTimeout(() => { 
                    game.instructions[2].setFrame(0)
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1)
                    this.move(game.dropZones[2].data.get('action') === 'R' ? 'RIGHT': 'LEFT')
                }, 1000)
                timeThree = setTimeout(() => { 
                    game.instructions[game.dropZones[2].data.get('action') === 'R' ? 0: 1].setFrame(1)
                    this.move('STOP')
                }, 1500)
                break

        }

    }

    stopTimerPlayer(){
        clearTimeout(timeOne)
        clearTimeout(timeTwo)
        clearTimeout(timeThree)
    }
}