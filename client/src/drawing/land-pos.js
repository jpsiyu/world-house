import { MacroMap } from '../macro'

class LandPos {
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

    canvasPos2LandPos(pos) {
        return {
            x: pos.x - this.posX,
            y: pos.y - this.posY,
        }
    }

    setOriginPos(pos) {
        this.posX = pos.x
        this.posY = pos.y
    }

    landPosInGrid(pos) {
        const r = Math.floor(pos.y / MacroMap.HouseSize)
        const c = Math.floor(pos.x / MacroMap.HouseSize)
        return { r, c }

    }

    static gridInLandPos(r, c) {
        const x = c * MacroMap.HouseSize
        const y = r * MacroMap.HouseSize
        return { x, y }
    }

    static gridMiddleInLandPos(r, c) {
        const x = c * MacroMap.HouseSize + MacroMap.HouseSize / 2
        const y = r * MacroMap.HouseSize + MacroMap.HouseSize / 2
        return { x, y }
    }
}

export default LandPos