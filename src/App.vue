<template>
  <div id="app">
    <header-nav>
      <router-view></router-view>
    </header-nav>
  </div>
</template>

<script>
  import HeaderNav from './components/public/headerNav.vue';
  export default {
    name: 'app',
    components: {
      HeaderNav
    }
  }
</script>

<style>

</style>
