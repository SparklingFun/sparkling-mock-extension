import React, { useEffect, useState, useContext } from 'react'
import { Divider, Header, Icon, Input, Button, Checkbox, Form, Popup } from 'semantic-ui-react'
import { MessageContext } from '../ContextManager'

const ExtensionSettings = (props) => {
    let config = { "status": false, "path": "http://localhost:3001/mock", "param": "ajaxID" }
    const onlineCheckboxLock = props.onlineCheckboxLock
    const [useOnlineSrv, setUseOnlineSrv] = useState(false)
    const [enableState, setEnableState] = useState(config.status)
    const [apiPath, setApiPath] = useState(config.path)
    const [customParam, setCustomParam] = useState(config.param)
    const [initFinish, setInitFinish] = useState(false)
    const [enableCollectErr, setEnableCollectErr] = useState(true)

    const { addMessage } = useContext(MessageContext)

    useEffect(() => {
        // When plugin first load, use localStorage config
        let storageConfig = localStorage.getItem('__extension-settings__')
        let enableOnline = localStorage.getItem('__extension-enableOnline__')
        if (enableOnline === "true") {
            setUseOnlineSrv(true)
        }
        let collectFlag = localStorage.getItem('__SPARKLING_DO_NOT_TRACK__')
        if (collectFlag === 1) {
            setEnableCollectErr(false)
        }
        if (storageConfig) {
            config = JSON.parse(storageConfig)
            setEnableState(config.status)
            setApiPath(config.path)
            setCustomParam(config.param)
        } else {
            localStorage.setItem('__extension-settings__', JSON.stringify(config))
        }
        setInitFinish(true)
    }, [])

    useEffect(() => {
        config.status = enableState
        localStorage.setItem('__extension-settings__', JSON.stringify(config))
    }, [enableState])

    useEffect(() => {
        if (useOnlineSrv) {
            localStorage.setItem('__extension-enableOnline__', true)
        } else {
            setApiPath(config.path)
            localStorage.setItem('__extension-enableOnline__', false)
        }
    }, [useOnlineSrv])

    useEffect(() => {
        config.param = customParam
        localStorage.setItem('__extension-settings__', JSON.stringify(config))
    }, [customParam])

    const saveInputHandler = (e) => {
        console.log(e)
    }

    return (
        <Form className="config-form">
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='configure' />
                    全局配置
                </Header>
            </Divider>
            <Form.Field width='14'>
                {/* <label>启用/禁用插件</label> */}
                <Checkbox toggle label="启用/禁用插件" checked={enableState} onChange={() => setEnableState(!enableState)} />
                <Popup
                    trigger={
                        <Checkbox label="是否使用Sparkling Mock服务？"
                        disabled={onlineCheckboxLock}
                        toggle checked={useOnlineSrv} onChange={() => {
                            if (initFinish) {
                                // clean all mock records in localStorage
                                let extSettingsReg = /^__extension-|__SPARKLING_(.*)/
                                let _local = Object.keys(localStorage)
                                for (let i in _local) {
                                    if (!extSettingsReg.test(_local[i])) {
                                        localStorage.removeItem(_local[i])
                                    }
                                }
                                addMessage({
                                    ok: true,
                                    header: '已完成',
                                    content: '本地缓存清理完毕！'
                                })
                            }
                            setUseOnlineSrv(!useOnlineSrv)
                        }} />
                    }
                    content={<p style={{ color: "red" }}>切换本地/线上服务会移除您的本地缓存！</p>}
                    basic
                />
                <Checkbox toggle label="允许插件收集错误信息" checked={enableCollectErr} onChange={(e, data) => {
                    if(enableCollectErr) {
                        localStorage.setItem('__SPARKLING_DO_NOT_TRACK__', 1)
                    } else {
                        localStorage.removeItem('__SPARKLING_DO_NOT_TRACK__')
                    }
                    setEnableCollectErr(!enableCollectErr)
                    if(!data.checked) {
                        window.open(_VARS_.ONLINE_PAGE+'do-not-track')
                    } else {
                        window.open(_VARS_.ONLINE_PAGE+'enable-track')
                    }
                }} />
            </Form.Field>
            <Form.Field width='14'>
                <label>接口API地址</label>
                <Input action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'save',
                    content: '保存'
                }}
                    value={useOnlineSrv ? _VARS_.ONLINE_DOMAIN : apiPath} placeholder='https://' disabled={useOnlineSrv} />
            </Form.Field>
            <Form.Field width='8'>
                <label>自定义参数</label>
                <Input action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'save',
                    content: '保存',
                    onClick: (e) => saveInputHandler
                }}
                    defaultValue={customParam} />
            </Form.Field>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='warning sign' />
                    Danger Zone
                </Header>
            </Divider>
            <Form.Field>
                <Button negative onClick={() => {
                    // clean all mock records in localStorage
                    let extSettingsReg = /^__extension-|__SPARKLING_(.*)/
                    let _local = Object.keys(localStorage)
                    for (let i in _local) {
                        if (!extSettingsReg.test(_local[i])) {
                            localStorage.removeItem(_local[i])
                        }
                    }
                    addMessage({
                        ok: true,
                        header: '已完成',
                        content: '本地缓存清理完毕！'
                    })
                }}>清理本地缓存</Button>
            </Form.Field>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='info circle' />
                    关于插件
                </Header>
            </Divider>
            <p><a href={_VARS_.ONLINE_PAGE + 'policy/term'}>使用条款与须知</a></p>
        </Form>
    )
}

export default ExtensionSettings