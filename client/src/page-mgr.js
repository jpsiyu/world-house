import React from 'react'
import PageGuide from './pages/page-guide'
import PageHome from './pages/page-home'
import PageMarket from './pages/page-market'
import PageMove from './pages/page-move'
import PageENV from './pages/page-env'
import PageOwner from './pages/page-owner'
import PageRank from './pages/page-rank'
import { MacroEventType, MacroViewType } from './macro'


class PageMgr extends React.Component {
    constructor(props) {
        super(props)
        this.viewCfg = this.genViewCfg()
        this.state = {
            activeView: null,
            viewArgs: {},
        }

        app.eventListener.register(MacroEventType.ShowView, this, this.showView.bind(this))
        app.eventListener.register(MacroEventType.HideView, this, this.hideView.bind(this))
    }

    genViewCfg() {
        const viewCfg = {}
        viewCfg[MacroViewType.PageGuide] = PageGuide
        viewCfg[MacroViewType.PageHome] = PageHome
        viewCfg[MacroViewType.PageMarket] = PageMarket
        viewCfg[MacroViewType.PageMove] = PageMove
        viewCfg[MacroViewType.PageOwner] = PageOwner
        viewCfg[MacroViewType.PageENV] = PageENV
        viewCfg[MacroViewType.PageRank] = PageRank
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