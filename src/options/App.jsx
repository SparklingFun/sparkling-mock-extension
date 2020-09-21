import React from "react";
import { Helmet } from "react-helmet"
import { Tab, Icon, Menu, Label } from "semantic-ui-react"
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'
// Components
import MockRecordTable from './components/mockRecordTable'
import ExtensionSettings from './components/extensionSettings'

const panes = [
    {
        menuItem: (<Menu.Item key='activeMocks'>
            <Icon name='random' />
            接口管理<Label>15</Label>
        </Menu.Item>), render: () => <Tab.Pane><MockRecordTable /></Tab.Pane>
    },
    {
        menuItem: (<Menu.Item key='activeMocks'>
            <Icon name='user' />
            登陆管理
        </Menu.Item>), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
    },
    { menuItem: (<Menu.Item key='activeMocks'>
            <Icon name='settings' />
            插件设置/关于
        </Menu.Item>), render: () => <Tab.Pane><ExtensionSettings /></Tab.Pane> },
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
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} grid={{ paneWidth: 12, tabWidth: 3 }} panes={panes} className="tab-grid" />
            <style jsx>{`
                #main {
                    width: 95%;
                    height: 95%;
                    margin: auto;
                    .tab-grid {
                        width: 100%;
                        max-height: 100%;
                    }
                }
            `}</style>
        </div>
    )
}

export default App;