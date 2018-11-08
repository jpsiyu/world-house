const config = {
    'house1': 'house1.png',
    'house2': 'house2.png',
}

class ImageMgr {
    constructor() {
        this.container = {}
    }

    getImage(name) {
        return this.container[name]
    }

    loadImages() {
        return new Promise((resolve, reject) => {
            let name
            let loadedCount = 0
            const imageCount = Object.keys(config).length
            Object.keys(config).forEach(key => {
                name = config[key]
                const image = new Image()
                image.onload = () => {
                    this.container[key] = { name, obj: image }
                    loadedCount++
                    if (loadedCount >= imageCount) {
                        resolve()
                    }
                }
                image.src = `/images/${name}`
            })
        })
    }
}

export default ImageMgr