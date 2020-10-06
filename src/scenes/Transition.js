import Phaser from 'phaser'

export default class Transition extends Phaser.Scene {

    constructor() {
        super({key: 'Transition'})
    }

    init(data) {
        this.nextScene = data.nextScene
    } 

    create() {
        this.up = this.add.rectangle(0, 0, this.scale.width,this.scale.height / 2, 0x000000).setOrigin(0)
        this.down = this.add.rectangle(0, this.scale.height / 2, this.scale.width,this.scale.height / 2, 0x000000).setOrigin(0)
    
        this.scene.bringToTop('Transition')
        this.scene.run(this.nextScene)
        this.scene.pause(this.nextScene)


        this.animation_up = this.tweens.add({
            targets: this.up,
            y: { from: 0, to: -this.up.height},
            duration: 1000,
            ease: 'Power2',
            delay: 500,
            onComplete: function (tween, targets) {
                const sceneParent = targets[0].scene
                sceneParent.scene.resume(sceneParent.nextScene)
            }
        })
        this.animation_down = this.tweens.add({
            targets: this.down,
            y: { from: this.down.y, to: this.down.y + this.down.height},
            duration: 1000,
            ease: 'Power2',
            delay: 500
        })
    }
}