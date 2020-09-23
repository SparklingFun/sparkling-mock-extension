import React, { useState } from 'react'
import NoLoginPane from './noLoginPanel'
import LoginedPanel from './loginedPanel'

const OauthPanel = () => {
    const [logined, setLogin] = useState(false)
    return (
        <div>
            {!logined ? 
                <div className="no-login-panel">
                    <NoLoginPane loginSuccess={() => setLogin(true)} />
                </div> : <div className="logined-panel">
                    <LoginedPanel logout={() => setLogin(false)} />
                </div>
            }
        </div>
    )
}

export default OauthPanel;