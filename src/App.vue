<template>
  <div id="app">
    <WeatherWidget/>
  </div>
</template>

<script>
import WeatherWidget from "./components/WeatherWidget.vue";
export default {
  name: 'App',
  components: {
    WeatherWidget
}
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
