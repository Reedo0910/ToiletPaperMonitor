<template>
  <div id="app">
    <h1>Toilet Paper Monitor</h1>
    <div class="container">
      <h2>2F</h2>
      <div class="card-group">
        <paper-monitor-card :value="distance"></paper-monitor-card>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import PaperMonitorCard from './components/PaperMonitorCard.vue';

  const TOKEN = 'f2778fff697836c428ed25e0827c2a555e99c55b';

  export default {
    name: 'app',
    components: {
      PaperMonitorCard
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

  .container {
    width: 90%;
    margin: 0 auto;
  }

  .card-group {
    display: flex;
    padding-top: 30px;
  }
</style>
