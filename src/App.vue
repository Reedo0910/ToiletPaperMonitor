<template>
  <div id="app">
    <h1>
      <router-link to="/">Toilet Paper Monitor</router-link>
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
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

  a {
    color: #eee;
    text-decoration: none;
  }

  a:hover {
    color: #ccc;
  }
</style>
