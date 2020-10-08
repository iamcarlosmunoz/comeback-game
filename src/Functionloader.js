export const toggleFullScreen = (scene) => {
    if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        // Action button
    } else {
        scene.scale.startFullscreen();
        // Action button
    }
}

// // debugging pointer x,y
// this.input.on('pointermove', function (pointer) {
// console.log('x: '+pointer.x + '   y: '+pointer.y)
// }, this);