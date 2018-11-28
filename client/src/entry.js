import React from 'react'
import Map from './map'
import PageMgr from './page-mgr'
import Notice from './notice'
import { MapMask } from './map-widgets'

class Entry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='entry'>
            <Map />
            <PageMgr />
            <Notice />
            <MapMask />
        </div>
    }
}

export default Entry