<template>
  <div class="card-item">
    <header>
      <h3>
        {{ title }}
        <span>#{{ id }}</span>
      </h3>
    </header>
    <div class="progress-indicator">
      <vue-circle
        :progress="0"
        :size="150"
        :reverse="true"
        line-cap="round"
        empty-fill="rgba(0, 0, 0, .1)"
        :start-angle="-1/2*Math.PI"
        insert-mode="append"
        :thickness="5"
        :show-percent="true"
        ref="circle"
      >
        <p></p>
      </vue-circle>
    </div>
  </div>
</template>

<script>
  import VueCircle from 'vue2-circle-progress/src/index.vue'

  export default {
    components: {
      VueCircle
    },
    data() {
      return {}
    },
    props: {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        default: 50
      }
    },
    watch: {
      value: function (val) {
        this.getProgress(val);
      }
    },
    methods: {
      getProgress: function (val) {
        let p = (val / this.total) * 100;
        p = p >= 100 ? 100 : (p <= 0 ? 0 : p);
        this.$refs.circle.updateProgress(p);
      }
    },
    mounted() {
      this.getProgress(this.value);
    }
  }
</script>

<style scoped>
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