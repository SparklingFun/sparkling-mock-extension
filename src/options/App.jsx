import React from "react";
import { Helmet } from "react-helmet"
import { Tab, Icon, Menu, Label } from "semantic-ui-react"
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'
// Components
import MockRecordTable from './components/mockRecordTable'
import ExtensionSettings from './components/extensionSettings'
import OauthPanel from './components/oauthPanel'

const panes = [
    {
        menuItem: (<Menu.Item key='activeMocks'>
            <Icon name='random' />
            接口管理<Label>15</Label>
        </Menu.Item>), pane: <Tab.Pane><MockRecordTable /></Tab.Pane>
    },
    {
        menuItem: (<Menu.Item key='activeMocks'>
            <Icon name='user' />
            登陆管理
        </Menu.Item>), 
        pane: <Tab.Pane><OauthPanel /></Tab.Pane>
    },
    {
        menuItem: (<Menu.Item key='activeMocks'>
            <Icon name='settings' />
            插件设置/关于
        </Menu.Item>), pane: <Tab.Pane><ExtensionSettings /></Tab.Pane>
    },
]

function App() {
    return (
        <div id="main">
            <Helmet>
                <title>Options - Sparkling Mock</title>
                <meta name="description" content="Sparkling Mock Options Page" />
                <style>{`
                    #app {width: 100vw;height: 100vh;position: absolute;display:flex;}
                `}</style>
            </Helmet>
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} grid={{ paneWidth: 12, tabWidth: 3 }} renderActiveOnly={false} panes={panes} className="tab-grid" />
        </div>
    )
}

export default App;