import axios from 'axios';

function request(url, method, data) {
    const settings = {
        timeout: 300,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Access-Control-Allow-Origin": "Authorization,Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Methods": "GET,POST",
            'Content-Type': 'application/json'
        },
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default
        },
        method: method,
        data: data,
        url: url
    }
    return axios.request(settings)
}

export { request };