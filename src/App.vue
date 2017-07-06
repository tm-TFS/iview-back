<template>
  <div id="app">
    <header-nav v-if="!showLogin">
      <router-view></router-view>
    </header-nav>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import HeaderNav from './components/public/headerNav.vue';
  export default {
    name: 'app',
    data () {
      return {
          showLogin: 0
      }
    },
    mounted() {
        console.log(this.$route);
      if(this.$route.path === '/login'){
          this.showLogin = 1;
      }
    },
    components: {
      HeaderNav
    }
  }
</script>

<style>

</style>
