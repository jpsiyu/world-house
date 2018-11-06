import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'

class Fundation extends React.Component {
    constructor(props) {
        super(props)
    }

    onHomeClick(){
       app.eventListener.dispatch(MacroEventType.ShowView, {viewName: MacroViewType.PageHome})
    }

    onMarketClick(){
       app.eventListener.dispatch(MacroEventType.ShowView, {viewName: MacroViewType.PageMarket})
    }

    render() {
        return <div className='fundation'>
            <div className='fundation-icon' onClick={this.onHomeClick.bind(this)}>
                <img src='/images/house.png'></img>
            </div>
            <div className='fundation-icon' onClick={this.onMarketClick.bind(this)}>
                <img src='/images/sale.png'></img>
            </div>
            <div className='fundation-icon'>
                <img src='/images/travel.png'></img>
            </div>
        </div>
    }
}

export default Fundation