export const toggleFullScreen = (scene) => {
    if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        // Action button
    } else {
        scene.scale.startFullscreen();
        // Action button
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