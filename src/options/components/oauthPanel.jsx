import React, { useState } from 'react'
import NoLoginPane from './noLoginPanel'

const OauthPanel = () => {
    const [logined, setLogin] = useState(false)
    return (
        <div>
            {!logined ? 
                <div className="no-login-panel">
                    <NoLoginPane />
                </div> : <div className="logined-panel">
                    已登录
                </div>
            }
        </div>
    )
}

export default OauthPanel;