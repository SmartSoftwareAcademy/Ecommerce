import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

import vco from "v-click-outside"
import VueApexCharts from 'vue-apexcharts'
import VueSweetalert2 from 'vue-sweetalert2';
import VueSlideBar from 'vue-slide-bar'
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import store from '@/state/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import axios from "@/Axiosconfig"
var CryptoJS = require("crypto-js");

//API ENDPOINT CONFIG
var href = window.location.href;
var arr = href.split("/");
var arr2 = arr[2].split(":");

window.$localurl = arr2[0] + "";
var ref = arr[0] + "//" + arr2[0] + ":8000";
window.$http = ref + "/api/";

var tokenString = "";

try {
  if (sessionStorage.user.trim() != "") {
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
window.$tokenString = tokenString;
window.$headers = {
  Authorization: `Token ${window.$tokenString}`,
};
axios.defaults.headers.common['Authorization'] = `Token  ${window.$tokenString}`
import VueMask from 'v-mask'
Vue.config.productionTip = false

import * as VueGoogleMaps from "vue2-google-maps";
import Lightbox from 'vue-easy-lightbox'

Vue.use(Lightbox)
//Vue.use(Print);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
    libraries: "places"
  },
  installComponents: true
});

import { initFirebaseBackend } from './helpers/firebase/authUtils';

import { configurebengoboxAuth } from "./helpers/bengoboxAuth/bengoboxAuth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else if (process.env.VUE_APP_DEFAULT_AUTH === "bengoboxAuth") {
  configurebengoboxAuth();
}

import '@/assets/scss/app.scss'
Vue.use(Vuetify)
Vue.component('VueSlideBar', VueSlideBar)
Vue.use(BootstrapVue)
Vue.use(vco)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.use(require("vue-chartist"));
Vue.use(VueMask);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  vuetify: new Vuetify(),
}).$mount('#app')
