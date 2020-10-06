import Phaser from 'phaser'

import Instruction from '../gameObjects/UI/Instruction'
import DropZone from '../gameObjects/UI/DropZone'
import { forLoop } from '../Functionloader'

export default class GameUI extends Phaser.Scene {

    constructor() {
        super({key: 'GameUI'})
    }

    init() {
        // Propeties Scene UI
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)

        // Get Properties of GameScene
        this.gameScene = this.scene.get('Game')

        // Properties DropZones
        this.dropX = 976.5
        this.rectangleDropX = 252
        this.rectangleDropY = 40
        this.colorDropZone = 0x363636

        // Propeties Instructions
        this.instructionX = 189
        this.playerStartPosition = []
    }

    create() {
        // Rectangle Background
        this.add.rectangle(0, 550, this.scale.width, 400, 0x242424).setOrigin(0)

        // Create Instructions Panel and container
        this.instructions_container = this.add.container(100, 215).setDepth(1)
        this.instructions_panel = this.add.image(34,344.5,'instructions_panel').setOrigin(0).setDepth(1).setScale(0.5)
        
        // Create GameObject Instruction
        this.right = new Instruction(this, this.instructionX, 540, 'right')
        this.jump = new Instruction(this, this.instructionX, 580, 'jump')
        this.left = new Instruction(this, this.instructionX, 620, 'left')

        // Drag propertie
        this.input.setDraggable([this.right,this.jump,this.left])

        // Add button loop
        this.btn_run = this.add.sprite(1222,535,'btn_run').setInteractive().setDataEnabled().setScale(0.5).setDepth(1)
        this.btn_run.data.set('status', 'run') // and stop
        
        // Add text iterator value
        this.iterator_loop = this.add.text(
            this.scale.width - 586, // x position
            418, // y position
            '1',
            { font: '35px Arial', fill: '#ff2424' }
        ).setOrigin(0.5).setDataEnabled().setInteractive()
        this.iterator_loop.data.set('repeat', 1)

        // Add group of lights
        this.actionLight_1 = this.add.sprite(this.dropX - 204, 491.5, 'action_light').setScale(0.5)
        this.actionLight_2 = this.add.sprite(this.dropX - 204, 539, 'action_light').setScale(0.5)
        this.actionLight_3 = this.add.sprite(this.dropX - 204, 587, 'action_light').setScale(0.5)

        //  Create GameObject DropZone
        this.dropZone_1 = new DropZone(this, this.dropX, 491.5, this.rectangleDropX, this.rectangleDropY, 1, this.colorDropZone, this.instructions_container)
        this.dropZone_2 = new DropZone(this, this.dropX, 540, this.rectangleDropX, this.rectangleDropY, 2, this.colorDropZone, this.instructions_container)
        this.dropZone_3 = new DropZone(this, this.dropX, 589.5, this.rectangleDropX, this.rectangleDropY, 3, this.colorDropZone, this.instructions_container)
        
        // Create array GameObject ActionLights
        const action_lights = [this.actionLight_1, this.actionLight_2, this.actionLight_3]

        // Add elements instructions container
        this.instructions_container.add([
            this.instructions_panel,
            this.left,
            this.jump,
            this.right,
            this.dropZone_1,
            this.dropZone_2,
            this.dropZone_3,
            this.btn_run,
            this.iterator_loop,
            this.actionLight_1,
            this.actionLight_2,
            this.actionLight_3
            ])

        //create state bar player  
        this.add.image(50,50,'status_main').setOrigin(0).setScale(0.4)

        // btn restart Scene
        this.btn_restart = this.add.rectangle(1500, 50 , 50,50, 0x242424).setOrigin(0).setInteractive()

        // DRAG AND DROP FUNCTIONS
        this.input.on('dragstart', function (pointer, gameObject) {

            this.instructions_container.bringToTop(gameObject)

            switch(gameObject.data.get('zone')){
                case 1:
                    this.dropZone_1.setInteractive()
                    this.dropZone_1.data.values.action = ''
                    gameObject.data.values.zone = 0
                    action_lights[0].setFrame(0)
                    break;
                case 2:
                    this.dropZone_2.setInteractive()
                    this.dropZone_2.data.values.action = ''
                    gameObject.data.values.zone = 0
                    action_lights[1].setFrame(0)
                    break;
                case 3:
                    this.dropZone_3.setInteractive()
                    this.dropZone_3.data.values.action = ''
                    gameObject.data.values.zone = 0
                    action_lights[2].setFrame(0)
                    break;
            }

        }, this)
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setFrame(0)
        })
    
        this.input.on('dragenter', function (pointer, gameObject, dropZone) {})
    
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {})

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x
            gameObject.y = dropZone.y
            gameObject.input.enabled = true
            gameObject.setDepth(2)
            gameObject.data.values.zone = dropZone.data.get('name')
            dropZone.data.values.action = gameObject.data.get('action')
            dropZone.disableInteractive()

            if (dropZone.data.get('action') !== ''){
                action_lights[dropZone.data.get('name') - 1].setFrame(1)
            }

        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped) {
                gameObject.x = gameObject.data.get('x')
                gameObject.y = gameObject.data.get('y')
                gameObject.setFrame(0)
            }

        })

        // ITERATER LISTENERS
        this.iterator_loop.on('pointerover', () => {
            this.iterator_loop.setStroke('#fff', 6).setShadow(2, 2, "#333333", 2, true, false)
        })
        this.iterator_loop.on('pointerout', () => {
            this.iterator_loop.setStroke('#fff', 0).setShadow(2, 2, "#333333", 2, false, false)
        })
        this.iterator_loop.on('pointerdown', () => {
            
            if (this.iterator_loop.data.get('repeat') < 5) {
                this.iterator_loop.data.values.repeat = this.iterator_loop.data.get('repeat') + 1
            } else {
                this.iterator_loop.data.values.repeat = 1
            }
            this.iterator_loop.setText(this.iterator_loop.data.get('repeat'))
        })

        // CLICK FUNCTIONS UI
        this.btn_run.on('pointerup', () => {
            // @ts-ignore
            this.scene.get('Game').loopPlayer(
                [
                    this.dropZone_1,
                    this.dropZone_2,
                    this.dropZone_3
                ], 
                [
                    this.right,
                    this.left,
                    this.jump,
                    
                ],
                [
                    this.actionLight_1,
                    this.actionLight_2,
                    this.actionLight_3
                ],
                this.iterator_loop,
                this.btn_run,
                this.playerStartPosition
            )
        })
        
        this.btn_restart.on('pointerdown', () => {
            this.scene.run('Transition', { nextScene: 'Game'})
        })
    
    }
}