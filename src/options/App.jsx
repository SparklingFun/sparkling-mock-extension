import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet"
import { Tab, Icon, Menu, Label } from "semantic-ui-react"
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
// Components
import MockRecordTable from './components/mockRecordTable'
import ExtensionSettings from './components/extensionSettings'
import OauthPanel from './components/oauthPanel'
import { GlobalMessage } from "../common/GlobalMessage";
import { MessageContext } from "./ContextManager"

function App() {
    const [recordNum, setRecordNum] = useState(0)
    const [oauthed, setOauth] = useState(false)
    const globalMsgRef = useRef(null)
    const addGlobalMsgHandler = (data) => {
        const globalMsg = globalMsgRef.current
        globalMsg.__addMessage(data)
    }

    const setOauthHandler = (bool) => {
        setOauth(bool)
    }

    return (
        <div id="main">
            <Helmet>
                <title>Options - Sparkling Mock</title>
                <meta name="description" content="Sparkling Mock Options Page" />
                <style>{`
                    #app {width: 100vw;height: 100vh;position: absolute;display:flex;}
                `}</style>
            </Helmet>
            <MessageContext.Provider value={{ addMessage: addGlobalMsgHandler }}>
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
                            pane: <Tab.Pane key='online_setting-pane'><OauthPanel setOauthHandler={setOauthHandler} /></Tab.Pane>
                        },
                        {
                            menuItem: (<Menu.Item key='local_setting'>
                                <Icon name='settings' />
                            插件设置/关于
                            </Menu.Item>), pane: <Tab.Pane key='local_setting-pane'><ExtensionSettings onlineCheckboxLock={!oauthed} /></Tab.Pane>
                        },
                    ]
                } className="tab-grid" />
                <GlobalMessage globalMsgRef={globalMsgRef}></GlobalMessage>
            </MessageContext.Provider>
        </div>
    )
}

export default App;