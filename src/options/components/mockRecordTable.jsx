import React, { useEffect, useState } from 'react'
import { Table, Button } from 'semantic-ui-react'
import styled from 'styled-components';
// Components
import MockRecord from './mockRecord'

const StyledButton = styled(Button)({
    color: 'red!important'
});

const MockRecordTable = (props) => {
    const [records, setRecords] = useState(Array(0))

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if(request.from === "background" && request.data.type === "create") {
            let newRecords = records.concat(request.data.info)
            setRecords(newRecords)
        }
    })

    useEffect(() => {
        let newRecords = []
        let extSettingsReg = new RegExp('^[__extension-|__SPARKLING_](.*)', 'g')
        let _local = Object.keys(localStorage)
        for(let i in _local) {
            // if(!extSettingsReg.test(_local[i])) { // why???
            if(!_local[i].match(extSettingsReg)) {
                newRecords.push(localStorage.getItem(_local[i]))
            }
        }
        if(newRecords.length > 0) {
            setRecords(newRecords)
        }
    }, [])

    useEffect(() => {
        props.updateNum(records.length)
    }, [records])

    return (
        <div className="table-box">
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>接口名称</Table.HeaderCell>
                        <Table.HeaderCell>请求地址</Table.HeaderCell>
                        <Table.HeaderCell>选择情景</Table.HeaderCell>
                        <Table.HeaderCell>接口状态</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {records.map(item => {
                        return <MockRecord info={item} key={item.id}></MockRecord>
                    })}
                </Table.Body>
            </Table>
            <StyledButton onClick={() => { }}>测试</StyledButton>

            <style jsx>{`
                .table-box {
                    width: 100%;
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