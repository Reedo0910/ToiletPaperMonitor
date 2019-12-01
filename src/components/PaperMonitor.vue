<template>
  <div class="container">
    <h2>2F</h2>
    <div class="card-group">
      <div class="card-item">
        <header>
          <h3>
            201
            <span>#2013</span>
          </h3>
        </header>
        <div class="progress-indicator">
          <vue-circle
            :progress="90"
            :size="150"
            :reverse="true"
            line-cap="round"
            empty-fill="rgba(0, 0, 0, .1)"
            :start-angle="-1/2*Math.PI"
            insert-mode="append"
            :thickness="5"
            :show-percent="true"
            @vue-circle-progress="progress"
          >
            <p></p>
          </vue-circle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //   import VueCircle from 'vue2-circle-progress'
  import VueCircle from 'vue2-circle-progress/src/index.vue'
  export default {
    components: {
      VueCircle
    },
    data() {
      return {}
    },
    methods: {
      progress(event, progress, stepValue) {
        console.log(stepValue);
      },
    }
  }
</script>

<style scoped>
  .container {
    width: 90%;
    margin: 0 auto;
  }

  .card-group {
    display: flex;
    padding-top: 30px;
  }

  .card-item {
    width: 240px;
    height: 300px;
    background-color: #444;
    color: #fff;
    border-radius: 5px;
  }

  .card-item header h3 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  .card-item header h3 span {
    font-size: 80%;
  }

  .progress-indicator {
    width: 70%;
    margin: 0 auto;
  }
</style>