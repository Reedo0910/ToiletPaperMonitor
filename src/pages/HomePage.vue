<template>
  <div>
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
  import PaperMonitorCard from '../components/PaperMonitorCard.vue';

  export default {
    name: 'home',
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
      getPhoton1Data: function () {
        const vm = this;
        axios.get(process.env.VUE_APP_PHOTON_ACCESS_API_1)
          .then(function (res) {
            const temp = vm.getDistance(res.data.result);
            vm.distance1 = temp < 0 ? 0 : temp;
          })
          .catch(function (error) {
            console.error(error);
          })
      },
      getPhoton2Data: function () {
        const vm = this;
        axios.get(process.env.VUE_APP_PHOTON_ACCESS_API_2)
          .then(function (res) {
            const temp = vm.getDistance(res.data.result);
            vm.distance2 = temp < 0 ? 0 : temp;
          })
          .catch(function (error) {
            console.error(error);
          })
      },
      getDistance: function (value) {
        return Math.ceil((0.3846 * value - 189.47) / 10);
      },
      saveData: function () {
        let myData1 = parseInt(localStorage.getItem('d' + '201-3'));
        let myData2 = parseInt(localStorage.getItem('d' + '201-4'));
        let savedData1 = JSON.parse(localStorage.getItem('c' + '201-3'));
        let savedData2 = JSON.parse(localStorage.getItem('c' + '201-4'));

        const today = new Date(new Date().setHours(0, 0, 0, 0)).toString();

        if (Date.parse(savedData1[savedData1.length - 1].t) !== Date.parse(today)) {
          const newData1 = {
            t: today,
            y: myData1
          }
          savedData1.push(newData1)
          localStorage.setItem('c' + '201-3', JSON.stringify(savedData1))
        }

        if (Date.parse(savedData2[savedData2.length - 1].t) !== Date.parse(today)) {
          const newData2 = {
            t: today,
            y: myData2
          }
          savedData2.push(newData2)
          localStorage.setItem('c' + '201-4', JSON.stringify(savedData2))
        }
      }
    },
    mounted() {
      const vm = this;
      vm.getPhoton1Data();
      vm.getPhoton2Data();
      setInterval(() => {
        vm.getPhoton1Data();
        vm.getPhoton2Data();
      }, 60 * 1000);

      setInterval(() => {
        if (new Date().getHours() === 23) {
          vm.saveData();
        }
      }, 1000 * 60)
    }
  }
</script>

<style>
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