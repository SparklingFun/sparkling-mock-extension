import React, { useEffect } from 'react'
import { Modal, Button, Icon, Form } from 'semantic-ui-react'

export function RecordEditModal(props) {
    const id = props.recordId
    const isCreate = props.isCreate
    const refreshHandler = props.refreshHandler
    const [open, setOpen] = React.useState(false)
    // const [cons, setCons] = React.useState([{}])
    const [record, setRecord] = React.useState({
        name: '',
        category: '',
        url: '',
        id: '',
        mock_data: []
    })

    // useEffect(() => {
    //     console.log(cons)
    // }, [cons])

    const conditionTpl = (data, i) => {
        return (
            <Form.Field key={i}>
                <Form.Group>
                    <Form.Input type="text" placeholder='情景名称' />
                    <Form.Button onClick={(e, data) => removeCon(i)} icon title="删除此情景" >
                        <Icon name="minus" />
                    </Form.Button>
                </Form.Group>
                <textarea></textarea>
            </Form.Field>
        )
    }

    const addEmptyCon = () => {
        // setCons(cons.concat([{}]))
    }

    const removeCon = (i) => {
        let copiedCons = cons.slice(0)
        copiedCons.splice(i, 1)
        // setCons(copiedCons)
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
                        mock_data: data.full_info
                    })
                }
            )
        }
    }, [open])

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button icon style={{marginLeft: '1em'}}>
                <Icon name='edit' />
            </Button>}
        >
            <Modal.Header>编辑Mock数据</Modal.Header>
            <Modal.Content className="mock-record-editor">
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Mock Name' defaultValue={record.name} />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <input placeholder='Uncategoried' defaultValue={record.category} />
                        </Form.Field>
                        <Form.Field>
                            <label>URL</label>
                            <input placeholder='https://some.test.url.com' defaultValue={record.url} />
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
                <Button negative>删除服务端数据</Button>
                <Button color='black' onClick={() => setOpen(false)}>取消</Button>
                <Button
                    content="确认"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}