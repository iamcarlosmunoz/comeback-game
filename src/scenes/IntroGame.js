import Phaser from 'phaser'

export default class IntroGame extends Phaser.Scene {

    constructor() {
        super({key: 'IntroGame'})
    }

    init() {
        this.centerX = Math.round(0.5 * this.scale.width)
        this.centerY = Math.round(0.5 * this.scale.height)
    }

    create() {

        this.logo_phaser = this.add.image(this.centerX, this.centerY, 'logo_phaser').setAlpha(0)
        this.logo_bestcresw = this.add.image(this.centerX, this.centerY, 'logo_bestcresw').setAlpha(0)

        let timeline = this.tweens.createTimeline()

        // ANIMACION LOGO DE PHASER
        timeline.add({
            targets: this.logo_phaser,
            alpha: '+=1',
            ease: 'Linear', 
            duration: 1000,
            delay: 1500
        })

        timeline.add({
            targets: this.logo_phaser,
            alpha: '-=1',
            ease: 'Linear',
            duration: 1000,
            delay: 1500
        })

        // ANIMACION LOGO BESTCREW STUDIOS
        timeline.add({
            targets: this.logo_bestcresw,
            alpha: '+=1',
            ease: 'Linear',
            duration: 1000,
            delay: 500
        })

        timeline.add({
            targets: this.logo_bestcresw,
            alpha: '-=1',
            ease: 'Linear',
            duration: 1000,
            delay: 1500,
            onComplete: () => {
                this.scene.start('MenuGame')
            }
        })

        // INICIAR ANIMACION DE LOGOS
        timeline.play()
    }


}


