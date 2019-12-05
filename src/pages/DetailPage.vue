<template>
  <div>
    <h2>Toilet Paper Consumption of #{{$route.params.id}}</h2>
    <div class="chart-container">
      <line-chart :chartdata="getDataSets"></line-chart>
    </div>
  </div>
</template>

<script>
  import LineChart from '../assets/LineChart'

  let data = {
    datasets: [{
      label: 'Percentage of Toilet Paper Consumption',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  }

  export default {
    name: 'detail',
    components: {
      LineChart
    },
    data() {
      return {
        dataArray: []
      }
    },
    computed: {
      getDataSets: function () {
        // format data and pass it to the diagram
        data.datasets[0].data = this.dataArray.concat();
        return data;
      }
    },
    beforeMount() {
      // get records of past 7 days from loacl storage
      this.dataArray = JSON.parse(localStorage.getItem('c' + this.$route.params.id));
    }
  }
</script>

<style scoped>
  .chart-container {
    width: 90%;
    margin: 0 auto;
  }
</style>