![example](src/assets/example.png)

# vue-heatmapjs

> A vue directive for collecting and displaying user activity on a component

## Install
You can use NPM or Yarn to add this plugin to your project
```bash
npm install vue-heatmapjs
# or
yarn add vue-heatmapjs
```

## Usage
You need to install this plugin in you main.js

```js
// main.js

import Vue from 'vue'
import heatmap from 'vue-heatmapjs'

Vue.use(heatmap)

```
And then you can add the `v-heatmap` directive to the dom elements you want to track.

```html
<!-- App.vue -->
<div v-heatmap>
  ...
</div>
```

### Toggle heatmap
You can toggle the heatmap on and off by passing an expression into the directive, the example below will produce something similar to the image at the top of these docs

```html
<template>
  ...
  <div v-heatmap="show"></div>
  <button @click="show = !show">Toggle Heatmap</button>
  ...
</template>

<script>
  ...
    data() {
      return {
        show: false,
      }
    },
  ...
</script>
```

### Listen for events
You can pass an afterAdd method through with the plugin options, this will allow you to access and process the events captured for the heatmap

```js
// main.js

Vue.use(heatmap, {
  afterAdd(data) {
    console.log(data)
    // you can fire this back to your analytics server
  },
})
```
