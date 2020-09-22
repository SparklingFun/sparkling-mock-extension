import React from "react";
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'

const extensionSettings = {
    default: {"status": false, "path": "", "param": "ajaxID"},
    getMockStatus: function(){
        let data = localStorage.getItem('__extension-settings__')
        if(!data) data = JSON.stringify(this.default)
        return JSON.parse(data).status || false
    },
    getMockPath: function(){
        let data = localStorage.getItem('__extension-settings__')
        if(!data) data = JSON.stringify(this.default)
        return JSON.parse(data).path || ''
    },
    getMockParam: function(){
        let data = localStorage.getItem('__extension-settings__')
        if(!data) data = JSON.stringify(this.default)
        return JSON.parse(data).param || 'ajaxID'
    }
}
const bgSendMessage = function (data) {
    chrome.runtime.sendMessage({ from: 'background', data });
}

function App () {
    chrome.browserAction.onClicked.addListener(e => {
        chrome.tabs.create({
            url: chrome.runtime.getURL('options.html'),
            active: true
        });
    });

    chrome.webRequest.onBeforeRequest.addListener(
        // callback function
        (info) => {
            if(!extensionSettings.getMockStatus()) return;
            if(!extensionSettings.getMockPath()) return;
            if(info.type === "xmlhttprequest") {
                let ajaxId = new URL(info.url).searchParams.get(extensionSettings.getMockParam()) || '';
                if(ajaxId) {
                    if(!localStorage.getItem(ajaxId)) {
                        localStorage.setItem(ajaxId, apiDataStringify(info));
                        bgSendMessage({type: "create"});
                    }
                    
                    let record = JSON.parse(localStorage.getItem(ajaxId));
                    if(record.status === false) return;
                    return {
                        redirectUrl: extensionSettings.getMockPath() + '?' + extensionSettings.getMockParam() + '=' + ajaxId
                    }
                }
            }
        },
        // filter
        {
            urls: ["<all_urls>"]
        },
        // extraInfoSpec
        ["blocking"]
    );
    
    return (
        <div>Background Page is used to filter all requests, and proxy requests which are configured in options.html .</div>
    )
}

export default App;