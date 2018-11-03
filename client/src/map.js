import React from 'react'
import {MacroMap} from './macro'
import DrawLand from './drawing/draw-land'
import DragPos from './drawing/drag-pos'
import { drawWrapper, grid2pos, rectInCanvas, drawImageMid, grid2posMid } from './drawing/draw-util'

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
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
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
        canvas.addEventListener('mouseout', this.onMouseUp.bind(this))

        this.draw()
    }

    draw() {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const pos = this.dragPos.getPos()

        drawWrapper(ctx, pos, (ctx, pos) => {
            this.land.draw(ctx, pos)
        })

        drawWrapper(ctx, pos, (ctx, pos) => {
            const owners = window.ownership.getOwners()
            Object.keys(owners).forEach(ownerAddr => {
                const landInfo = owners[ownerAddr]
                const objPos = grid2pos(landInfo.land.r, landInfo.land.c)
                const midPos = grid2posMid(landInfo.land.r, landInfo.land.c)
                if (rectInCanvas(ctx, pos, objPos, MacroMap.HourseSize)) {
                    const houseImage = window.imageMgr.getImage(landInfo.house)
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