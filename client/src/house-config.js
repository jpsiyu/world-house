const houseConfig = [
    { id: 1, img: 'house1.png', priceRatio: 1 },
    { id: 2, img: 'house2.png', priceRatio: 1.2 },
]

const getById = (id) => {
    let conf
    for(let i = 0; i < houseConfig.length; i++){
        if(houseConfig[i].id == id){
            conf = houseConfig[i]
            break
        }
    }
    return conf
}


export {
    houseConfig,
    getById,
}