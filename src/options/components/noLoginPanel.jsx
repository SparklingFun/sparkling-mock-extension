import React from 'react'
import { GithubLoginButton } from 'react-social-login-buttons'
import { Segment } from 'semantic-ui-react'

const noLoginPanel = () => {

    return (
        <div id="no-login-panel-box">
            <p>您目前未登录</p>
            <Segment piled className="label">
                <p>我们使用Github Gists来保存您的mock数据，方便您的导入导出。</p><p>如果您不希望利用缓存，您可以通过登录后的设置修改，我们的服务端不会保存你的任何mock记录。</p>
            </Segment>
            <GithubLoginButton onClick={() => alert("Hello")} className="github-oauth-btn" />
        </div>
    )
}

export default noLoginPanel;