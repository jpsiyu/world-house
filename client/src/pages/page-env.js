import React from 'react'
import { PopUpTop } from './page-widgets'
import { MacroViewType } from '../macro'

class PageENV extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='Environment' viewType={MacroViewType.PageMarket} />
                {this.renderContainer()}
            </div>
        </div>
    }

    renderContainer() {
        return <div className='popup-content'>
            HaHa
        </div>
    }
}

export default PageENV