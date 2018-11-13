import React from 'react'
import { MacroEventType, MacroViewType } from '../macro'
import { PopUpTop } from './page-widgets'

class PageMove extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='overflow'>
            <div className='popup'>
                <PopUpTop title='House Move' viewType={MacroViewType.PageMove} />
                <div className='popup-content'>
                    <p>HaHa</p>
                </div>
            </div>
        </div>
    }
}

export default PageMove
