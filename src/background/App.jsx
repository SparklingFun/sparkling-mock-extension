import React from "react";
import '&/styles/reset.css'
import 'semantic-ui-css/semantic.min.css'

function App () {
    chrome.browserAction.onClicked.addListener(e => {
        chrome.tabs.create({
            url: chrome.runtime.getURL('options.html'),
            active: true
        });
    });
    return (
        <div>Test 2</div>
    )
}

export default App;