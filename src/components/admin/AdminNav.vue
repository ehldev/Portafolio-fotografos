<template>
  <nav class="mt-4">
    <router-link class="text-success d-inline-block mr-4" to="/">Portafolio</router-link>
    <router-link class="text-success d-inline-block mr-4" :to="{name: 'admin'}">Sobre mí</router-link>
    <router-link class="text-success" :to="{name: 'admin-fotos'}">Fotos</router-link>

    <button type="button" class="btn btn-link text-danger" @click.prevent="logoutAction()">
      {{ loading ? 'Saliendo...' : 'Salir' }}
    </button>
  </nav>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user
      })
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout'
      }),
      async logoutAction() {
        this.loading = true

        await this.logout()

        this.loading = false

        this.$router.push('/')
      }
    }
  }
</script>
