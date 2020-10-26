import React from "react";
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'
import { ONLINE_DOMAIN } from '../options/vars.js'
import axios from 'axios'

const extensionSettings = {
    default: { "status": false, "path": "http://localhost:3001/mock", "param": "ajaxID" },
    getMockStatus: function () {
        let data = localStorage.getItem('__extension-settings__')
        if (!data) data = JSON.stringify(this.default)
        return JSON.parse(data).status || false
    },
    getMockPath: function () {
        let data = localStorage.getItem('__extension-settings__')
        if (!data) data = JSON.stringify(this.default)
        return JSON.parse(data).path || ''
    },
    getMockParam: function () {
        let data = localStorage.getItem('__extension-settings__')
        if (!data) data = JSON.stringify(this.default)
        return JSON.parse(data).param || 'ajaxID'
    },
    getToken: function () {
        let data = localStorage.getItem('__SPARKLING_ONLINE_CONFIG__')
        if (!data) return ''
        return JSON.parse(data).token || ''
    },
    getEnableOnline: function () {
        let data = localStorage.getItem('__extension-enableOnline__')
        if (!data) return false
        return true
    }
}
const bgSendMessage = function (data) {
    // key:id, value: {url: "some-test-url.com", status: false, con_id: '', full_info: null, name: '', id: ''}
    let apiPath = extensionSettings.getEnableOnline() ? ONLINE_DOMAIN : extensionSettings.getMockPath()
    let token = extensionSettings.getToken()
    axios(apiPath + '/find?id=' + data.info.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Sparkling-Client-Token': token
        }
    }).then(
        // {"code":1,"data":{"category":"测试","name":"测试新创建用户-创建记录","url":"https://this-is-a-test-url.sparkling.fun","mock_data":[{"status":200,"delay":0,"data":"{\"test\": 1}","con_id":"lGy2qmry"}],"id":"g73CS7ngLG3J"}}
        resp => {
            if (resp.data.code !== 1) {
                console.log(`Get Mock Full Data Fail, id: ${data.info.id}.`);
                return;
            };
            if (resp.data.data.id !== data.info.id) {
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
            localStorage.setItem(data.info.id, JSON.stringify(parsedData))
            chrome.runtime.sendMessage({ from: 'background', data: parsedData });
        },
        err => {
            console.log(err)
        }
    )
}

function App() {
    chrome.browserAction.onClicked.addListener(e => {
        chrome.tabs.create({
            url: chrome.runtime.getURL('options.html'),
            active: true
        });
    });

    chrome.runtime.onInstalled.addListener(function (data) {
        // after install, active options.html to init local storage.
        if (data.reason == 'install') {
            chrome.tabs.create({
                url: chrome.runtime.getURL('options.html'),
                active: true
            })
        }
        if (data.reason == 'update') { }
    });

    // functions for request blocking
    function apiDataParse(info) {
        // {"frameId":0,"initiator":"http://some-mock-url.test.com","method":"GET","parentFrameId":-1,"requestId":"7064","tabId":105,"timeStamp":1603434504445.433,"type":"xmlhttprequest","url":"http://some-mock-url.test.com/test?ajaxID=thisistestid"}
        let infoURL = new URL(info.url)
        let param = extensionSettings.getMockParam()
        let id = infoURL.searchParams.get(extensionSettings.getMockParam()) // √
        let searchReg = new RegExp('\\' + param + '=' + id, 'g')
        let originURL = infoURL.href.replace(searchReg, '') // √
        let storeInfo = {
            url: originURL,
            status: false,
            con_id: '',
            full_info: null,
            name: '',
            id
        }
        localStorage.setItem(id, JSON.stringify(storeInfo))
        return storeInfo
    }


    function xhrRedirect(info) {
        let ajaxId = new URL(info.url).searchParams.get(extensionSettings.getMockParam()) || '';
        if (ajaxId) {
            if (!localStorage.getItem(ajaxId)) {
                let storeInfo = apiDataParse(info)
                bgSendMessage({ type: "create", info: storeInfo });
            }
            let record = JSON.parse(localStorage.getItem(ajaxId));
            if (record.status === false) return;
            return {
                redirectUrl: (extensionSettings.getEnableOnline() ? ONLINE_DOMAIN : extensionSettings.getMockPath()) + '?id=' + ajaxId
            }
        }
    }

    chrome.webRequest.onBeforeRequest.addListener(
        // callback function
        (info) => {
            if (!extensionSettings.getMockStatus()) return;
            if (!extensionSettings.getMockPath()) return;
            if (info.type === "xmlhttprequest") {
                let redirect = xhrRedirect(info)
                return redirect
            }
        },
        // filter
        {
            urls: ["<all_urls>"]
        },
        // extraInfoSpec
        ["blocking"]
    );

    chrome.webRequest.onBeforeSendHeaders.addListener(function (info) {
        if (!extensionSettings.getMockStatus()) return;
        if (!extensionSettings.getMockPath()) return;
        if (!info.type === "xmlhttprequest") return;
        let ajaxId = new URL(info.url).searchParams.get(extensionSettings.getMockParam()) || '';
        if (!ajaxId) return;
        let headers = info.requestHeaders
        // Add private token
        headers.push({ name: "Sparkling-Client-Token", value: extensionSettings.getToken() })
        info.requestHeaders = headers
    },
        { urls: ["<all_urls>"] },
        ["blocking", "requestHeaders"]);

    return (
        <div>Background Page is used to filter all requests, and proxy requests which are configured in options.html .</div>
    )
}

export default App;