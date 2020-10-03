export const toggleFullScreen = (scene) => {
    if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        // Action button
    } else {
        scene.scale.startFullscreen();
        // Action button
    }
}

export const forLoop = (dropZones, player, instructions) => {

    let sleepTimeBefore = 0
    let sleepTimeAfter = 0
    let i = 0;  

    function internalLoop() {        
        setTimeout(function() {  
            switch(dropZones[i]) {
                case 'right':
                    stateInstruction(instructions[0], 'on', 'right', player)
                    stateInstruction(instructions[0], 'off', 'right', player)
                    if (i === 0) {
                        // after
                        if (dropZones[i + 1] === '') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        } else if (dropZones[i + 1] === 'jump') {
                            sleepTimeAfter = 1000
                            sleepTimeBefore = 0
                        } else if (dropZones[i + 1] === 'left') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        }
                    } else if (i === 1) {
                        // before
                        if (dropZones[i - 1] === '') {
                            sleepTimeAfter = 500
                        } else if (dropZones[i - 1] === 'jump') {
                            sleepTimeAfter = 500
                        }

                        // after
                        if (dropZones[i + 1] === '') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        } else if (dropZones[i + 1] === 'jump') {
                            sleepTimeAfter = 1000
                            sleepTimeBefore = 0
                        } else if (dropZones[i + 1] === 'left') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        }
                    } else if (i === 2) {
                        if (dropZones[i - 1] === '') {
                            sleepTimeAfter = 500
                        } else if (dropZones[i - 2] === 'left' && dropZones[i - 1] === 'jump') {
                            sleepTimeAfter = 500
                        }
                    }
                    break
                case 'left':
                    stateInstruction(instructions[1], 'on', 'left', player)
                    stateInstruction(instructions[1], 'off', 'left', player)
                    if (i === 0) {
                        // after
                        if (dropZones[i + 1] === '') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        } else if (dropZones[i + 1] === 'jump') {
                            sleepTimeAfter = 1000
                            sleepTimeBefore = 0
                        } else if (dropZones[i + 1] === 'right') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        }
                    } else if (i === 1) {
                        // before
                        if (dropZones[i-1] === '') {
                            sleepTimeAfter = 500
                        } else if (dropZones[i-1] === 'jump') {
                            sleepTimeAfter = 500
                        }

                        // after
                        if (dropZones[i + 1] === '') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        } else if (dropZones[i + 1] === 'jump') {
                            sleepTimeAfter = 1000
                            sleepTimeBefore = 0
                        } else if (dropZones[i + 1] === 'right') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        }
                    } else if (i === 2) {
                        if (dropZones[i - 1] === '') {
                            sleepTimeAfter = 500
                        } else if (dropZones[i - 2] === 'right' && dropZones[i - 1] === 'jump') {
                            sleepTimeAfter = 500
                        }
                    }
                    break
                case 'jump':
                    stateInstruction(instructions[2], 'on', 'jump', player)
                    stateInstruction(instructions[2], 'off', 'jump', player)
                    if (i === 0) {
                        // after
                        if (dropZones[i + 1] === '') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 500
                        } else if (dropZones[i+1] !== '') { // left or right
                            sleepTimeAfter = 0
                            sleepTimeBefore = 500
                        }
                    } else if (i === 1) {
                        // before
                        if (dropZones[i - 1] === ''){
                            sleepTimeAfter = 0
                        } else if (dropZones[i - 1] !== '' && dropZones[i + 1] === '') {
                            sleepTimeAfter = 1000
                        } else if (dropZones[i - 1] !== '' && dropZones[i + 1] !== '') {
                            sleepTimeAfter = 1000
                            sleepTimeBefore = 1000
                        }

                        // after
                        if (dropZones[i + 1] === '') {
                            sleepTimeAfter = 1000
                            sleepTimeBefore = 1000
                        } else if (dropZones[i + 1] !== '' && dropZones[i - 1] === '') {
                            sleepTimeAfter = 500
                            sleepTimeBefore = 1000
                        }
                    }
                    break
                case '':
                    sleepTimeBefore = 1000
                    sleepTimeAfter = 0
                    break
            }

            sleep(sleepTimeAfter).then(() => { player.move('') })
            console.log('['+i+'] ' + 'Before: ' + sleepTimeBefore + '  After: ' + sleepTimeAfter + '  action: '+dropZones[i])
            i++;                  
            if (i < 3) {           
                internalLoop();             
            }                       
        }, sleepTimeBefore)
    }

    internalLoop(); 

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    
    function stateInstruction(instruction, state, action, player) {
        if (state === 'off' && action !== 'jump') { // for right and left
            sleep(500).then(() => { instruction.setFrame(0) })
        } else if (state === 'off' && action === 'jump') { // only jump
            sleep(1000).then(() => { instruction.setFrame(0) })
        } else if (state === 'on') { // all instructions
            player.move(action)
            instruction.setFrame(1)
        }
    }
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