import Phaser from 'phaser'

import Instruction from '../gameObjects/UI/Instruction'
import DropZone from '../gameObjects/UI/DropZone'
import { forLoop } from '../Functionloader'

export default class GameUI extends Phaser.Scene {

    constructor() {
        super({key: 'GameUI'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
        this.gameScene = this.scene.get('Game')
    }

    create() {
        // Rectangle Background
        this.add.rectangle(0, 500, this.scale.width, 300, 0x242424).setOrigin(0)

        // Create Instructions Panel and container
        this.instructions_container = this.add.container(40,80).setDepth(1)
        this.instructions_panel = this.add.image(202,552,'instructions_panel').setDepth(1).setScale(0.5)

        // Create GameObject Instruction
        this.right = new Instruction(this, 200, 540, 'right')
        this.jump = new Instruction(this, 200, 580, 'jump')
        this.left = new Instruction(this, 200, 620, 'left')

        // Drag propertie
        this.input.setDraggable([this.right,this.jump,this.left])

        // Add button loop
        this.btn_run = this.add.rectangle(this.scale.width - 200, 600, 100, 100, 0x3d44ff).setOrigin(0).setInteractive()

        //  Create GameObject DropZone
        this.dropZone_1 = new DropZone(this, 900, 540, 250, 50, 1, 0x363636, this.instructions_container)
        this.dropZone_2 = new DropZone(this, 900, 595, 250, 50, 2, 0x363636, this.instructions_container)
        this.dropZone_3 = new DropZone(this, 900, 650, 250, 50, 3, 0x363636, this.instructions_container)

        // Add container
        this.instructions_container.add([
            this.instructions_panel,
            this.left,
            this.jump,
            this.right,
            this.dropZone_1,
            this.dropZone_2,
            this.dropZone_3
            ])


        // DRAG AND DROP FUNCTIONS
        this.input.on('dragstart', function (pointer, gameObject) {

            this.instructions_container.bringToTop(gameObject)

            switch(gameObject.data.get('zone')){
                case 1:
                    this.dropZone_1.setInteractive()
                    this.dropZone_1.data.values.action = ''
                    gameObject.data.values.zone = 0
                    break;
                case 2:
                    this.dropZone_2.setInteractive()
                    this.dropZone_2.data.values.action = ''
                    gameObject.data.values.zone = 0
                    break;
                case 3:
                    this.dropZone_3.setInteractive()
                    this.dropZone_3.data.values.action = ''
                    gameObject.data.values.zone = 0
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
            // gameObject.setFrame(1)
            gameObject.setDepth(2)
            gameObject.data.values.zone = dropZone.data.get('name')
            dropZone.data.values.action = gameObject.data.get('action')
            dropZone.disableInteractive()

        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped) {
                gameObject.x = gameObject.data.get('x')
                gameObject.y = gameObject.data.get('y')
                gameObject.setFrame(0)
            }

        })

        this.btn_run.on('pointerdown', () => this.clickHandler(
            [
                this.dropZone_1.data.get('action'),
                this.dropZone_2.data.get('action'),
                this.dropZone_3.data.get('action')
            ], 
            [
                this.right,
                this.left,
                this.jump
            ]
        ), this)
    
    }


    clickHandler(dropZones, instructions){
        
        // @ts-ignore
        const player = this.gameScene.getPlayer()
        forLoop(dropZones, player, instructions)
        
    }
}