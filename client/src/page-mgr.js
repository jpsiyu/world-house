import React from 'react'
import LoginGuide from './login-guide'
import { MacroEventType, MacroViewType } from './macro'


class PageMgr extends React.Component {
    constructor(props) {
        super(props)
        this.viewCfg = this.genViewCfg()
        this.state = {
            activeView: null,
            viewArgs: {},
        }

        window.eventListener.register(MacroEventType.ShowView, this, this.showView.bind(this))
        window.eventListener.register(MacroEventType.HideView, this, this.hideView.bind(this))
    }

    genViewCfg() {
        const viewCfg = {}
        viewCfg[MacroViewType.LoginGuide] = LoginGuide
        return viewCfg
    }

    showView({ viewName, viewArgs }) {
        const view = this.viewCfg[viewName]
        if (!view) return
        this.setState({
            activeView: viewName,
            viewArgs: viewArgs,
        })
    }

    hideView(viewName) {
        if (!this.state.activeView == viewName) return
        this.setState({
            activeView: null,
            viewArgs: {}
        })
    }

    render() {
        if (this.state.activeView) {
            const ViewClass = this.viewCfg[this.state.activeView]
            return <ViewClass viewArgs={this.state.viewArgs} />
        } else {
            return null
        }
    }
}

export default PageMgr