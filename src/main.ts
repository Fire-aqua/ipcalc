import Vue from "vue";
import { VuetifyPlugin } from '@/plugins/vuetify';
import App from "./App.vue";
import router from "./router";
import axios from 'axios'

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:8000/api';


new Vue({
  router,
  vuetify: VuetifyPlugin,
  render: h => h(App)
}).$mount("#app");
