import React from 'react'
import { Divider, Header, Icon, Input, Button, Checkbox, Form } from 'semantic-ui-react'

const ExtensionSettings = () => (
    <Form>
        <Divider horizontal>
            <Header as='h4'>
                <Icon name='linkify' />
                全局配置
            </Header>
        </Divider>
        <Form.Field width='2'>
            <label>启用/禁用插件</label>
            <Checkbox toggle />
        </Form.Field>
        <Form.Field width='14'>
            <label>接口API地址</label>
            <Input action={{
                color: 'teal',
                labelPosition: 'right',
                icon: 'save',
                content: '保存',
            }}
                defaultValue='' placeholder='https://' />
        </Form.Field>
        <Divider horizontal>
            <Header as='h4'>
                <Icon name='warning sign' />
                Danger Zone
            </Header>
        </Divider>
        <Form.Field>
            <Button negative>清理本地缓存</Button>
        </Form.Field>
        <Divider horizontal>
            <Header as='h4'>
                <Icon name='info circle' />
                关于插件
            </Header>
        </Divider>
    </Form>
)

export default ExtensionSettings