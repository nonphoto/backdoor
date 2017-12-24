import Vector from '@nonphoto/vector'

import Grid from './grid'

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas')
    canvas.width = 192
    canvas.height = 128

    const context = canvas.getContext('2d')

    let canvasBounds = canvas.getBoundingClientRect()
    let mouse = new Vector()
    let grid = new Grid(12, 10, 10)

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height)

        grid.draw(context)

        window.requestAnimationFrame(draw)
    }

    function clientToCanvasCoordinates(x, y) {
        const rx = (x - canvasBounds.left) / canvasBounds.width * canvas.width
        const ry = (y - canvasBounds.top) / canvasBounds.height * canvas.height

        return new Vector(rx, ry)
    }

    window.addEventListener('resize', () => {
        canvasBounds = canvas.getBoundingClientRect()
    })

    document.addEventListener('mousemove', (event) => {
        mouse = clientToCanvasCoordinates(event.clientX, event.clientY)
    })

    document.addEventListener('click', (event) => {
        const coordinates = clientToCanvasCoordinates(event.clientX, event.clientY)
        const index = grid.toIndex(coordinates)
        const tile = grid.getTile(index)
        grid.setTile(index, !tile)
    })

    draw()
})