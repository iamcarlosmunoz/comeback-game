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


        // SET DATA 

        this.right1.data.set('x', this.right1.x);
        this.right1.data.set('y', this.right1.y);

        this.right2.data.set('x', this.right2.x);
        this.right2.data.set('y', this.right2.y);

        this.right3.data.set('x', this.right3.x);
        this.right3.data.set('y', this.right3.y);


        this.input.setDraggable([this.right1,this.right2,this.right3])

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });


        //  A drop zone
        var zone = this.add.zone(900, 580, 250, 50).setRectangleDropZone(250, 50);

        this.add.rectangle(
            zone.x - zone.input.hitArea.width / 2,
            zone.y - zone.input.hitArea.height / 2,
            zone.input.hitArea.width,
            zone.input.hitArea.height,
            0x363636
        ).setDepth(1).setOrigin(0)

        //  A drop zone
        var zone2 = this.add.zone(900, 640, 250, 50).setRectangleDropZone(250, 50);

        this.add.rectangle(
            zone2.x - zone2.input.hitArea.width / 2,
            zone2.y - zone2.input.hitArea.height / 2,
            zone2.input.hitArea.width,
            zone2.input.hitArea.height,
            0x363636
        ).setDepth(1).setOrigin(0)

        //  A drop zone
        var zone3 = this.add.zone(900, 700, 250, 50).setRectangleDropZone(250, 50);

        this.add.rectangle(
            zone3.x - zone3.input.hitArea.width / 2,
            zone3.y - zone3.input.hitArea.height / 2,
            zone3.input.hitArea.width,
            zone3.input.hitArea.height,
            0x363636
        ).setDepth(1).setOrigin(0)

        // DRAG AND DROP
        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = true;

            // this.right.setFrame('right_1')
            gameObject.setFrame('right_1')

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.data.get('x')
                gameObject.y = gameObject.data.get('y')
                gameObject.setFrame('right_0')
            }

        });



        // Only in development
        this.input.enableDebug(this.right1);
        this.input.enableDebug(this.right2);
        this.input.enableDebug(this.right3);

        this.add.rectangle(0, 500, this.scale.width, 300, 0x6666ff).setOrigin(0)
    }
}