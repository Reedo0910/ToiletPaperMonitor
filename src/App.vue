<template>
  <div id="app">
    <h1>Toilet Paper Monitor</h1>
    <div>
      <label for="percentage">show percentage</label>
      <input type="checkbox" name id="percentage" v-model="isShowPercentage" />
    </div>
    <div class="container">
      <div class="card-group">
        <paper-monitor-card
          :value="distance1"
          :title="'GOL'"
          :id="'201-3'"
          :total="50"
          :show-circle="isShowPercentage"
        ></paper-monitor-card>
        <paper-monitor-card
          :value="distance2"
          :title="'GOL'"
          :id="'201-4'"
          :total="50"
          :show-circle="isShowPercentage"
        ></paper-monitor-card>
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
        distance1: 0,
        distance2: 0,
        isShowPercentage: false
      }
    },
    methods: {
      getPhotonData: function () {
        const vm = this;
        axios.get(`https://api.particle.io/v1/devices/2b0034000647373034353237/force_level?access_token=${TOKEN}`)
          .then(function (res) {
            const temp = vm.getDistance(res.data.result);
            vm.distance1 = temp < 0 ? 0 : temp;
          })
          .catch(function (error) {
            console.error(error);
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
      }, 3000);

      if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission(function (status) {
          if (Notification.permission !== status) {
            Notification.permission = status;
          }
        });
      }
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

  label {
    margin-right: 0.5em;
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
