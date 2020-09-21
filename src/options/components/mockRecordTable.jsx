import React, { useState } from 'react'
import { Table, Button } from 'semantic-ui-react'
import styled from 'styled-components';
// Components
import MockRecord from './mockRecord'

const StyledButton = styled(Button)({
    color: 'red!important'
});

const MockRecordTable = () => {
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
                    <MockRecord></MockRecord>
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