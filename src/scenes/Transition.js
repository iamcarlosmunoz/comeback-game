import Phaser from 'phaser'

export default class Transition extends Phaser.Scene {

    constructor() {
        super({key: 'Transition'})
    }

    init(data) {
        this.nextScene = data.nextScene
    } 

    create() {
        this.up = this.add.rectangle(0, -this.scale.height / 2, this.scale.width,this.scale.height / 2, 0x000000).setOrigin(0)
        this.down = this.add.rectangle(0, this.scale.height , this.scale.width,this.scale.height / 2, 0x000000).setOrigin(0)
    
        this.scene.bringToTop('Transition')

        // START TRANSITION
        this.animation_up = this.tweens.add({
            targets: this.up,
            y: { from: -this.up.height, to: 0 },
            duration: 500,
            ease: 'Power2',
            onComplete: function (tween, targets) {
                const sceneParent = targets[0].scene
                sceneParent.scene.run(sceneParent.nextScene)
                sceneParent.scene.moveDown(sceneParent.nextScene)
                sceneParent.scene.pause(sceneParent.nextScene)
            }
        })
        this.animation_down = this.tweens.add({
            targets: this.down,
            y: { from: this.scale.height, to: this.down.height },
            duration: 500,
            ease: 'Power2'
        })

        // END TRANSITION
        this.animation_up_end = this.tweens.add({
            targets: this.up,
            y: { from: 0, to: -this.up.height},
            duration: 500,
            ease: 'Power2',
            delay: 1000,
            onComplete: function (tween, targets) {
                const sceneParent = targets[0].scene
                sceneParent.scene.resume(sceneParent.nextScene)
            }
        })
        this.animation_down_end = this.tweens.add({
            targets: this.down,
            y: { from: this.down.height, to: this.scale.height},
            duration: 500,
            ease: 'Power2',
            delay: 1000
        })
    }
}