import React, { useState, useEffect, useContext } from 'react'
import { Divider, Header, Icon, Button, Checkbox, Form } from 'semantic-ui-react'
import { MessageContext } from '../ContextManager'
import Axios from 'axios'

const LoginedPanel = (props) => {
    const [localUserState, updateLocalUserState] = useState(null)
    const { addMessage } = useContext(MessageContext)

    const saveOnlineConfigHandler = () => {
        Axios.post(_VARS_.ONLINE_DOMAIN + 'settings/save', {
            ...localUserState.settings
        }).then(
            res => {
                if(res.data.code === 1) {
                    addMessage({
                        ok: true,
                        header: '提交成功',
                        content: '用户设置已保存'
                    })
                } else {
                    console.log('save error.')
                }
            }
        ).catch(e => {
            console.log(e)
        })
    }

    const updateSetting = (data) => {
        let newState = JSON.parse(JSON.stringify(localUserState))
        newState.settings.enable_cache = data
        localStorage.setItem(_VARS_.ONLINE_SET, JSON.stringify(newState))
        updateLocalUserState(newState)
    }

    useEffect(() => {
        const localUserInfo = JSON.parse(localStorage.getItem(_VARS_.ONLINE_SET))
        if (localUserInfo) {
            updateLocalUserState(localUserInfo)
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
                    <Checkbox label='开启Cloudflare服务缓存' checked={localUserState && localUserState.settings.enable_cache ? true : false} onChange={(e, data) => updateSetting(data.checked)} />
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