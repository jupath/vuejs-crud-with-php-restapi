<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  created() {
    this.$store.dispatch('fetchUsers');
  },
  components: {
    appHeader: Header,
  }
}
</script>
