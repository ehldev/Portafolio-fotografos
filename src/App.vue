<template>
  <div id="app">
    <LoadingGlobal v-if="loading" />

    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import LoadingGlobal from '@/components/LoadingGlobal'

  export default {
    data() {
      return {
        loading: true
      }
    },
    async mounted() {
      await this.authState()

      this.loading = false
    },
    components: {
      LoadingGlobal
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
