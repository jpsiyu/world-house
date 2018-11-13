import React from 'react'
import Map from './map'
import PageMgr from './page-mgr'

class Entry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='entry'>
            <Map />
            <PageMgr />
        </div>
    }
}

export default Entry