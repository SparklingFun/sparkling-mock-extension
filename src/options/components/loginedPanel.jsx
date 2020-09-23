import React, { useState } from 'react'
import { Divider, Header, Icon, Message, Button, Checkbox, Form } from 'semantic-ui-react'

const LoginedPanel = (props) => {
    const [messageStatus, setMsgStatus] = useState(true)

    return (
        <div>
            {
                messageStatus ?
                    <Message
                        onDismiss={() => setMsgStatus(false)}
                        header='Welcome back!'
                        content='This is a special notification which you can dismiss.'
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
                    <Checkbox label='开启Cloudflare服务缓存' />
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