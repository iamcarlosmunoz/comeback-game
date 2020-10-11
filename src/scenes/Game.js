import Phaser from 'phaser'

import Player from '../gameObjects/Player'

let timerTurnOff, timerLoop

export default class Game extends Phaser.Scene {

    constructor() {
        super({key: 'Game'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
    }

    create() {
        // add scene UI
        this.scene.run('GameUI')

        //  Set the camera and physics bounds 
        this.physics.world.setBounds(0, 0, 3200, 720)
        this.main_camara = this.cameras.main.setBounds(0, 0, 3200, 720)

        // Set scene art
        this.background = this.add.image(0,150, 'background').setOrigin(0).setScale(0.8)
        this.stars = this.add.tileSprite(0, 150, 3200, 650, 'stars').setOrigin(0).setScrollFactor(0).setScale(0.5)
        this.wall = this.add.image(0, 0, 'wall').setOrigin(0).setScale(0.8)

        // Lamps and Lights
        this.lamp_001 = this.add.image(794, 240, 'lamp').setOrigin(0.5).setScale(0.8)
        this.lamp_002 = this.add.image(this.lamp_001.x + 787, 240, 'lamp').setOrigin(0.5).setScale(0.8)
        this.lamp_003 = this.add.image(this.lamp_002.x + 785, 240, 'lamp').setOrigin(0.5).setScale(0.8)

        this.light_001 = this.add.image(this.lamp_001.x,this.lamp_001.y, 'light').setOrigin(0.5).setScale(0.8)
        this.light_002 = this.add.image(this.lamp_002.x,this.lamp_002.y, 'light').setOrigin(0.5).setScale(0.8)
        this.light_003 = this.add.image(this.lamp_003.x,this.lamp_003.y, 'light').setOrigin(0.5).setScale(0.8)
        
        this.animation_light_001 = this.tweens.add({
            targets: [this.light_001, this.light_002, this.light_003],
            alpha: { from: 1, to: 0.6 },
            duration: 500,
            repeatDelay: 5000,
            repeat: -1,
            yoyo: true,
            ease: 'Power2'
        })

        // Create Player in Scene Game
        this.astronaut = new Player({
            scene: this,
            x: 200,
            y: 200,
            type: 'astronaut',
            scale: 1.5
        })

        this.main_camara.startFollow(this.astronaut, false, 0.05, 0.05)

        // Obstacles
        this.obstacle_001 = this.physics.add.staticSprite(450, 500, 'obstacle_001').setScale(0.8)
        this.obstacle_001.body.setSize(252, 350)
        this.obstacle_001.body.setOffset(50, 40)

        this.obstacle_002 = this.physics.add.staticSprite(1110, 500, 'obstacle_001').setScale(0.8)
        this.obstacle_002.body.setSize(252, 350)
        this.obstacle_002.body.setOffset(50, 40)

        this.obstacle_003 = this.physics.add.staticSprite(1350, 400, 'obstacle_001').setScale(0.8)
        this.obstacle_003.body.setSize(252, 350)
        this.obstacle_003.body.setOffset(50, 40)

        // Foreground
        this.pipeline = this.add.image(0, 0, 'pipeline').setOrigin(0).setScale(0.8)
        this.floor = this.physics.add.image(0, 458, 'floor').setOrigin(0).setImmovable(true).setCollideWorldBounds(true).setBodySize(4000, 328, false).setScale(0.8)
        this.curve = this.add.tileSprite(0, 100, 4000, 800, 'curve').setOrigin(0).setScrollFactor(1).setScale(0.8)

        // Set Physics Game
        this.physics.add.collider(this.astronaut,this.floor)
        this.physics.add.collider(this.astronaut,this.obstacle_001)
        this.physics.add.collider(this.astronaut,this.obstacle_002)
        this.physics.add.collider(this.astronaut,this.obstacle_003)

    }

    update() {

        this.stars.tilePositionX = this.cameras.main.scrollX * .3
    }

    loopPlayer(dropZones, instructions, lights, iterator, btn, startPosition) {

        let drop = dropZones[0].data.get('action') + dropZones[1].data.get('action') + dropZones[2].data.get('action')

        if (btn.data.get('status') === 'run' && drop !== 'SSS') {
            // turn on btn_run
            btn.setFrame(1)
            // set Player Position
            startPosition[0] = this.astronaut.x
            startPosition[1] = this.astronaut.y
            startPosition[2] = this.astronaut.flipX
            // config elements disable interactive
            resetStateElements('off')
            // timer for complete
            timerTurnOff = setTimeout(() => {
                btn.setFrame(0)
                resetStateElements('on', this.astronaut)
                btn.data.values.status = 'run'
            }, 3000 * (iterator.data.get('repeat') + 1))
            // timer for loop main
            timerLoop = this.time.addEvent({
                delay: 3000,
                startAt: 3000,
                callback: () => this.astronaut.movePlayer({
                    dropZones,
                    instructions,
                    lights,
                    scene: this
                }),
                repeat: iterator.data.get('repeat'),
                callbackScope: this
            })
            // set btn status STOP
            btn.data.values.status = 'stop'
        } else if (btn.data.get('status') === 'stop') {
            // turn off btn_run
            btn.setFrame(0)
            // animation player startPosition
            this.astronaut.move('STOP')
            this.astronaut.setX(startPosition[0])
            this.astronaut.setY(startPosition[1])
            this.astronaut.flipX = startPosition[2]
            resetStateElements('on', this.astronaut)
            
            // Stop timer loops
            clearTimeout(timerTurnOff)
            this.astronaut.stopTimerPlayer()
            timerLoop.remove()
            // set btn status RUN
            btn.data.values.status = 'run'
        }
        
        // LOCAL FUNCTIONS
        function resetStateElements(state, player){
            if (state === 'off') {
                iterator.disableInteractive()
                dropZones[0].disableInteractive()
                dropZones[1].disableInteractive()
                dropZones[2].disableInteractive()
                instructions[0].disableInteractive()
                instructions[1].disableInteractive()
                instructions[2].disableInteractive()
            } else if (state === 'on') {

                player.move('STOP')

                instructions.map(element => {
                    if (element.frame.name === 1){
                        element.setFrame(0)
                    }
                })

                let i = 0
                lights.map(element => {
                    if (element.frame.name === 1 && dropZones[i].data.get('action') === 'S'){
                        element.setFrame(0)
                    }
                    i++ // temp
                })

                iterator.setInteractive()
                dropZones[0].setInteractive()
                dropZones[1].setInteractive()
                dropZones[2].setInteractive()
                instructions[0].setInteractive()
                instructions[1].setInteractive()
                instructions[2].setInteractive()
                iterator.setInteractive()
            }   
        }

    }

}