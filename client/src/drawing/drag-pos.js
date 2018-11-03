class DragPos {
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

    getMoved(){
        return {x: this.movedX, y: this.movedY}
    }
}

export default DragPos