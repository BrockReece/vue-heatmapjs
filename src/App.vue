<template>
  <div id="app">
    <div v-heatmap="showHeatmap">
      <img  src="./assets/logo.png">
    </div>
    <button @click="showHeatmap = !showHeatmap">Toggle Heatmap</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data() {
    return {
      showHeatmap: true,
    };
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
}
img {
  min-height: 206px;
}
</style>
