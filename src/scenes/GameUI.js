import Phaser from 'phaser'

export default class GameUI extends Phaser.Scene {

    constructor() {
        super({key: 'GameUI'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
    }

    create() {

        this.panel = this.add.image(205,550,'panel').setDepth(1).setScale(0.5)

        this.right1 = this.add.sprite(200, 540, 'right')
            .setScale(0.3)
            .setDepth(2)
            .setInteractive(new Phaser.Geom.Rectangle(5, 17, 760, 120), Phaser.Geom.Rectangle.Contains)
            .setDataEnabled()

        this.right2 = this.add.sprite(200, 580, 'right')
            .setScale(0.3)
            .setDepth(2)
            .setInteractive(new Phaser.Geom.Rectangle(5, 17, 760, 120), Phaser.Geom.Rectangle.Contains)
            .setDataEnabled()

        this.right3 = this.add.sprite(200, 620, 'right')
            .setScale(0.3)
            .setDepth(2)
            .setInteractive(new Phaser.Geom.Rectangle(5, 17, 760, 120), Phaser.Geom.Rectangle.Contains)
            .setDataEnabled()


        this.input.setDraggable([this.right1,this.right2,this.right3])


        //  A drop zone 1
        let zone = this.add.zone(900, 580, 250, 50).setRectangleDropZone(250, 50).setDataEnabled()
        zone.data.set('name', 1)
        zone.data.set('action', '')

        this.add.rectangle(
            zone.x - zone.input.hitArea.width / 2,
            zone.y - zone.input.hitArea.height / 2,
            zone.input.hitArea.width,
            zone.input.hitArea.height,
            0x363636
        ).setDepth(1).setOrigin(0)

        //  A drop zone 2
        let zone2 = this.add.zone(900, 640, 250, 50).setRectangleDropZone(250, 50).setDataEnabled()
        zone2.data.set('name', 2)
        zone2.data.set('action', '')


        this.add.rectangle(
            zone2.x - zone2.input.hitArea.width / 2,
            zone2.y - zone2.input.hitArea.height / 2,
            zone2.input.hitArea.width,
            zone2.input.hitArea.height,
            0x363636
        ).setDepth(1).setOrigin(0)

        //  A drop zone 3
        let zone3 = this.add.zone(900, 700, 250, 50).setRectangleDropZone(250, 50).setDataEnabled()
        zone3.data.set('name', 3)
        zone3.data.set('action', '')

        this.add.rectangle(
            zone3.x - zone3.input.hitArea.width / 2,
            zone3.y - zone3.input.hitArea.height / 2,
            zone3.input.hitArea.width,
            zone3.input.hitArea.height,
            0x363636
        ).setDepth(1).setOrigin(0)

        // SET DATA AND SETTINGS 

        this.right1.data.set('x', this.right1.x)
        this.right1.data.set('y', this.right1.y)
        this.right1.data.set('zone', 0)
        this.right1.data.set('action', 'right')

        this.right2.data.set('x', this.right2.x)
        this.right2.data.set('y', this.right2.y)
        this.right2.data.set('zone', 0)
        this.right2.data.set('action', 'jump')

        this.right3.data.set('x', this.right3.x)
        this.right3.data.set('y', this.right3.y)
        this.right3.data.set('zone', 0)
        this.right3.data.set('action', 'left')

        // DRAG AND DROP FUNCTIONS

        this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setDepth(3)

            switch(gameObject.data.get('zone')){
                case 1:
                    zone.setInteractive()
                    zone.data.values.action = ''
                    gameObject.data.values.zone = 0
                    break;
                case 2:
                    zone2.setInteractive()
                    zone2.data.values.action = ''
                    gameObject.data.values.zone = 0
                    break;
                case 3:
                    zone3.setInteractive()
                    zone3.data.values.action = ''
                    gameObject.data.values.zone = 0
                    break;
            }

        }, this)
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setFrame('right_0')
        })
    
        this.input.on('dragenter', function (pointer, gameObject, dropZone) {})
    
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {})

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x
            gameObject.y = dropZone.y
            gameObject.input.enabled = true
            gameObject.setFrame('right_1')
            gameObject.setDepth(2)
            gameObject.data.values.zone = dropZone.data.get('name')
            dropZone.data.values.action = gameObject.data.get('action')
            dropZone.disableInteractive()

        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped) {
                gameObject.x = gameObject.data.get('x')
                gameObject.y = gameObject.data.get('y')
                gameObject.setFrame('right_0')
            }

        })

        // Only in development
        // this.input.enableDebug(this.right1)
        // this.input.enableDebug(this.right2)
        // this.input.enableDebug(this.right3)
        
        var text = this.add.text(350, 250, '', { font: '16px Courier', fill: '#00ff00' });

        zone.on('changedata-action', function (gameObject, value) {

            text.setText([
                'Zona: ' + zone.data.get('action'),
                'Zona2: ' + zone2.data.get('action'),
                'Zona3: ' + zone3.data.get('action')
            ]);

        });

        zone2.on('changedata-action', function (gameObject, value) {

            text.setText([
                'Zona: ' + zone.data.get('action'),
                'Zona2: ' + zone2.data.get('action'),
                'Zona3: ' + zone3.data.get('action')
            ]);

        });

        zone3.on('changedata-action', function (gameObject, value) {

            text.setText([
                'Zona: ' + zone.data.get('action'),
                'Zona2: ' + zone2.data.get('action'),
                'Zona3: ' + zone3.data.get('action')
            ]);

        });
    
        // Rectangle Background
        this.add.rectangle(0, 500, this.scale.width, 300, 0x6666ff).setOrigin(0)
    }
}