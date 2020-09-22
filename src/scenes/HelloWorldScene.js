import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super({key:'hello-world', active: true})
	}

	preload()
    {
        // https://labs.phaser.io/assets/
        
        this.load.atlas('bot', 'images/running_bot.png', 'images/running_bot.json');
        this.load.image('logo', 'images/phaser3-logo.png')
        this.load.image('red', 'images/white.png')

    }

    create()
    {

        const particles = this.add.particles('red')

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })

        const logo = this.physics.add.image(400, 100, 'logo')

        logo.setVelocity(100, 200)
        logo.setBounce(1, 1)
        logo.setCollideWorldBounds(true)

        emitter.startFollow(logo)


        // Animation bot
        this.bot = this.add.sprite(100,100,'bot');

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('bot',{
                prefix: 'run',
                start: 0,
                end: 10
            }),
            repeat: -1,
            frameRate: 15
        });

        this.bot.anims.play('walk');
        this.bot.setInteractive();

        // Event Click on bot
        this.input.on('gameobjectup', this.toggleFullScreen , this);

        // this.scene.start('Preload')

    }

    // FUNCIONS IU
    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
            document.exitFullscreen(); 
            }
        }
    }
}
