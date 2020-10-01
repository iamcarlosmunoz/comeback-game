import Phaser from 'phaser'

export default class Instruction extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, type){

        super(scene, x, y, type);
        scene.add.existing(this)

        // Config 
        this.setDepth(2)
        this.setInteractive(new Phaser.Geom.Rectangle(10, 15, 233, 35), Phaser.Geom.Rectangle.Contains)
        this.setDataEnabled()

        // Data
        this.data.set('x', x)
        this.data.set('y', y)
        this.data.set('zone', 0)
        this.data.set('action', type)
    }

}