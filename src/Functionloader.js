export const toggleFullScreen = (scene) => {
    if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        // Action button
    } else {
        scene.scale.startFullscreen();
        // Action button
    }
}