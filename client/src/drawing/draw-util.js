import { MacroMap } from '../macro'

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

const posToGrid = (pos) => {
    const r = Math.floor(pos.y / MacroMap.HourseSize)
    const c = Math.floor(pos.x / MacroMap.HourseSize)
    return { r, c }
}

const rectInCanvas = (ctx, objPos, pos, objSize) => {
    const fixedX = objPos.x + pos.x
    const fixedY = objPos.y + pos.y
    const inView = fixedX >= -objSize && fixedX <= ctx.canvas.width &&
        fixedY >= -objSize && fixedY <= ctx.canvas.height
    return inView
}

const drawImageMid = (ctx, midPos, image, imageSize) => {
    ctx.drawImage(image, midPos.x - imageSize / 2, midPos.y - imageSize / 2, imageSize, imageSize)
}

const surround = (r, c, distance) => {
    const rows = []
    const cols = []
    for (let ri = r - distance; ri <= r + distance; ri++) {
        if (ri < 0 || ri >= MacroMap.RowNum) continue
        for (let ci = c - distance; ci <= c + distance; ci++) {
            if (ci < 0 || ci >= MacroMap.ColNum) continue
            rows.push(ri)
            cols.push(ci)
        }
    }
    return { rows, cols }
}

export {
    drawWrapper,
    grid2pos,
    grid2posMid,
    rectInCanvas,
    drawImageMid,
    surround,
    posToGrid,
}