<template>
  <div id="app">
    <NotesMenu />
  </div>
</template>

<script>
import NotesMenu from './components/NotesMenu.vue'
export default {
  name: 'App',
  components: {
    NotesMenu
  },
}
</script>

<style>
  body {
    background: rgb(255, 255, 255);
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
