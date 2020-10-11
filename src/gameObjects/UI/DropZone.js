import Phaser from 'phaser'

export default class DropZone extends Phaser.GameObjects.Zone {

    constructor(scene, x, y, width, height, name, color, container) {

        super(scene, x, y, width, height)
        scene.add.existing(this)
        this.setRectangleDropZone(width, height)
        this.setDataEnabled()

        // Data
        this.data.set('name', name)
        this.data.set('action', 'S')

        this.rectangle_1 = scene.add.rectangle(
            this.x - this.input.hitArea.width / 2,
            this.y - this.input.hitArea.height / 2,
            this.input.hitArea.width,
            this.input.hitArea.height,
            color
        ).setOrigin(0)

        container.add(this.rectangle_1)

    }
}