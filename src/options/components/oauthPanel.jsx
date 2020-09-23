import React, { useState, useEffect } from 'react'
import NoLoginPane from './noLoginPanel'
import LoginedPanel from './loginedPanel'
import { ONLINE_SET } from '../vars'

const OauthPanel = () => {
    const [logined, setLogin] = useState(false)

    useEffect(() => {
        if(localStorage.getItem(ONLINE_SET) !== null) {
            setLogin(true)
        }
    }, [])

    // functions
    const fnLogout = () => {
        setLogin(false)
        localStorage.removeItem(ONLINE_SET)
    }

    return (
        <div>
            {!logined ? 
                <div className="no-login-panel">
                    <NoLoginPane loginSuccess={() => setLogin(true)} />
                </div> : <div className="logined-panel">
                    <LoginedPanel logout={() => fnLogout()} />
                </div>
            }
        </div>
    )
}

export default OauthPanel;