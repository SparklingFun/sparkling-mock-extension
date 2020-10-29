import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Popup } from 'semantic-ui-react'
import { Modal, Button, Icon, Form } from 'semantic-ui-react'

export function RecordEditModal(props) {
    const id = props.recordId
    const addMessage = props.addMessage
    const isCreate = props.isCreate
    const triggerComponent = props.triggerComponent
    const refreshHandler = props.refreshHandler
    const [open, setOpen] = React.useState(false)
    const [record, setRecord] = React.useState({
        name: '',
        category: '',
        url: '',
        id: '',
        mock_data: []
    })
    const [delConfirm, setDelConfirm] = useState(false)
    const [formValid, setFormValid] = useState({
        name: false,
        url: false,
        category: false
    })
    const [createLoading, updateCreateLoading] = useState(false)

    const conditionTpl = (data, i) => {
        return (
            <Form.Field key={i}>
                <Form.Group>
                    <Form.Input type="text" placeholder='情景名称' onChange={(e, data) => {modifyCon('name', i, e, data)}} value={data.name} />
                    <Form.Button onClick={(e, data) => removeCon(i)} icon title="删除此情景" >
                        <Icon name="minus" />
                    </Form.Button>
                    <Form.Input type="number" placeholder='HTTP状态码' onChange={(e, data) => {modifyCon('status', i, e, data)}} value={data.status} />
                </Form.Group>
                <Form.TextArea onChange={(e, data) => {modifyCon('data', i, e, data)}} value={data.data}></Form.TextArea>
            </Form.Field>
        )
    }

    useEffect(() => {
        if (open && !isCreate) {
            refreshHandler().then(
                ok => {
                    let data = localStorage.getItem(id)
                    data = JSON.parse(data)
                    // {"url":"https://this-is-a-test-url.sparkling.fun","status":false,"con_id":"","full_info":[{"status":200,"delay":0,"data":"{\"test\": 2}","name":"啦啦啦啦200","con_id":"oWLbMQ_C"},{"status":404,"delay":0,"data":"{\"test\": 4}","name":"啦啦啦404","con_id":"0y9T_p4X"}],"name":"嘻嘻嘻嘻嘻","id":"AXXPSitNmBax"}
                    setRecord({
                        name: data.name,
                        url: data.url,
                        category: data.category,
                        mock_data: data.full_info,
                        id: data.id
                    })
                    setFormValid({
                        name: data.name || false,
                        url: data.url || false,
                        category: data.category || false
                    })
                }
            ).catch(e => {
                if(e.response.status === 404) {
                    addMessage({
                        ok: false,
                        header: "删除失败",
                        content: "数据不存在或已删除！"
                    })
                    localStorage.removeItem(id)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }
            })
        }
    }, [open])

    // functions
    const delOnlineRecordHandler = () => {
        let apiPath = _VARS_.extensionSettings.getEnableOnline() ? _VARS_.ONLINE_DOMAIN : _VARS_.extensionSettings.getMockPath()
        Axios.post(apiPath + '/delete', {
            id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Sparkling-Client-Token': _VARS_.extensionSettings.getToken()
            }
        }).then(
            resp => {
                if(resp.data.code === 1) {
                    setTimeout(() => {
                        addMessage({
                            ok: true,
                            header: '删除成功'
                        })
                    }, 2000)
                    setDelConfirm(false)
                    localStorage.removeItem(id)
                    window.location.reload()
                } else {
                    addMessage({
                        ok: false,
                        header: '删除失败'
                    })
                }
            }
        ).catch(e => {
            // console.log(e.response)
            if(e.response.status === 404) {
                addMessage({
                    ok: false,
                    header: "删除失败",
                    content: "数据不存在或已删除！"
                })
            }
        })
        
    }

    const addEmptyCon = () => {
        let newRecord = JSON.parse(JSON.stringify(record))
        newRecord.mock_data.push({
            "status": 200,
            "delay": 0,
            "data": "",
            "name": "",
            "mock_data": []
        })
        setRecord(newRecord)
    }

    const removeCon = (i) => {
        let newRecord = JSON.parse(JSON.stringify(record))
        let copiedCons = newRecord.mock_data.slice(0)
        copiedCons.splice(i, 1)
        newRecord.mock_data = copiedCons
        setRecord(newRecord)
    }

    const modifyCon = (prop, i, e, data) => {
        let newRecord = JSON.parse(JSON.stringify(record))
        let copiedCons = newRecord.mock_data.slice(0)
        copiedCons[i][prop] = data.value
        newRecord.mock_data = copiedCons
        setRecord(newRecord)
    }

    const inputValChange = (prop, e, data) => {
        // update form valid
        let newFormValid = JSON.parse(JSON.stringify(formValid))
        newFormValid[prop] = (data.value !== '')
        setFormValid(newFormValid)
        // update form value
        let newRecord = JSON.parse(JSON.stringify(record))
        let newProp = {}
        newProp[prop] = data.value
        Object.assign(newRecord, newProp)
        setRecord(newRecord)
    }

    const createRecordHandler = () => {
        // Check record valid
        if(!record.name) {
            addMessage({
                ok: false,
                header: '数据不完整',
                content: '模拟数据缺少`name`'
            })
            return;
        }
        if(!record.category) {
            addMessage({
                ok: false,
                header: '数据不完整',
                content: '模拟数据缺少`category`'
            })
            return;
        }
        if(!record.url) {
            addMessage({
                ok: false,
                header: '数据不完整',
                content: '模拟数据缺少`url`'
            })
            return;
        }
        if(record.mock_data.length <= 0) {
            addMessage({
                ok: false,
                header: '数据不完整',
                content: '模拟数据至少应有一种情景！'
            })
            return;
        }
        for(let i in record.mock_data) {
            if(!record.mock_data[i].status || !record.mock_data[i].data || !record.mock_data[i].name) {
                addMessage({
                    ok: false,
                    header: '数据不完整',
                    content: `场景${(parseInt(i) + 1)}的数据有遗漏`
                })
                return;
            }
            try {
                JSON.parse(record.mock_data[i].data)
            } catch(e) {
                addMessage({
                    ok: false,
                    header: '数据不合法',
                    content: `场景"${record.mock_data[i].name}"的数据非JSON！`
                })
                return;
            }
        }
        updateCreateLoading(true)
        let apiPath = _VARS_.extensionSettings.getEnableOnline() ? _VARS_.ONLINE_DOMAIN : _VARS_.extensionSettings.getMockPath()
        Axios.post(apiPath + (isCreate ? '/create' : '/update'), record, {
            headers: {
                'Content-Type': 'application/json',
                'Sparkling-Client-Token': _VARS_.extensionSettings.getToken()
            }
        }).then(
            resp => {
                if(resp.data.code === 1) {
                    updateCreateLoading(false)
                    localStorage.setItem(resp.data.id, JSON.stringify({
                        name: record.name,
                        status: false,
                        con_id: "",
                        id: resp.data.id,
                        full_info: []
                    }))
                    if(isCreate) {
                        window.prompt ? window.prompt("创建成功，记录id为：", resp.data.id) : alert("创建成功，记录id为："+resp.data.id)
                    } else {
                        addMessage({
                            ok: true,
                            header: '更新成功'
                        })
                    }
                    window.location.reload()
                }
                if(resp.data.code === 0) {
                    updateCreateLoading(false)
                    addMessage({
                        ok: false,
                        header: '创建失败'
                    })
                }
            }
        ).catch(e => {
            console.log(e)
        })
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={triggerComponent || <Button icon style={{marginLeft: '1em'}}>
                <Icon name='edit' />
            </Button>}
        >
            <Modal.Header>编辑Mock数据</Modal.Header>
            <Modal.Content className="mock-record-editor">
                <Modal.Description>
                    <Form>
                        <Form.Field required error={!formValid.name}>
                            <label>Name</label>
                            <Form.Input placeholder='Mock Name' name="name" defaultValue={record.name} onChange={(e, data) => inputValChange('name', e, data)} />
                        </Form.Field>
                        <Form.Field required error={!formValid.category}>
                            <label>Category</label>
                            <Form.Input placeholder='Uncategoried' name="category" defaultValue={record.category} onChange={(e, data) => inputValChange('category', e, data)} />
                        </Form.Field>
                        <Form.Field required error={!formValid.url}>
                            <label>URL</label>
                            <Form.Input placeholder='https://some.test.url.com' name="url" defaultValue={record.url} onChange={(e, data) => inputValChange('url', e, data)} />
                        </Form.Field>
                        <h3>Conditions</h3>
                        {
                            record.mock_data.map((con, i) => {
                                return conditionTpl(con, i)
                            })
                        }
                        <Button onClick={() => addEmptyCon()}>增加情景</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {isCreate ? null : <Popup trigger={
                    <Button negative>删除服务端数据</Button>
                } content={
                    <Button positive onClick={() => delOnlineRecordHandler()}>确认删除</Button>
                } on="click" position="top center"
                    open={delConfirm}
                    onOpen={() => setDelConfirm(true)}
                    onClose={() => setDelConfirm(false)}
                />}
                <Button color='black' onClick={() => {
                    setOpen(false)
                    setFormValid({
                        name: false,
                        category: false,
                        url: false
                    })
                }}>取消</Button>
                <Button
                    content="确认"
                    labelPosition='right'
                    icon='checkmark'
                    type='submit'
                    positive
                    loading={createLoading}
                    onClick={() => {
                        createRecordHandler()
                    }}
                />
            </Modal.Actions>
        </Modal>
    )
}