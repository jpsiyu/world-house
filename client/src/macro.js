const MacroMap = {
    HouseSize: 100,
    HouseImageSize: 60,
    EnvImageSize: 80,
    RowNum: 1000,
    ColNum: 1000,
    CanvasWidth: 1000,
    CanvasHeight: 618,
    LittleMapWidth: 180,
    LittleMapHeight: 180,
    LittlePointSize: 10,
    Surround: 5,
    Neighbor: 2,
}

const MacroEventType = {
    ShowView: 'ShowView',
    HideView: 'HideView',
    PlayerMode: 'PlayerMode',
    BuyHouse: 'BuyHouse',
    HouseMove: 'HouseMove',
    UpdateSurround: 'UpdateSurround',
    Notice: 'Notice',
    Center2Grid: 'Center2Grid',
    DrawCloudEffect: 'DrawCloudEffect',
    Loading: 'Loading',
}

const MacroViewType = {
    PageGuide: 'PageGuide',
    PageHome: 'PageHome',
    PageMarket: 'PageMarket',
    PageMove: 'PageMove',
    PageENV: 'PageENV',
    PageOwner: 'PageOwner',
    PageRank: 'PageRank',
}

const MacroNetworkType = {
    MainNet: 1,
    Morden: 2,
    Ropsten: 3,
    Rinkeby: 4,
    Kovan: 42,
    Private: 999,
}

const EffectState = {
    CloudIn: 'CloudIn',
    CloudStay: 'CloudStay',
    CloudOut: 'CloudOut',
    CloudHide: 'CloudHide'
}

const HouseType = {
    House: 1,
    Env: 2,
}


export { MacroMap, MacroEventType, MacroViewType, MacroNetworkType, EffectState, HouseType }