import React from 'react'
import { MacroMap, MacroEventType } from './macro'
import DrawLand from './drawing/draw-land'
import DragPos from './drawing/drag-pos'
import {
    drawWrapper,
    grid2pos,
    rectInCanvas,
    drawImageMid,
    grid2posMid,
    posToGrid,
} from './drawing/draw-util'

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.ctx = null
        this.canvas = null
        this.state = {}
        this.dragPos = new DragPos(0, 0)
        this.draging = false
        this.land = new DrawLand()
    }

    render() {
        return <div className='map-container'>
            <canvas className='map-canvas' width={MacroMap.CanvasWidth} height={MacroMap.CanvasHeight} ref={this.canvasRef}></canvas>
        </div>
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
        canvas.addEventListener('mouseout', this.onMouseUp.bind(this))
        app.eventListener.register(MacroEventType.PlayerMode, this, this.updateAndDraw.bind(this))

        this.draw()
    }

    updateAndDraw() {
        if (!app.playerMode) return
        const canvasMidPos = this.dragPos.getCanvasMidPos(this.ctx)
        const gridPos = posToGrid(canvasMidPos)
        app.ownership.setCenter(gridPos)
        app.ownership.getSurroundInfo()
            .then(() => {
                this.draw()
            })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawLand()
        this.drawHouse()
    }

    drawLand() {
        const pos = this.dragPos.getPos()
        drawWrapper(this.ctx, pos, (ctx, pos) => {
            this.land.draw(ctx, pos)
        })
    }

    drawHouse() {
        const pos = this.dragPos.getPos()
        drawWrapper(this.ctx, pos, (ctx, pos) => {
            const owners = app.ownership.getOwners()
            Object.keys(owners).forEach(ownerAddr => {
                const landInfo = owners[ownerAddr]
                const objPos = grid2pos(landInfo.land.r, landInfo.land.c)
                const midPos = grid2posMid(landInfo.land.r, landInfo.land.c)
                if (rectInCanvas(ctx, pos, objPos, MacroMap.HourseSize)) {
                    const houseImage = app.imageMgr.getImage(landInfo.house)
                    drawImageMid(ctx, midPos, houseImage.obj, MacroMap.HourseImageSize)
                }
            })
        })

    }

    onMouseDown(event) {
        const startX = event.clientX
        const startY = event.clientY
        this.draging = true
        this.dragPos.setStart(startX, startY)
    }

    onMouseUp() {
        this.draging = false
        this.updateAndDraw()
    }

    onMouseMove(event) {
        if (!this.draging) return

        const targetX = event.clientX
        const targetY = event.clientY
        this.dragPos.setTarget(targetX, targetY)
        this.dragPos.move()

        this.draw()
        this.dragPos.setStart(targetX, targetY)
    }
}

export default Map