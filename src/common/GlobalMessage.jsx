import React, { useEffect, useState, useImperativeHandle } from 'react'
import { Message } from 'semantic-ui-react'
import { nanoid } from 'nanoid'

export function GlobalMessage(props) {
    const [msgList, setMsgList] = useState([])
    const { globalMsgRef } = props
    let globalMsgRemoveTimer = null

    useImperativeHandle(globalMsgRef, () => ({
        __addMessage
    }))

    // Add new message
    const __addMessage = (data) => {
        setMsgList(msgList.concat({ ...data, expires: Date.now() + 3000 }))
    }

    useEffect(() => {
        globalMsgRemoveTimer = setInterval(() => {
            if (msgList.length === 0) {
                return;
            }
            let _now = Date.now()
            for (let i in msgList) {
                if (_now >= msgList[i].expires) {
                    let newList = msgList.slice(0)
                    newList.splice(i, 1)
                    setMsgList(newList)
                }
            }
        }, 1000)
        return () => {
            clearInterval(globalMsgRemoveTimer)
        }
    }, [msgList])

    // why use `key={nanoid(4)}` which is not recommand in document? Because messages are not controlable.
    const msgBox = (msg) => <Message key={nanoid(4)} className="__global-msg-item"
        icon={msg.ok ? 'check' : 'warning circle'}
        header={msg.header || 'Notice'}
        content={msg.content || ''}
    />

    return (
        <div className="__global-msg-box" id="__global-msg-box">
            {msgList.map((msg, i) => {
                return msgBox(msg, i)
            })}
        </div>
    )
}