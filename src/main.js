// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Subject } from 'rxjs';
import VueContentPlaceholders from 'vue-content-placeholders';

import Vueheatmap from './heatmap';
// import { debounce } from 'lodash';
import App from './App';

const stream = new Subject();
Vue.use(VueContentPlaceholders);

Vue.config.productionTip = false;
Vue.use(Vueheatmap, {
  stream,
  heatmapPreload: [{ x: 10, y: 10, value: 100 }],
  webgazer: {
    regression: 'ridge',
    // tracker: 'js_objectdetect',
  },
});

stream
  .throttleTime(1000)
  .subscribe(console.log);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
