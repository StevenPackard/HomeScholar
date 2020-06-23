import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import swal from "sweetalert";
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./authConfig";
import VueHtmlToPaper from "vue-html-to-paper";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
};

Vue.use(VueHtmlToPaper, options);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
// store.dispatch("initalizeSocket");
