import React, { useEffect } from 'react'
import { Modal, Button, Icon, Form } from 'semantic-ui-react'

export function RecordEditModal(props) {
    const id = props.id
    const refreshHandler = props.refreshHandler
    const [open, setOpen] = React.useState(false)
    const [cons, setCons] = React.useState([{}])

    useEffect(() => {
        console.log(cons)
    }, [cons])

    const conditionTpl = (data, i) => {
        return (
            <Form.Field key={i}>
                <input type="text" placeholder='情景名称' />
                <textarea></textarea>
                <Button onClick={(e, data) => removeCon(i)} icon>
                    <Icon name="minus" />
                </Button>
            </Form.Field>
        )
    }

    const addEmptyCon = () => {
        setCons(cons.concat([{}]))
    }

    const removeCon = (i) => {
        let copiedCons = cons.slice(0)
        copiedCons.splice(i, 1)
        setCons(copiedCons)
    }

    useEffect(() => {
        if (open) {
            refreshHandler()
        }
    }, [open])

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button icon>
                <Icon name='edit' />
            </Button>}
        >
            <Modal.Header>编辑Mock数据</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Mock Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <input placeholder='Uncategoried' />
                        </Form.Field>
                        <Form.Field>
                            <label>URL</label>
                            <input placeholder='https://some.test.url.com' />
                        </Form.Field>
                        <h3>Conditions</h3>
                        {
                            cons.map((con, i) => {
                                return conditionTpl(con, i)
                            })
                        }
                        <Button onClick={() => addEmptyCon()}>增加情景</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    取消
                        </Button>
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