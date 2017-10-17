// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vueheatmap from './heatmap';
// import { debounce } from 'lodash';
import App from './App';

Vue.config.productionTip = false;
Vue.use(Vueheatmap, {
  afterAdd(data) {
    console.log(data);
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
