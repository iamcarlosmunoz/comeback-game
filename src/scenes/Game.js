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
        this.cameras.main.setBounds(0, 0, 2000, 550);
        this.physics.world.setBounds(0, 0, 2000, 550);

        // Controls
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

        this.add.rectangle(0, 0, 2000,550, 0xff4242).setOrigin(0)

        // Create Text
        this.text = this.add.text(
            this.centerX,
            260,
            'GAMEPLAY',
            { font: '70px San Serif', fill: '#fff' }
        ).setOrigin(0.5)

        // Create Player in Scene Game
        this.astronaut = new Player(this, 200, 200, 'player',2, this.cameras)


    }

    update() {

        // if (this.right.isDown) {
        //     this.astronaut.move('right')
        // } else if (this.left.isDown) {
        //     this.astronaut.move('left')
        // } else {
        //     this.astronaut.move('')
        // }
        
        // // @ts-ignore
        // if (this.up.isDown && this.astronaut.body.onFloor()) {
        //     this.astronaut.move('up')          
        // }

    }

    getPlayer(){
        return this.astronaut
    }

    loopPlayer(dropZones, instructions, lights, iterator, btn) {

        if (btn.data.get('status') === 'run') {
            // turn on btn_run
            btn.setFrame(1)
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
                callback: () => this.astronaut.movePlayer(dropZones, instructions, lights),
                repeat: iterator.data.get('repeat'),
                callbackScope: this
            })
            // set btn status STOP
            btn.data.values.status = 'stop'
        } else if (btn.data.get('status') === 'stop') {
            // turn off btn_run
            btn.setFrame(0)
            // config elements set interactive
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

                let i = 0

                instructions.map(element => {
                    if (element.frame.name === 1){
                        element.setFrame(0)
                    }
                })

                lights.map(element => {
                    if (element.frame.name === 1 && dropZones[i].data.get('action') === ''){
                        element.setFrame(0)
                    }
                    i++ // temp
                })

                player.move('')

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