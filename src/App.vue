<template>
  <div id="app">
    <h1>Toilet Paper Monitor</h1>
    <paper-monitor :value="distance"></paper-monitor>
  </div>
</template>

<script>
  import PaperMonitor from './components/PaperMonitor.vue';
  import axios from 'axios';

  const TOKEN = 'f2778fff697836c428ed25e0827c2a555e99c55b';

  export default {
    name: 'app',
    components: {
      PaperMonitor
    },
    data() {
      return {
        distance: 0
      }
    },
    methods: {
      getPhotonData: function () {
        const vm = this;
        axios.get(`https://api.particle.io/v1/devices/2b0034000647373034353237/force_level?access_token=${TOKEN}`)
          .then(function (res) {
            // handle success
            const temp = vm.getDistance(res.data.result);
            vm.distance = temp < 0 ? 0 : temp;
            // console.log(temp);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      },
      getDistance: function (value) {
        return Math.ceil((0.3846 * value - 189.47) / 10);
      }
    },
    mounted() {
      const vm = this;
      vm.getPhotonData();
      setInterval(() => {
        vm.getPhotonData();
      }, 5000);
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
