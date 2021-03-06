import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/patch.css'

Vue.config.productionTip = false;
Vue.use(ElementUI)

const moment = require('moment')
require('moment/locale/zh-cn')

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
