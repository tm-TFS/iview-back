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
    /*data () {
      return {
          showLogin: 0
      }
    },*/
    computed: {
      showLogin () {
          return this.$route.path === '/login' ? 1 : 0
      }
    },
    /*mounted() {
      if(this.$route.path === '/login'){
          this.showLogin = 1;
      } else {
        this.showLogin = 0;
      }
    },*/
    components: {
      HeaderNav
    }
  }
</script>

<style>

</style>
