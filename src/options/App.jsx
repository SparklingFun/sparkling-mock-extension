import React, { useState } from "react";
import { Helmet } from "react-helmet"
import { Tab, Icon, Menu, Label } from "semantic-ui-react"
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'
// Components
import MockRecordTable from './components/mockRecordTable'
import ExtensionSettings from './components/extensionSettings'
import OauthPanel from './components/oauthPanel'

function App() {
    const [recordNum, setRecordNum] = useState(0)

    return (
        <div id="main">
            <Helmet>
                <title>Options - Sparkling Mock</title>
                <meta name="description" content="Sparkling Mock Options Page" />
                <style>{`
                    #app {width: 100vw;height: 100vh;position: absolute;display:flex;}
                `}</style>
            </Helmet>
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} grid={{ paneWidth: 12, tabWidth: 3 }} renderActiveOnly={false} panes={
                [
                    {
                        menuItem: (<Menu.Item key='api'>
                            <Icon name='random' />
                            接口管理<Label>{recordNum}</Label>
                        </Menu.Item>), pane: <Tab.Pane key='api-pane'><MockRecordTable updateNum={setRecordNum} /></Tab.Pane>
                    },
                    {
                        menuItem: (<Menu.Item key='online_setting'>
                            <Icon name='user' />
                            登录管理
                        </Menu.Item>),
                        pane: <Tab.Pane key='online_setting-pane'><OauthPanel /></Tab.Pane>
                    },
                    {
                        menuItem: (<Menu.Item key='local_setting'>
                            <Icon name='settings' />
                            插件设置/关于
                        </Menu.Item>), pane: <Tab.Pane key='local_setting-pane'><ExtensionSettings /></Tab.Pane>
                    },
                ]
            } className="tab-grid" />
        </div>
    )
}

export default App;