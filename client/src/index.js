import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import Entry from './entry'
import { log } from './utils'

const render = () => {
    ReactDOM.render(
        <Entry />,
        document.getElementById('root')
    )
}

window.app = new App()
app.init()
app.start(render)