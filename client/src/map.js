import React from 'react'
import { MacroMap, MacroEventType } from './macro'
import DrawLand from './drawing/draw-land'
import LandPos from './drawing/land-pos'
import { getById } from './house-config'

import {
    MapFace,
    MapBottom,
    MapRight,
    MapLogo,
} from './map-widgets'

import {
    drawWrapper,
    rectInCanvas,
    drawImageMid,
} from './drawing/draw-util'

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.ctx = null
        this.canvas = null
        this.state = {
            selectedGrid: null,
        }
        this.landPos = new LandPos(0, 0)
        this.draging = false
        this.clickFlag = false
        this.land = new DrawLand()
    }

    render() {
        return <div className='map-container'>
            <canvas
                className='map-canvas'
                width={MacroMap.CanvasWidth}
                height={MacroMap.CanvasHeight}
                ref={this.canvasRef}>
            </canvas>
            <MapLogo />
            <MapFace />
            <MapBottom />
            {this.state.selectedGrid == null ? null : <MapRight selectedGrid={this.state.selectedGrid} />}
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

        app.eventListener.register(MacroEventType.PlayerMode, this, () => {
            if (app.player.hasHouse()) {
                this.center2grid(app.player.houseData.row, app.player.houseData.col)
            } else
                this.updateAndDraw()
        })
        app.eventListener.register(MacroEventType.BuyHouse, this, () => {
            this.updateAndDraw()
        })
        app.eventListener.register(MacroEventType.HouseMove, this, () => {
            this.updateAndDraw()
        })

        this.draw()
    }

    updateAndDraw(force = true) {
        if (!app.playerMode) return
        const canvasMidPos = this.landPos.getCanvasMidPos(this.ctx)
        const gridPos = this.landPos.landPosInGrid(canvasMidPos)
        const res = app.ownership.setCenter(gridPos)

        // if not force and center pos not change, just let it go
        if (!res && !force) return

        app.ownership.getSurroundInfo()
            .then(() => {
                this.draw()
                app.eventListener.dispatch(MacroEventType.UpdateSurround)
            })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawLand()
        this.drawSelectedGrid()
        this.drawHouse()
    }

    drawLand() {
        const pos = this.landPos.getPos()
        drawWrapper(this.ctx, pos, (ctx, pos) => {
            this.land.draw(ctx, pos)
        })
    }

    drawSelectedGrid() {
        if (!this.state.selectedGrid) return
        const pos = this.landPos.getPos()
        drawWrapper(this.ctx, pos, (ctx, pos) => {
            const rectPos = {
                x: this.state.selectedGrid.c * MacroMap.HourseSize,
                y: this.state.selectedGrid.r * MacroMap.HourseSize,
            }
            ctx.fillStyle = 'rgba(188,213,103, 0.7)'
            ctx.rect(rectPos.x, rectPos.y, MacroMap.HourseSize, MacroMap.HourseSize)
            ctx.fill()
        })
    }

    drawHouse() {
        const pos = this.landPos.getPos()
        drawWrapper(this.ctx, pos, (ctx, pos) => {
            const owners = app.ownership.getOwners()
            Object.keys(owners).forEach(ownerAddr => {
                const landInfo = owners[ownerAddr]
                const objPos =  this.landPos.gridInLandPos(landInfo.land.r, landInfo.land.c)
                const midPos = this.landPos.gridMiddleInLandPos(landInfo.land.r, landInfo.land.c)
                if (rectInCanvas(ctx, pos, objPos, MacroMap.HourseSize)) {
                    const conf = getById(landInfo.id)
                    const houseImage = app.imageMgr.getImage(conf.img)
                    drawImageMid(ctx, midPos, houseImage.obj, MacroMap.HourseImageSize)
                }
            })
        })

    }

    onClick(event) {
        if (!app.playerMode) return
        const canvasPos = { x: event.offsetX, y: event.offsetY }
        const mapPos = this.landPos.canvasPos2LandPos(canvasPos)
        const gridPos = this.landPos.landPosInGrid(mapPos)
        if (gridPos.r < 0 || gridPos.r >= MacroMap.RowNum || gridPos.c < 0 || gridPos.c >= MacroMap.ColNum)
            this.setState({
                selectedGrid: null
            })
        else
            this.setState({
                selectedGrid: gridPos
            })
        this.draw()
    }

    onMouseDown(event) {
        const startX = event.clientX
        const startY = event.clientY
        this.draging = true
        this.clickFlag = true
        this.landPos.setStart(startX, startY)
    }

    onMouseUp(event) {
        this.draging = false
        this.updateAndDraw(false)
        if (this.clickFlag) this.onClick(event)
    }

    onMouseMove(event) {
        this.clickFlag = false
        if (!this.draging) return

        const targetX = event.clientX
        const targetY = event.clientY
        this.landPos.setTarget(targetX, targetY)
        this.landPos.move()

        this.draw()
        this.landPos.setStart(targetX, targetY)
    }

    center2grid(r, c) {
        const gridMiddle = this.landPos.gridMiddleInLandPos(r, c)
        const landOrigin = {
            x: this.canvas.width / 2 - gridMiddle.x,
            y: this.canvas.height / 2 - gridMiddle.y,
        }
        this.landPos.setOriginPos(landOrigin)
        this.updateAndDraw(true)
    }
}

export default Map