import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import Entry from './entry'

window.app = new App()

app.init()
app.imageMgr.loadImages(() => {
    ReactDOM.render(
        <Entry />,
        document.getElementById('root')
    )
})