import Vector from '@nonphoto/vector'

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas')
    canvas.width = 192
    canvas.height = 128

    const canvasBounds = canvas.getBoundingClientRect()

    const context = canvas.getContext('2d')

    let mouse = new Vector()

    const gridWidth = 12
    const gridHeight = 10
    const tileSize = 10

    let tileMap = []
    for (let j = 0; j < gridHeight; j++) {

        let tileColumn = []
        for (let i = 0; i < gridWidth; i++) {
            tileColumn.push(Math.random() > 0.5)
        }

        tileMap.push(tileColumn)
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height)

        context.fillStyle = 'rgb(100, 100, 100)'

        for (let j = 0; j < gridHeight; j++) {
            for (let i = 0; i < gridWidth; i++) {
                const x = i * tileSize
                const y = j * tileSize

                if (tileMap[j][i]) {
                    context.fillRect(x, y, tileSize - 1, tileSize - 1)
                }
            }
        }

        window.requestAnimationFrame(draw)
    }

    function clientToCanvasCoordinates(x, y) {
        const rx = (x - canvasBounds.left) / canvasBounds.width * canvas.width
        const ry = (y - canvasBounds.top) / canvasBounds.height * canvas.height

        return new Vector(rx, ry)
    }

    document.addEventListener('mousemove', (event) => {
        mouse = clientToCanvasCoordinates(event.clientX, event.clientY)
    })

    document.addEventListener('click', (event) => {
        const {x, y} = clientToCanvasCoordinates(event.clientX, event.clientY)
        const i = Math.floor(x / tileSize)
        const j = Math.floor(y / tileSize)

        tileMap[j][i] = !tileMap[j][i]
    })

    draw()
})