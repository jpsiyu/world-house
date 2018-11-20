const MacroMap = {
    HourseSize: 100,
    HourseImageSize: 60,
    RowNum: 1000,
    ColNum: 1000,
    CanvasWidth: 1000,
    CanvasHeight: 618,
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
}

const MacroViewType = {
    PageGuide: 'PageGuide',
    PageHome: 'PageHome',
    PageMarket: 'PageMarket',
    PageMove: 'PageMove',
    PageOwner: 'PageOwner',
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


export { MacroMap, MacroEventType, MacroViewType, MacroNetworkType, EffectState }