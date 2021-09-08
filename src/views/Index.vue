<template>
  <div class="index">
    <Welcome v-if="!user" />

    <Posts :items="items" v-else />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Welcome from '@/components/index/Welcome'
import Posts from '@/components/index/Posts'

export default {
  name: 'Index',
  data() {
    return {
      tipoFormulario: 'REGISTRO'
    }
  },
  components: {
    Welcome,
    Posts
  },
  computed: {
    ...mapState({
        user: state => state.auth.user
    }),
    ...mapGetters({
      items: 'posts/items'
    })
  }
}
</script>

<style lang="scss">
</style>
