export const toggleFullScreen = (scene) => {
    if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        // Action button
    } else {
        scene.scale.startFullscreen();
        // Action button
    }
}

export const forLoop = (dropZones, player, delay) => {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    let sleepTimeBefore = 0
    let sleepTimeAfter = 500

    let i = 0;               

    function internalLoop() {        
        setTimeout(function() {  
            switch(dropZones[i]) {
                case 'right':
                    player.move('right')
                    break
                case 'left':
                    player.move('left')
                    break
                case 'jump':
                    player.move('up')
                    sleepTimeAfter = 900
                    break
                case '':
                    sleepTimeBefore = 500
                    break
            }

            // Stop Move
            sleep(sleepTimeAfter).then(() => { player.move('') })
            i++;                  
            if (i < 3) {           
                internalLoop();             
            }                       
        }, sleepTimeBefore)
    }

    internalLoop(); 
}




// var text = this.add.text(350, 250, '', { font: '16px Courier', fill: '#00ff00' });

// zone.on('changedata-action', function (gameObject, value) {

//     text.setText([
//         'Zona: ' + zone.data.get('action'),
//         'Zona2: ' + zone2.data.get('action'),
//         'Zona3: ' + zone3.data.get('action')
//     ]);

// });


// Only in development
    // this.input.enableDebug(this.right1)