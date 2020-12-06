import Vue from "vue";
import App from "./App.vue";
import VCalendar from "v-calendar";
import store from "./store";
import UUID from "vue-uuid";
import moment from "moment";

Vue.use(UUID);
Vue.prototype.$moment = moment;

Vue.use(VCalendar, {
  componentPrefix: "v",
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
