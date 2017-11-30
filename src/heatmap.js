import h337 from 'heatmap.js';

export default {
  install(Vue, options = {}) {
    let heatmap;

    const addData = (data) => {
      heatmap.addData(data);
      if (options.afterAdd) {
        options.afterAdd(data);
      }
    };

    const mouseMove = (e) => {
      addData({
        x: e.layerX,
        y: e.layerY,
        value: 5,
      });
    };

    const mouseClick = (e) => {
      addData({
        x: e.layerX,
        y: e.layerY,
        value: 10,
      });
    };

    Vue.directive('heatmap', {
      inserted(el, binding) {
        heatmap = h337.create({
          maxOpacity: 0.6,
          radius: 50,
          blur: 0.90,
          backgroundColor: 'rgba(0, 0, 58, 0)',
          container: el,
        });

        el.addEventListener('mousemove', mouseMove);
        el.addEventListener('click', mouseClick);
        el.addEventListener('touchmove', mouseMove);

        /* eslint-disable no-param-reassign */
        el.querySelector('canvas.heatmap-canvas').style.display = binding.value ? 'inherit' : 'none';
        el.querySelector('canvas.heatmap-canvas').style.pointerEvents = 'none';
      },

      update(el, binding) {
        /* eslint-disable no-param-reassign */
        el.querySelector('canvas.heatmap-canvas').style.display = binding.value ? 'inherit' : 'none';
      },
    });
  },
};
