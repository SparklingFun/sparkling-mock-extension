import React, { useState } from 'react'
import { Table, Modal, Select, Button } from 'semantic-ui-react'

export default function MockRecord() {
    const [opt, setOpt] = useState(0);
    const [open, setOpen] = React.useState(false)

    return (
        <Table.Row>
            <Table.Cell collapsing><a>Cell</a></Table.Cell>
            <Table.Cell width="10">Cell</Table.Cell>
            <Table.Cell collapsing>
                <Select placeholder='选择情景' options={[]} value={opt} onChange={(e, data) => console.log(data)} />
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button positive>编辑</Button>}
                >
                    <Modal.Header>设置情景</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p>
                                We've found the following gravatar image associated with your e-mail
                                address.
                                            </p>
                            <p>Is it okay to use this photo?</p>
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
            </Table.Cell>
            <Table.Cell collapsing>
                <Button positive>启用</Button>
                <Button negative>禁用</Button>
            </Table.Cell>
        </Table.Row>
    )
}