import { houseConfig } from './house-config'

class ImageMgr {
    constructor() {
        this.container = {}
    }

    getImage(name) {
        return this.container[name]
    }

    loadImages() {
        return new Promise((resolve, reject) => {
            let loadedCount = 0
            for (let i = 0; i < houseConfig.length; i++) {
                const conf = houseConfig[i]
                const image = new Image()
                image.onload = () => {
                    this.container[conf.img] = { obj: image }
                    loadedCount++
                    if (loadedCount >= houseConfig.length) {
                        resolve()
                    }
                }
                image.src = `/images/${conf.img}`
            }
        })
    }
}

export default ImageMgr