// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

// // import Axios from 'axios'
// // Vue.prototype.$axios = Axios;
// // Axios.defaults.withCredentials = true;
// // Axios.defaults.baseURL = '/';

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText }
//  from '@fortawesome/vue-fontawesome'
 
// library.add(fas, far, fab)
 
// Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.component('font-awesome-layers', FontAwesomeLayers)
// Vue.component('font-awesome-layers-text', FontAwesomeLayersText)



// Vue.use(ElementUI);

// Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')


/* 导入element-ui样式
*/
import 'element-ui/lib/theme-chalk/index.css'
 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {MessageBox} from 'element-ui'
/* element-ui所有组件
*/
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.prototype.$confirm = MessageBox.confirm 
Vue.config.productionTip = false
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')