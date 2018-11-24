import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUp, PopUpContent, PopUpTop, MarketGuide } from './page-widgets'
import { getById } from '../house-config'
import axios from 'axios'
import { accountForShort } from '../utils'

class RankInfo {
    constructor(owner, houseId, happiness, land) {
        this.owner = owner
        this.houseId = houseId
        this.happiness = happiness
        this.land = land
    }
}

class PageRank extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rankList: [],
        }
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

    componentDidMount() {
        axios.get('/rank')
            .then(response => {
                const serverList = response.data
                const rankList = []
                for (let i = 0; i < serverList.length; i++) {
                    const serverInfo = serverList[i]
                    const info = new RankInfo(serverInfo.owner, serverInfo.houseId, serverInfo.happiness, serverInfo.land)
                    rankList.push(info)
                }
                this.setState({ rankList, rankList })
            })
    }

    rankList() {
        const items = []
        items.push(<div className='item-title' key='title'>
            <div className='col'><p>Rank</p></div>
            <div className='col'><p>Owner</p></div>
            <div className='col'><p>House</p></div>
            <div className='col'><p>Happiness</p></div>
            <div className='col'><p>Land</p></div>
        </div>)
        for (let i = 0; i < this.state.rankList.length; i++) {
            const info = this.state.rankList[i]
            const conf = getById(info.houseId)
            items.push(<div className='item' key={i}>
                <div className='col'><p>{i + 1}</p></div>
                <div className='col'><p>{accountForShort(info.owner)}</p></div>
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