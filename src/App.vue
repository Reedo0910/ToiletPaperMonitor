<template>
  <div id="app">
    <h1>Toilet Paper Monitor</h1>
    <paper-monitor></paper-monitor>
  </div>
</template>

<script>
  import PaperMonitor from './components/PaperMonitor.vue'

  export default {
    name: 'app',
    components: {
      PaperMonitor
    }
  }
</script>

<style>
  body {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    background-color: #222;
    padding-top: 10px;
  }

  .percent-text {
    padding-top: 24px;
  }
</style>
