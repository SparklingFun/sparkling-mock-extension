import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Select, Button, Icon } from 'semantic-ui-react'
import { RecordEditModal } from './recordEditModal'
import { extensionSettings, ONLINE_DOMAIN } from '../vars'

export default function MockRecord(props) {
    const info = props.info
    const [opt, setOpt] = useState(0);
    const [conList, setConList] = useState([])

    const switchConHandler = (data) => {
        setOpt(data.value)
    }

    const mockDataTransOptions = (arr) => {
        let result = []
        for (let i in arr) {
            result.push({
                key: arr[i].con_id,
                value: arr[i].con_id,
                text: arr[i].name || arr[i].con_id
            })
        }
        return result
    }

    const refreshDataHandler = () => {
        let id = info.id
        let apiPath = extensionSettings.getEnableOnline() ? ONLINE_DOMAIN : extensionSettings.getMockPath()
        Axios.get(apiPath + '/find?id=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Sparkling-Client-Token': extensionSettings.getToken()
            }
        }).then(
            resp => {
                if (resp.data.code !== 1) {
                    console.log(`Get Mock Full Data Fail, id: ${data.info.id}.`);
                    return;
                };
                if (resp.data.data.id !== id) {
                    console.log('Record have some problem');
                    return;
                }
                let parsedData = {
                    url: resp.data.data.url,
                    status: false,
                    con_id: '',
                    full_info: resp.data.data.mock_data,
                    name: resp.data.data.name,
                    id: resp.data.data.id
                }
                localStorage.setItem(id, JSON.stringify(parsedData))
                props.manualUpdate(parsedData)
                setConList([{
                    key: 0,
                    value: 0,
                    text: '禁用'
                }, ...mockDataTransOptions(parsedData.full_info)])
            },
            err => {
                console.log(err)
            }
        )
    }

    useEffect(() => {
        setConList([{
            key: 0,
            value: 0,
            text: '禁用'
        }, ...mockDataTransOptions(info.full_info)])
    }, [])

    // useEffect(() => {
    //     localStorage.setItem(info.id, JSON.stringify(info))
    // }, [info])

    return (
        <Table.Row>
            <Table.Cell collapsing><a>{info.name}</a></Table.Cell>
            <Table.Cell width="10">{info.url}</Table.Cell>
            <Table.Cell collapsing>
                <Select placeholder='选择情景' options={conList} value={opt} onChange={(e, data) => switchConHandler(data)} />
                <RecordEditModal id={info.id} refreshHandler={() => refreshDataHandler()} ></RecordEditModal>
                <Button icon onClick={() => refreshDataHandler()}>
                    <Icon name='refresh' />
                </Button>
            </Table.Cell>
            {/* <Table.Cell collapsing>
                {info.status ? <Button negative onClick={() => switchStatus(false)}>禁用</Button> : <Button positive onClick={() => switchStatus(true)}>启用</Button>}
            </Table.Cell> */}
        </Table.Row>
    )
}