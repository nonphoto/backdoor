import Vector from '@nonphoto/vector'

export default class Grid {
    constructor(w, h, s) {
        this.w = w
        this.h = h
        this.s = s

        this.rows = new Array(this.h).fill(true)

        this.rows = this.rows.map((row) => {
            return new Array(this.w).fill(true)
        })
    }

    get tiles() {
        return [].concat(this.rows)
    }

    forEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Expected type function.')
        }

        for (let j = 0; j < this.h; j++) {
            for (let i = 0; i < this.w; i++) {
                const index = new Vector(i, j)
                const tile = this.getTile(index)
                callback(tile, index)
            }
        }
    }

    toIndex(coordinates) {
        const s = 1 / this.s
        return Vector.clone(coordinates).scale(s).floor()
    }

    getTile(index) {
        const {x, y} = index
        return this.rows[y][x]
    }

    setTile(index, value) {
        const {x, y} = index
        this.rows[y][x] = value
    }

    draw(context) {
        context.fillStyle = 'rgb(100, 100, 100)'

        this.forEach((tile, index) => {
            const {x, y} = index.scale(this.s)

            if (tile) {
                context.fillRect(x, y, this.s - 1, this.s - 1)
            }
        })
    }
}