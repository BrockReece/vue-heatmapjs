import h337 from 'heatmap.js';
import { Observable, Subject } from 'rxjs';

let loaded = false;
window.addEventListener('load', () => { loaded = true; });

export default {
  install(Vue, options = {}) {
    let heatmap;

    const addValue = (e, value) => {
      e.value = value;
      return e;
    };

    const getHeight = () => {
      const body = document.body;
      const html = document.documentElement;

      return Math.max(body.scrollHeight, body.offsetHeight,
              html.clientHeight, html.scrollHeight, html.offsetHeight);
    };

    const pauser = options.pauser || new Subject();

    Vue.directive('scrollmap', {
      inserted(el, binding) {
        const height = getHeight();
        const canvas = document.createElement('canvas');
        const rounding = binding.arg || 50;
        const show = binding.value || true;
        const scroll = Observable.interval(2000);

        let max = 0;

        document.body.appendChild(canvas);
        canvas.height = height;
        canvas.style.height = `${height}px`;
        canvas.width = window.outerWidth;
        canvas.style.position = 'absolute';
        canvas.style.left = 0;
        canvas.style.top = 0;
        canvas.style.width = '100%';
        canvas.style.opacity = '0.8';
        canvas.style.display = show;
        canvas.id = 'scrollMapCanvas';
        canvas.style.pointerEvents = 'none';

        pauser.switchMap(paused => (paused ? Observable.never : scroll))
          .map(() => window.scrollY)
          .scan((acc, pos) => {
            const rounded = Math.round(pos / rounding) * rounding;
            let roundedWithHeight = Math.round((pos + window.innerHeight) / rounding) * rounding;

            while (roundedWithHeight >= rounded) {
              acc[roundedWithHeight] = acc[roundedWithHeight] || 0;
              acc[roundedWithHeight] += 1;
              max = Math.max(acc[roundedWithHeight], max);
              roundedWithHeight -= rounding;
            }

            return acc;
          }, { 0: 1 })
          .subscribe((positions) => {
            const c = document.getElementById('scrollMapCanvas');
            c.height = height;
            const ctx = c.getContext('2d');
            const myGradient = ctx.createLinearGradient(0, 0, 0, c.height);

            myGradient.addColorStop(0, 'hsla(0,50%,50%, 1)');
            myGradient.addColorStop(1, 'hsla(0,50%,50%, 0)');

            Object.keys(positions).forEach((key) => {
              myGradient.addColorStop(Math.min(1, key / c.height), `hsla(0,50%,50%, ${positions[key] / max})`);
            });

            ctx.fillStyle = myGradient;
            ctx.fillRect(0, 0, c.width, c.height);
          });

        pauser.next(false);
      },

      update(el, binding) {
        document.getElementById('scrollMapCanvas').style.display = binding.value ? 'inherit' : 'none';
      },
    });

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

      const pausable = pauser.switchMap(paused => (paused ? Observable.never : streams));

      pausable.debounceTime(10)
          .map(e => ({
            x: e.layerX,
            y: e.layerY,
            value: e.value,
          }))
          .subscribe(e => heatmap.addData(e));

      if (options.afterAdd) {
        pausable.subscribe(options.afterAdd);
      }

      if (options.stream) {
        pausable.subscribe(e => options.stream.next(e));
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
