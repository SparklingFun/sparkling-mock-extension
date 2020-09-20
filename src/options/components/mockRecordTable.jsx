import React, { useState } from 'react'
import { Icon, Modal, Table, Button, Select } from 'semantic-ui-react'
import styled from 'styled-components';
const StyledButton = styled(Button)({
    color: 'red!important'
});

const options = [
    {
        key: 'Condition 1',
        value: 'con1',
        text: '不使用'
    },
    {
        key: 'Condition 2',
        value: 'con2',
        text: '使用'
    }
]

const MockRecordTable = () => {
    const [opt, setOpt] = useState(options[0].value);
    const [open, setOpen] = React.useState(false)

    return (
        <div className="table-box">
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>接口名称</Table.HeaderCell>
                        <Table.HeaderCell>请求地址</Table.HeaderCell>
                        <Table.HeaderCell>接口状态/编辑</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing><a>Cell</a></Table.Cell>
                        <Table.Cell width="10">Cell</Table.Cell>
                        <Table.Cell collapsing>
                            <Select placeholder='Select your country' options={options} value={opt} onChange={(e, data) => console.log(data)} />
                            <Button.Group>
                                <Button positive>编辑</Button>
                                <Button.Or />
                                <Button negative>删除</Button>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <StyledButton onClick={() => setOpt(options[1].value)}>测试</StyledButton>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Show Modal</Button>}
            >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
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
                        Nope
                    </Button>
                    <Button
                        content="Yep, that's me"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => setOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>

            <style jsx>{`
                .table-box {
                    width: 80%;
                    margin: 0 auto;
                    a {
                        color: skyblue;
                    }
                    td {
                        background-color: #eeeeee;
                    }
                }
            `}</style>
        </div>
    )
}

export default MockRecordTable;