import Phaser from 'phaser'

export default class IntroGame extends Phaser.Scene {

    constructor() {
        super({key: 'IntroGame', active: true})
    }

    preload() {
        this.load.path = 'images/'

        this.load.image('logo_phaser', 'logos/phaser.png')
        this.load.image('logo_bestcresw', 'logos/bestcrew-studios.png')
    }

    create() {
        const centerY =  Math.round(0.5 * this.sys.game.config.height)
        const centerX =  Math.round(0.5 * this.sys.game.config.width)

        const logo_phaser = this.add.image(centerX, centerY, 'logo_phaser').setAlpha(0)
        const logo_bestcresw = this.add.image(centerX, centerY, 'logo_bestcresw').setAlpha(0)

        let timeline = this.tweens.createTimeline()

        // ANIMACION LOGO DE PHASER
        timeline.add({
            targets: logo_phaser,
            alpha: '+=1',
            ease: 'Linear', 
            duration: 1000,
            delay: 2000
        })

        timeline.add({
            targets: logo_phaser,
            alpha: '-=1',
            ease: 'Linear',
            duration: 1000,
            delay: 1500
        })

        // ANIMACION LOGO BESTCREW STUDIOS
        timeline.add({
            targets: logo_bestcresw,
            alpha: '+=1',
            ease: 'Linear',
            duration: 1000,
            delay: 1000
        })

        timeline.add({
            targets: logo_bestcresw,
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


