<template>
  <div class="card-item" :class="{'has-circle': showCircle}">
    <header>
      <h3>
        <router-link :to="id">
          {{ title }}
          <span>#{{ id }}</span>
        </router-link>
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
        @vue-circle-progress="progressing"
        @vue-circle-end="progressEnd"
        v-show="showCircle"
      >
        <p></p>
      </vue-circle>
    </div>
    <div>
      <p>{{ myText }}</p>
    </div>
    <div>
      <!-- indicator bar -->
      <ul class="indicator-item-list">
        <li
          class="indicator-item"
          :class="{'fill': identifierCount >= 0}"
          :style="{'background-color': identifierCount === 0 ? '#ff0000' : '#fff'}"
        ></li>
        <li class="indicator-item" :class="{'fill': identifierCount >= 1}"></li>
        <li class="indicator-item" :class="{'fill': identifierCount >= 2}"></li>
        <li class="indicator-item" :class="{'fill': identifierCount >= 3}"></li>
        <li class="indicator-item" :class="{'fill': identifierCount >= 4}"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import VueCircle from 'vue2-circle-progress/src/index.vue'

  export default {
    components: {
      VueCircle
    },
    data() {
      return {
        progressValue: 0,
        identifierCount: 0,
        myText: '',
        isInit: false
      }
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
      },
      showCircle: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      value: function (val) {
        // get progress when value changes
        this.getProgress(val);
        if (!this.isInit) {
          this.isInit = true;
        }
        // Calculate & store daily consumption record to local storage
        let myRecord = localStorage.getItem('d' + this.id);
        let lastRecord = localStorage.getItem('l' + this.id);
        if (myRecord && lastRecord) {
          let newRecord = parseInt(myRecord);
          let newLastRecord = parseInt(lastRecord);
          const deviation = newLastRecord - this.progressValue;
          if (deviation > 0) {
            newRecord += deviation;
            localStorage.setItem('d' + this.id, newRecord.toString())
          }
          localStorage.setItem('l' + this.id, this.progressValue.toString())
        } else {
          localStorage.setItem('d' + this.id, this.progressValue.toString())
          localStorage.setItem('l' + this.id, this.progressValue.toString())
        }
      }
    },
    methods: {
      getProgress: function (val) {
        let p = (val / this.total) * 100;
        // make sure percentage not higher than 100, not lower than 0
        p = p >= 100 ? 100 : (p <= 0 ? 0 : p);
        this.progressValue = p;
        // update circle progress
        this.$refs.circle.updateProgress(p);
      },
      progressing: function (event, progress, stepValue) {
        // Change color of the circle progress while percentage < 20
        if (stepValue < 20) {
          this.$refs.circle.updateFill('#ff0000');
        } else {
          this.$refs.circle.updateFill('#3aeabb');
        }
      },
      progressEnd: function () {
        // devide 100% progress into 5 sections
        if (this.progressValue >= 80) {
          this.identifierCount = 4;
        } else if (this.progressValue >= 60 && this.progressValue < 80) {
          this.identifierCount = 3;
        } else if (this.progressValue >= 40 && this.progressValue < 60) {
          this.identifierCount = 2;
        } else if (this.progressValue >= 20 && this.progressValue < 40) {
          this.identifierCount = 1;
        } else {
          this.identifierCount = 0;
        }
        // set indicating text
        if (this.progressValue < 20) {
          this.myText = 'Warning: Refill needed';
          if (this.isInit === true) {
            this.sendNotification();
          }
        } else {
          this.myText = `Remaining: ${this.identifierCount + 1}/5`;
        }
      },
      sendNotification: function () {
        // if paper is running low, send HTML5 notifications
        const NotificationContent = `Paper #${this.id} in ${this.title} is running low`;
        if (window.Notification && Notification.permission === 'granted') {
          let n = new Notification(NotificationContent);
        } else if (window.Notification && Notification.permission !== 'denied') {
          Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
              Notification.permission = status;
            }
            if (status === 'granted') {
              let n = new Notification(NotificationContent);
            } else {
              alert(NotificationContent);
            }
          });
        } else {
          alert(NotificationContent);
        }
        // send slack notifications as well
        axios.post(process.env.VUE_APP_IFTTT_ACCESS_API, {
          'value1': this.id,
          'value2': this.title
        })
          .catch(function (error) {
            console.error(error);
          })
      }
    },
    mounted() {
      // get progress when init
      this.getProgress(this.value);
    }
  }
</script>

<style scoped>
  .card-item {
    width: 240px;
    height: 165px;
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    margin: 0 35px;
    box-shadow: #1c1c1c 0 0 5px;
    transition: height 0.25s ease;
  }

  .card-item.has-circle {
    height: 325px;
    transition: height 0.25s ease;
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

  .indicator-item-list {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .indicator-item {
    width: 30px;
    height: 12px;
    border-radius: 15px;
    border: #fff solid 1px;
    box-sizing: border-box;
    background-color: transparent;
    margin-left: 5px;
    margin-right: 5px;
    transition: all 0.2s ease;
  }

  .indicator-item.fill {
    background-color: #fff;
    transition: all 0.2s ease;
  }
</style>