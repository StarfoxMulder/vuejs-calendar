import Vue from "vue";
import "./style.scss";

import store from "./store";

import moment from "moment-timezone";

// Setting the default timezone so that users see consistent times, regardless of their browser location -- However, I've currently disabled settign the timezone to UTC because I don't see the practical value in it.
//moment.tz.setDefault("UTC");
// Modifying the Vue instance to include a new property, $moment, which will get

Object.defineProperty(Vue.prototype, "$moment", {
  get() {
    return this.$root.moment;
  }
});

import App from "./components/App.vue";

new Vue({
  el: "#app",
  data: {
    moment
  },
  components: {
    App
  },
  store
});
