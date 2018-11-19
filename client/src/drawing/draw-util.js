import { MacroMap } from '../macro'

const drawWrapper = (ctx, pos, callback) => {
    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.beginPath()
    callback(ctx, pos)
    ctx.closePath()
    ctx.restore()
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
    rectInCanvas,
    drawImageMid,
    surround,
}