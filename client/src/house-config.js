import { HouseType } from './macro'

const houseConfig = [
    { id: 1, type: HouseType.House, name: 'House A', img: 'house1.png', priceRatio: 1 },
    { id: 2, type: HouseType.House, name: 'House B', img: 'house2.png', priceRatio: 1.5 },
    { id: 3, type: HouseType.House, name: 'House C', img: 'house3.png', priceRatio: 2 },
    { id: 4, type: HouseType.House, name: 'House D', img: 'house4.png', priceRatio: 2.5 },
    { id: 5, type: HouseType.House, name: 'House E', img: 'house5.png', priceRatio: 3.0 },

    { id: 100, type: HouseType.Env, name: 'Lake', img: 'env1.png', priceRatio: 10 },
    { id: 101, type: HouseType.Env, name: 'Mall', img: 'env2.png', priceRatio: 10 },
    { id: 102, type: HouseType.Env, name: 'Hospital', img: 'env3.png', priceRatio: 10 },
]

const getById = (id) => {
    let conf
    for (let i = 0; i < houseConfig.length; i++) {
        if (houseConfig[i].id == id) {
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