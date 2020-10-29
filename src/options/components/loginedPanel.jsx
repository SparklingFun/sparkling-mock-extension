import React, { useState, useEffect, useContext } from 'react'
import { Divider, Header, Icon, Button, Checkbox, Form } from 'semantic-ui-react'
import { MessageContext } from '../ContextManager'

const LoginedPanel = (props) => {
    const [localUserState, updateLocalUserInfo] = useState(null)
    const { addMessage } = useContext(MessageContext)

    const saveOnlineConfigHandler = () => {}
    const updateSetting = (data) => {
        let newState = JSON.parse(JSON.stringify(localUserState))
        newState.settings.enable_cache = data.value
        updateLocalUserInfo(newState)
        localStorage.setItem(_VARS_.ONLINE_SET, JSON.stringify(newState))
    }

    useEffect(() => {
        const localUserInfo = JSON.parse(localStorage.getItem(_VARS_.ONLINE_SET))
        if (localUserInfo) {
            updateLocalUserInfo(localUserInfo)
            addMessage({
                ok: true,
                header: '授权成功',
                content: '欢迎，' + (localUserInfo.name || localUserInfo.login)
            })
        }
    }, [])

    return (
        <div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='user' />
                    用户设置
                </Header>
            </Divider>
            <Form>
                <Form.Field>
                    <Checkbox label='开启Cloudflare服务缓存' defaultChecked={localUserState && localUserState.settings.enable_cache} onChange={(e, data) => updateSetting(data)} />
                </Form.Field>
                <Button icon labelPosition='left' type='submit' onClick={() => {saveOnlineConfigHandler()}}>
                    <Icon name='save' />
                    保存
                </Button>
            </Form>
            <Divider />
            <Button negative onClick={props.logout}>登出</Button>
        </div>
    )
}

export default LoginedPanel;