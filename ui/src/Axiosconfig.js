import axios from 'axios';
var CryptoJS = require("crypto-js");

var tokenString = "";
try {
    if (localStorage.user.trim() != "") {
        tokenString = CryptoJS.AES.decrypt(
            JSON.parse(localStorage.user).token,
            "mnopqr",
        )
            .toString(CryptoJS.enc.Utf8)
            .trim();
    }
} catch (e) {
    tokenString = "";
}

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/', // Replace with your Django backend URL
    timeout: 360000, // 6 mins timeout
    headers: {
        "Content-Type": ["application/json"],
        Authorization: 'Token ' + tokenString,
    },
});

export default instance;
