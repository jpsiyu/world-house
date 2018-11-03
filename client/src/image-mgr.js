const config = {
    'house1': 'house1.png',
    'house2': 'house2.png',
}

class ImageMgr{
    constructor(){
        this.container = {}
        this.loadedCount = 0
        this.imageCount = Object.keys(config).length
    }

    getImage(name){
        return this.container[name]
    }
   
    loadImages(finishCallback){
        let name
        Object.keys(config).forEach(key => {
            name = config[key]
            const image = new Image()
            image.onload = () => {
                this.container[key] = {name, obj: image}
                this.finish(finishCallback)
            }
            image.src = `/images/${name}`
        })
    }

    finish(finishCallback){
        this.loadedCount++
        if(this.loadedCount >= this.imageCount){
            finishCallback()
        }
    }
}

export default ImageMgr