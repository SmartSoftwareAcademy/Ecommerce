import { authHeader } from "./auth-header";
import store from "@/state/store";
var CryptoJS = require("crypto-js");
import axios from 'axios';
// import Swal from "sweetalert2";

export const userService = {
    login,
    logout,
    register,
    getAll,
    data() {
        return {
            user_email: "",
        };
    },
};

function login(email, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    };
    //var sanitizedScreens = [];
    return fetch(window.$http + "login/", requestOptions)
        .then(handleResponse)
        .then((user) => {
            let encryptToken = CryptoJS.AES.encrypt(
                user.user.token.trim(),
                "mnopqr",
            ).toString();
            if (user.user.token) {
                let responseJson = {
                    id: user.user.id,
                    username: user.username,
                    name: user.user.fullname,
                    phone: user.user.phone,
                    email: user.user.email,
                    roles: user.roles,
                    token: encryptToken,
                };
                if (user.roles.length > 0) {
                    user.roles.forEach(r => {
                        var role = r.toLowerCase();
                        if (role === 'admin' || role === 'vendor' || role === 'salesperson' || role === 'manager') {
                            console.log(role);
                            localStorage.setItem("isadmin", true);
                        }
                    });
                }
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("user", JSON.stringify(responseJson));
                localStorage.setItem("user_addresses", JSON.stringify(user.addresses));
                if (JSON.stringify(user.addresses).includes('address')) {
                    console.log(user.addresses)
                    localStorage.setItem("addresses", JSON.stringify(user.addresses));
                    store.dispatch('address/addAddresses', user.addresses);
                    var len = user.addresses.address.filter((e) => e.default_address === true).length;
                    var addr = null;
                    if (len > 0) {
                        addr = user.addresses.address.filter((e) => e.default_address === true)[0];
                        console.log(addr)
                        store.dispatch('address/addDefaultAddresses', addr);
                        localStorage.setItem("default_address", JSON.stringify(addr))
                        axios
                            .get(window.$http + `pickup_stations?region=` + addr.region__region, {
                                headers: {
                                    "Content-Type": ["application/json"],
                                    Authorization: 'Token ' + user.user.token,
                                }
                            })
                            .then((response) => {
                                store.dispatch('address/addDeliveryAddresses', response.data['results']);
                                localStorage.setItem("delivery_addresses", response.data['results']);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    } else {
                        addr = user.addresses.address[0];
                        store.dispatch('address/addDefaultAddresses', addr);
                        localStorage.setItem("default_address", JSON.stringify(addr));
                        axios
                            .get(window.$http + `delivery_addresses?region=` + addr.region__region, {
                                headers: {
                                    "Content-Type": ["application/json"],
                                    Authorization: 'Token ' + user.user.token,
                                }
                            })
                            .then((response) => {
                                store.dispatch('address/addDeliveryAddresses', response.data['results']);
                                localStorage.setItem("delivery_addresses", response.data['results']);
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }
                } else {
                    store.dispatch('address/addDefaultAddresses', {});
                    localStorage.setItem("delivery_addresses", {});

                }
            }
            return user;
        })
        .then((error) => {
            return error;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.$router.push('/');
    window.location.reload();
}

function register(user) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };
    return fetch(`register/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
        var data = text && JSON.parse(text);
        if (!response.ok) {
            //var error = (data && data.message) || response.statusText;
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            return Promise.reject(data);
        }
        console.log(response);
        return data;
    });
}