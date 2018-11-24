import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUp, PopUpContent, PopUpTop, MarketGuide } from './page-widgets'
import { getById } from '../house-config'

class PageRank extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <PopUp>
            <PopUpTop title='Happiness rank' viewType={MacroViewType.PageHome} />
            <PopUpContent>
                <div className='rank-content'>
                    {this.rankList()}
                </div>
            </PopUpContent>
        </PopUp>
    }

    rankList() {
        const rankInfo = [
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
            { owner: '0x1234', houseId: 1, happiness: 20, land: { r: 1, c: 1 } },
        ]
        const items = []
        items.push(<div className='item-title' key='title'>
            <div className='col'><p>Rank</p></div>
            <div className='col'><p>Owner</p></div>
            <div className='col'><p>House</p></div>
            <div className='col'><p>Happiness</p></div>
            <div className='col'><p>Land</p></div>
        </div>)
        for (let i = 0; i < rankInfo.length; i++) {
            const info = rankInfo[i]
            const conf = getById(info.houseId)
            items.push(<div className='item' key={i}>
                <div className='col'><p>{i + 1}</p></div>
                <div className='col'><p>{info.owner}</p></div>
                <div className='col'><img src={`/images/${conf.img}`}></img></div>
                <div className='col'><p>{info.happiness}</p></div>
                <div className='col'>
                    <p>({info.land.r}, {info.land.c})</p>
                    <button className='btn-go btn-violet btn-shadow-small'>Go</button>
                </div>
            </div>)
        }
        return items
    }
}

export default PageRank