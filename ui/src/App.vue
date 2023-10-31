<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";
import { notificationMethods } from "@/state/helpers";
import store from "@/state/store";

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    },
  },
  created() {
    window.addEventListener("beforeunload", this.removeUser);
  },
  mounted() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    window.addEventListener("beforeunload", this.logout);
  },
  methods: {
    clearNotification: notificationMethods.clear,
    removeUser() {
      store.dispatch("authfack/logout");
    },
  },
};
</script>
