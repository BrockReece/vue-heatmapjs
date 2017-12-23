import h337 from 'heatmap.js';
import { Observable } from 'rxjs';

let loaded = false;
window.addEventListener('load', () => { loaded = true; });

export default {
  install(Vue, options = {}) {
    let heatmap;

    const addValue = (e, value) => {
      e.value = value;
      return e;
    };

    const loadHeatmap = async (el, binding) => {
      heatmap = h337.create({
        maxOpacity: 0.6,
        radius: 50,
        blur: 0.90,
        backgroundColor: 'rgba(0, 0, 58, 0)',
        container: el,
      });

      if (options.heatmapPreload) {
        heatmap.addData(await Promise.resolve(options.heatmapPreload));
      }

      const move = Observable.fromEvent(el, 'mousemove');
      const touch = Observable.fromEvent(el, 'touchmove');
      const click = Observable.fromEvent(el, 'click');

      const streams = Observable.merge(
        move.map(e => addValue(e, 5)),
        touch.map(e => addValue(e, 5)),
        click.map(e => addValue(e, 10)),
      );

      streams.debounceTime(10)
        .map(e => ({
          x: e.layerX,
          y: e.layerY,
          value: e.value,
        }))
        .subscribe(e => heatmap.addData(e));

      if (options.afterAdd) {
        streams.subscribe(options.afterAdd);
      }

      if (options.stream) {
        streams.subscribe(e => options.stream.next(e));
      }

      /* eslint-disable no-param-reassign */
      el.querySelector('canvas.heatmap-canvas').style.display = binding.value ? 'inherit' : 'none';
      el.querySelector('canvas.heatmap-canvas').style.pointerEvents = 'none';
    };

    Vue.directive('heatmap', {
      inserted: async (el, binding) => {
        window.addEventListener('load', () => {
          loadHeatmap(el, binding);
        });

        if (loaded) {
          loadHeatmap(el, binding);
        }
      },

      update(el, binding) {
        /* eslint-disable no-param-reassign */
        el.querySelector('canvas.heatmap-canvas').style.display = binding.value ? 'inherit' : 'none';
      },
    });
  },
};
