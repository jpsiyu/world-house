import React from 'react'
import { MacroMap, MacroEventType } from './macro'
import DrawLand from './drawing/draw-land'
import MapPos from './drawing/map-pos'
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
        this.mapPos = new MapPos(0, 0)
        this.draging = false
        this.clickFlag = false
        this.land = new DrawLand()
        this.selectedGrid = null
    }

    render() {
        return <div className='map-container'>
            <canvas
                className='map-canvas'
                width={MacroMap.CanvasWidth}
                height={MacroMap.CanvasHeight}
                ref={this.canvasRef}>
            </canvas>
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
        const canvasMidPos = this.mapPos.getCanvasMidPos(this.ctx)
        const gridPos = posToGrid(canvasMidPos)
        const res = app.ownership.setCenter(gridPos)
        if (!res) return
        app.ownership.getSurroundInfo()
            .then(() => {
                this.draw()
            })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawLand()
        this.drawSelectedGrid()
        this.drawHouse()
    }

    drawLand() {
        const pos = this.mapPos.getPos()
        drawWrapper(this.ctx, pos, (ctx, pos) => {
            this.land.draw(ctx, pos)
        })
    }

    drawSelectedGrid() {
        if (!this.selectedGrid) return
        const pos = this.mapPos.getPos()
        drawWrapper(this.ctx, pos, (ctx, pos) => {
            const rectPos = {
                x: this.selectedGrid.c * MacroMap.HourseSize,
                y: this.selectedGrid.r * MacroMap.HourseSize,
            }
            ctx.fillStyle = 'rgba(188,213,103, 0.7)'
            ctx.rect(rectPos.x, rectPos.y, MacroMap.HourseSize, MacroMap.HourseSize)
            ctx.fill()
        })
    }

    drawHouse() {
        const pos = this.mapPos.getPos()
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

    onClick(event) {
        if (!app.playerMode) return
        const canvasPos = { x: event.offsetX, y: event.offsetY }
        const mapPos = this.mapPos.canvasPos2MapPos(canvasPos)
        const gridPos = posToGrid(mapPos)
        if (gridPos.r < 0 || gridPos.r >= MacroMap.RowNum || gridPos.c < 0 || gridPos.c >= MacroMap.ColNum)
            this.selectedGrid = null
        else
            this.selectedGrid = gridPos
        this.draw()
    }

    onMouseDown(event) {
        const startX = event.clientX
        const startY = event.clientY
        this.draging = true
        this.clickFlag = true
        this.mapPos.setStart(startX, startY)
    }

    onMouseUp(event) {
        this.draging = false
        this.updateAndDraw()
        if (this.clickFlag) this.onClick(event)
    }

    onMouseMove(event) {
        this.clickFlag = false
        if (!this.draging) return

        const targetX = event.clientX
        const targetY = event.clientY
        this.mapPos.setTarget(targetX, targetY)
        this.mapPos.move()

        this.draw()
        this.mapPos.setStart(targetX, targetY)
    }
}

export default Map