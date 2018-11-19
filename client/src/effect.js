import React from 'react'
import { MacroMap, MacroEventType, EffectState } from './macro'

class Effect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
        this.canvasRef = React.createRef()
        this.ctx = null
        this.canvas = null
        this.frame = this.frame.bind(this)

        this.reset()
    }

    render() {
        if (!this.state.active) return null
        return <div className='effect-container'>
            <canvas
                className='effect-canvas'
                width={MacroMap.CanvasWidth}
                height={MacroMap.CanvasHeight}
                ref={this.canvasRef}>
            </canvas>
        </div>
    }

    componentDidMount() {
        app.eventListener.register(MacroEventType.DrawCloudEffect, this, this.activeAnimation.bind(this))
    }

    update(elapsed) {
        this.timePass += elapsed
        let moveX, moveY
        switch (this.effectState) {
            case EffectState.CloudIn:
                this.bgAlpha += elapsed
                moveX = this.speedX * elapsed
                moveY = this.speedY * elapsed
                this.leftCloudPos.x += moveX
                this.leftCloudPos.y += moveY
                this.rightCloudPos.x -= moveX
                this.rightCloudPos.y -= moveY
                if (this.timePass > this.effectTime.cloudIn)
                    this.effectState = EffectState.CloudStay
                break
            case EffectState.CloudStay:
                this.bgAlpha += elapsed
                if (this.timePass > this.effectTime.cloudIn + this.effectTime.cloudStay)
                    this.effectState = EffectState.CloudOut
                break
            case EffectState.CloudOut:
                this.bgAlpha -= elapsed
                moveX = this.speedX * elapsed
                moveY = this.speedY * elapsed
                this.leftCloudPos.x -= moveX
                this.leftCloudPos.y -= moveY
                this.rightCloudPos.x += moveX
                this.rightCloudPos.y += moveY
                if (this.timePass > (this.effectTime.cloudIn + this.effectTime.cloudStay + this.effectTime.cloudOut)) {
                    this.effectState = EffectState.CloudHide
                    this.setState({ active: false })
                }
                break
            default:
                break
        }
    }

    draw() {
        this.canvas = this.canvasRef.current
        if (!this.canvas) return
        this.ctx = this.canvas.getContext('2d')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawBg()

        this.ctx.drawImage(
            app.imageMgr.getImage('cloud.png').obj,
            this.leftCloudPos.x,
            this.leftCloudPos.y,
            this.canvas.width,
            this.canvas.height,
        )

        this.ctx.drawImage(
            app.imageMgr.getImage('cloud.png').obj,
            this.rightCloudPos.x,
            this.rightCloudPos.y,
            this.canvas.width,
            this.canvas.height,
        )
    }

    drawBg() {
        this.ctx.save()
        this.ctx.beginPath()
        const alphaMax = Math.min(this.bgAlpha, 0.8)
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alphaMax})`
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()

    }

    activeAnimation() {
        this.reset()
        this.setState({ active: true })
        this.effectState = EffectState.CloudIn
        window.requestAnimationFrame(this.frame)
    }

    frame(timestamp) {
        if (!this.state.active) return
        this.previous = this.previous || timestamp
        const elapsed = (timestamp - this.previous) / 1000
        this.previous = timestamp
        this.update(elapsed)
        this.draw()
        window.requestAnimationFrame(this.frame)
    }

    reset() {
        this.leftCloudPos = { x: -MacroMap.CanvasWidth / 2, y: -MacroMap.CanvasHeight / 4 }
        this.rightCloudPos = { x: MacroMap.CanvasWidth / 2, y: MacroMap.CanvasHeight / 4 }
        this.speedX = 2000
        this.speedY = 200
        this.timePass = 0
        this.effectState = EffectState.CloudHide
        this.effectTime = {
            cloudIn: 0.2,
            cloudStay: 0.5,
            cloudOut: 1.5,
        }
        this.bgAlpha = 0
        this.previous = null

    }
}

export default Effect