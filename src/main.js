import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'
import moment from 'vue-moment'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(moment)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
