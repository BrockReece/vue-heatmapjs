// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Subject } from 'rxjs';
import Vueheatmap from './heatmap';
// import { debounce } from 'lodash';
import App from './App';

const stream = new Subject();
export const pauser = new Subject();

Vue.config.productionTip = false;
Vue.use(Vueheatmap, {
  stream,
<<<<<<< HEAD
  pauser,
=======
  heatmapPreload: [{ x: 10, y: 10, value: 100 }],
>>>>>>> ef91976680800ca2efebcdbbe6ad416ae073c4fa
});

stream
  .throttleTime(1000)
  .subscribe(console.log);

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
