<template>
  <div id="app">
    <div v-heatmap="showHeatmap">
      <img  src="./assets/logo.png">
    <div class="articles">
      <content-placeholders :rounded="true" v-for="index in 6">
        <content-placeholders-text :lines="3" />
        <content-placeholders-img />
        <content-placeholders-heading :img="true" />
        <content-placeholders-text />
      </content-placeholders>
    </div>
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
  /* margin-top: 60px; */
}

.articles {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.articles > div {
  min-width: 400px;
}
</style>
