import {MacroMap} from '../macro'

const drawWrapper = (ctx, pos, callback) => {
    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.beginPath()
    callback(ctx, pos)
    ctx.closePath()
    ctx.restore()
}

const grid2pos = (r, c) => {
    const x = c * MacroMap.HourseSize
    const y = r * MacroMap.HourseSize
    return { x, y }
}

const grid2posMid = (r, c) => {
    const x = c * MacroMap.HourseSize + MacroMap.HourseSize / 2
    const y = r * MacroMap.HourseSize + MacroMap.HourseSize / 2
    return { x, y }
}

const rectInCanvas = (ctx, objPos, pos, objSize) => {
    const fixedX = objPos.x + pos.x
    const fixedY = objPos.y + pos.y
    const inView = fixedX >= -objSize && fixedX <= ctx.canvas.width &&
        fixedY >= -objSize && fixedY <= ctx.canvas.height
    return inView
}

const drawImageMid = (ctx, midPos, image, imageSize) => {
    ctx.drawImage(image,  midPos.x-imageSize/2, midPos.y-imageSize/2, imageSize, imageSize)
}

export { drawWrapper, grid2pos, grid2posMid, rectInCanvas, drawImageMid }