// localStorage special keys
const ONLINE_SET = '__SPARKLING_ONLINE_CONFIG__';
const PLUGIN_SET = '__SPARKLING_PLUGIN_CONFIG__';
const ONLINE_DOMAIN = 'https://mock.sparkling.fun/mock';
const ENV = 'production';
const VERSION = process.env.npm_package_version;

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

module.exports = {
    ONLINE_SET,
    PLUGIN_SET,
    ONLINE_DOMAIN,
    extensionSettings,
    ENV,
    VERSION
}