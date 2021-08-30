<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    mounted() {
      this.authState()
    },
    methods: {
      ...mapActions({
        authState: 'auth/authState'
      })
    }
  }
</script>

<style lang="scss">
</style>
