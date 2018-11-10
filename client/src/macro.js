const MacroMap = {
    HourseSize: 100,
    HourseImageSize: 60,
    RowNum: 1000,
    ColNum: 1000,
    CanvasWidth: 800,
    CanvasHeight: 400,
    Surround: 3,
}

const MacroEventType = {
    ShowView: 'ShowView',
    HideView: 'HideView',
    PlayerMode: 'PlayerMode',
}

const MacroViewType = {
    LoginGuide: 'LoginGuide',
    PageHome: 'PageHome',
    PageMarket: 'PageMarket',
}

const MacroNetworkType = {
    MainNet: 1,
    Morden: 2,
    Ropsten: 3,
    Rinkeby: 4,
    Kovan: 42,
    Private: 999,
}

export {MacroMap, MacroEventType, MacroViewType, MacroNetworkType}