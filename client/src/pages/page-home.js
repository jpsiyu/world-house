import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUp, PopUpContent, PopUpTop, MarketGuide } from './page-widgets'
import { getById } from '../house-config'
import { HappinessFormula, EnvHappinessFormula } from './page-widgets'

class PageHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            neighborHappiness: 0,
            envHappiness: 0,
        }
    }

    render() {
        return <PopUp>
            <PopUpTop title='My House' viewType={MacroViewType.PageHome} />
            <PopUpContent>
                {app.player.hasHouse() ? this.whenOwnedHouse(app.player.houseData) : <MarketGuide />}
            </PopUpContent>
        </PopUp>
    }


    whenOwnedHouse(houseData) {
        const conf = getById(houseData.id)
        return <div className='home-content'>
            <div className='top'>
                <div className='left'>
                    <img src={`/images/${conf.img}`}></img>
                </div>
                <div className='mid'>
                    <div className='pair'>
                        <div className='pair-left'>Name</div>
                        <div className='pair-right'>{conf.name}</div>
                    </div>
                    <div className='pair'>
                        <div className='pair-left'>Owner</div>
                        <div className='pair-right'>{app.metamask.accountShort()}</div>
                    </div>
                    <div className='pair'>
                        <div className='pair-left'>Land</div>
                        <div className='pair-right'>({houseData.row}, {houseData.col})</div>
                    </div>
                    <button className='btn-mid btn-violet btn-shadow' onClick={this.onBtnJumpClick.bind(this)}>Jump</button>
                </div>
                <div className='right'>
                    <div className='content'>
                        <div className='title'><p>Total Happiness </p></div>
                        <div className='score'><p>{this.state.neighborHappiness + this.state.envHappiness}</p></div>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <HappinessFormula reportHappiness={this.reportHappiness.bind(this)} />
            </div>
            <div className='bottom'>
                <EnvHappinessFormula reportHappiness={this.reportHappiness.bind(this)} />
            </div>
        </div>
    }

    onBtnJumpClick() {
        app.eventListener.dispatch(MacroEventType.HideView, MacroViewType.PageHome)
        app.eventListener.dispatch(
            MacroEventType.Center2Grid,
            {
                r: app.player.houseData.row,
                c: app.player.houseData.col,
            }
        )
    }

    reportHappiness(happinessType, happiness) {
        if (happinessType == 'neighbor')
            this.setState({ neighborHappiness: happiness })
        else if (happinessType == 'env')
            this.setState({ envHappiness: happiness })

    }
}

export default PageHome
