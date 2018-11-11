class MapPos {
    constructor(x, y) {
        this.posX = x
        this.posY = y

        this.startX = 0
        this.startY = 0

        this.targetX = 0
        this.targetY = 0

        this.movedX = 0
        this.movedY = 0
    }

    getPos() {
        return { x: this.posX, y: this.posY }
    }

    setStart(x, y) {
        this.startX = x
        this.startY = y
    }

    setTarget(x, y) {
        this.targetX = x
        this.targetY = y
    }


    move() {
        this.movedX = this.targetX - this.startX
        this.movedY = this.targetY - this.startY
        this.posX += this.movedX
        this.posY += this.movedY
    }

    getMoved() {
        return { x: this.movedX, y: this.movedY }
    }

    getCanvasMidPos(ctx) {
        return {
            x: ctx.canvas.width / 2 - this.posX,
            y: ctx.canvas.height / 2 - this.posY,
        }
    }

    canvasPos2MapPos(pos) {
        return {
            x: pos.x - this.posX,
            y: pos.y - this.posY,
        }
    }
}

export default MapPos