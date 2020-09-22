import React from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { GithubLoginButton } from 'react-social-login-buttons'
import { Segment } from 'semantic-ui-react'

const githubBtnHandler = () => {
    const id = nanoid(10)
    const authUrl = 'https://github.com/login/oauth/authorize?scope=gist&client_id=7783f98b554dc2057549&state=' + id
    let loopRequest = setInterval(() => verifyOauthStatus(id, loopRequest), 2000)
    window.open(authUrl)
}

const verifyOauthStatus = (state, timerID) => {
    axios.get('https://mock-public-api-dev.sparkling.workers.dev/oauth-verify?state=' + state).then(
        data => {
            if(data.data.data.code === 1) {
                clearInterval(timerID)
            }
        },
        error => {
            console.log(error)
            clearInterval(timerID)
        }
    )
}

const noLoginPanel = () => {

    return (
        <div id="no-login-panel-box">
            <p>您目前未登录</p>
            <Segment piled className="label">
                <p>我们使用Github Gists来保存您的mock数据，方便您的导入导出。</p><p>如果您不希望利用缓存，您可以通过登录后的设置修改，我们的服务端不会保存你的任何mock记录。</p>
            </Segment>
            <GithubLoginButton onClick={() => githubBtnHandler()} className="github-oauth-btn" />
        </div>
    )
}

export default noLoginPanel;