import React from 'react'

class Fundation extends React.Component {
    constructor(props) {
        super(props)
    }

    onHomeClick(){
        
    }

    render() {
        return <div className='fundation'>
            <div className='fundation-icon'>
                <img src='/images/house.png'></img>
            </div>
            <div className='fundation-icon'>
                <img src='/images/sale.png'></img>
            </div>
            <div className='fundation-icon'>
                <img src='/images/travel.png'></img>
            </div>
        </div>
    }
}

export default Fundation