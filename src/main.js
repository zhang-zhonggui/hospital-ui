import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueLazyload from "vue-lazyload";

Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("@/assets/img/404.jpg"),
  loading: require("@/assets/img/loading.gif"),
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
