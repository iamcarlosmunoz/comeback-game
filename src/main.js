import { App } from './game.js'

function resizeApp () {

    // Width-heigth-radio of game resolution
    let game_ratio = (1366) / (768)

    // Make div full height of brower and keep the ratio game resolution
    let div = document.getElementById('output')
    div.style.width = (window.innerHeight * game_ratio + 'px')
    div.style.height = (window.innerHeight + 'px')

    // Check if device DPI messes up the width-height-ratio
    let canvas = document.getElementsByTagName('canvas')[0]

    let dpi_w = (parseInt(div.style.width) / canvas.width)
    let dpi_h = (parseInt(div.style.height) / canvas.height)

    let height = window.innerHeight * (dpi_w / dpi_h)
    let width = height * game_ratio

    // Scale canvas
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
}

function runApp () {

    // Init the Phaser game app
    let app = new App()
    app.start()

    // Scale to device
    window.addEventListener('resize', resizeApp)
    resizeApp()

}

window.onload = function () {

    // Launch the game
    runApp()
}