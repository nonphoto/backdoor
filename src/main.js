import Vector from '@nonphoto/vector'

import Grid from './grid'

function toCanvasCoordinates(clientCoordinates) {

}

let mouse = new Vector()
let grid = new Grid(12, 10, 10)

let canvas = null
let context = null
let canvasBounds = null



function load() {
    canvas = document.getElementById('canvas')
    canvas.width = 192
    canvas.height = 128

    context = canvas.getContext('2d')

    canvasBounds = canvas.getBoundingClientRect()
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    grid.draw(context)

    window.requestAnimationFrame(draw)
}



window.addEventListener('load', () => {
    load()
    draw()
})

window.addEventListener('resize', () => {
    canvasBounds = canvas.getBoundingClientRect()
})

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX - canvasBounds.left) / canvasBounds.width * canvas.width
    mouse.y = (event.clientY - canvasBounds.top) / canvasBounds.height * canvas.height
})

document.addEventListener('click', () => {
    const index = grid.toIndex(mouse)
    const tile = grid.getTile(index)
    grid.setTile(index, !tile)
})
