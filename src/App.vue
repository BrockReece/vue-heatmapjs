<template>
  <div id="app" v-scrollmap:100="showScrollmap">
    <div v-heatmap="showHeatmap">
      <img  src="./assets/logo.png">
    </div>

    <button @click="showHeatmap = !showHeatmap">Toggle Heatmap</button>
    <button @click="showScrollmap = !showScrollmap">Toggle Scrollmap</button>
    <button @click="pauseCollection">
      <span v-if="paused">Resume Collection</span>
      <span v-else>Pause Collection</span>
    </button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import { pauser } from './main';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data() {
    return {
      paused: false,
      showScrollmap: true,
      showHeatmap: true,
    };
  },

  methods: {
    pauseCollection() {
      this.paused = !this.paused;
      pauser.next(this.paused);
    },
  },

  async mounted() {
    window.addEventListener('load', () => {
      pauser.next(false);
    });
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  min-height: 900px;
}
</style>
