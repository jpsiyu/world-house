import { houseConfig } from './house-config'

const imageForDrawing = [
    'cloud.png'
]

class ImageMgr {
    constructor() {
        this.container = {}
    }

    imageForDrawing() {
        const drawingList = [
            'cloud.png'
        ]

        for (let i = 0; i < houseConfig.length; i++) {
            const conf = houseConfig[i]
            drawingList.push(conf.img)
        }

        return drawingList
    }

    getImage(name) {
        return this.container[name]
    }

    loadImages() {
        return new Promise((resolve, reject) => {
            let loadedCount = 0
            const drawingList = this.imageForDrawing()
            for (let i = 0; i < drawingList.length; i++) {
                const imageName = drawingList[i]
                const image = new Image()
                image.onload = () => {
                    this.container[imageName] = { obj: image }
                    loadedCount++
                    if (loadedCount >= drawingList.length) {
                        resolve()
                    }
                }
                image.src = `/images/${imageName}`
            }
        })
    }
}

export default ImageMgr