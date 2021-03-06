import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
// import ru from 'vuetify/src/locale/ru';

Vue.use(Vuetify);

export const VuetifyPlugin = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3A4A87',
        secondary: '#444054',
        accent: '#794c8a',
        error: '#d92550',
        info: '#78C3FB',
        success: '#3ac47d',
        warning: '#f7b924',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
  // lang: {
  //   locales: { ru },
  //   current: 'ru',
  // },
});
