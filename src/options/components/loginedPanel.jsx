import React, { useState, useEffect } from 'react'
import { Divider, Header, Icon, Message, Button, Checkbox, Form } from 'semantic-ui-react'
import { ONLINE_SET } from '../vars'

const LoginedPanel = (props) => {
    const [messageStatus, setMsgStatus] = useState(true)
    const [localUserState, updateLocalUserInfo] = useState(null)

    useEffect(() => {
        const localUserInfo = JSON.parse(localStorage.getItem(ONLINE_SET))
        if (localUserInfo) {
            updateLocalUserInfo(localUserInfo)
        }
    }, [])

    return (
        <div>
            {
                messageStatus && localUserState !== null ?
                    <Message
                        onDismiss={() => setMsgStatus(false)}
                        header={`Hello, ${localUserState.name || localUserState.login}`}
                    /> : ''
            }
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='user' />
                    用户设置
                </Header>
            </Divider>
            <Form>
                <Form.Field>
                    <Checkbox label='开启Cloudflare服务缓存' defaultChecked={localUserState && localUserState.settings.enable_cache} />
                </Form.Field>
                <Button icon labelPosition='left' type='submit'>
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