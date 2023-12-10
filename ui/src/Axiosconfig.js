import axios from 'axios';
var CryptoJS = require("crypto-js");
//API ENDPOINT CONFIG
var href = window.location.href;
var arr = href.split("/");
var arr2 = arr[2].split(":");

window.$localurl = arr2[0] + "";
var ref = arr[0] + "//" + arr2[0] + ":8001";
var baseURL =ref + "/api/";
window.$http = ref + "/api/";

var tokenString = "";
try {
    if (sessionStorage.user.trim() != null) {
        tokenString = CryptoJS.AES.decrypt(
            JSON.parse(sessionStorage.user).token,
            "mnopqr",
        )
            .toString(CryptoJS.enc.Utf8)
            .trim();
    }
} catch (e) {
    tokenString = "";
}

const instance = axios.create({
    baseURL: baseURL, // Replace with your Django backend URL
    timeout: 360000, // 6 mins timeout
    headers: {
        "Content-Type": ["application/json"],
        Authorization: 'Token ' + tokenString,
    },
});

export default instance;
