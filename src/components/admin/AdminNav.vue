<template>
  <section class="admin-nav">
    <div class="d-flex flex-column justify-content-center align-items-center text-center pt-5">
      <div class="admin-nav__user-image" v-bind:style="userImage"> 
      </div>

      <span class="font-weight-bold d-inline-block mt-3">@ehldev</span>
    </div>

    <div class="mt-4">
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-50">
          <b-tab title="Explorar" active @click="$router.push('/')"></b-tab>

          <b-tab title="Portafolio" @click="$router.push({name: 'admin'})"></b-tab>

          <b-tab title="Fotos" @click="$router.push({name: 'admin-fotos'})"></b-tab>

          <b-tab :title="loading ? 'Saliendo...' : 'Salir'" @click.prevent="logoutAction()"></b-tab>
        </b-tabs>
      </b-card>
    </div>
  </section>
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
      }),
      userImage() {
        let image = 'https://firebasestorage.googleapis.com/v0/b/erick-apps.appspot.com/o/images%2FLeNPhcv1hPdORMXBKDRnOp2uqLF3%2Fc1895660-1064-11ec-9ea5-c3c21adff5da-06b373de13b7f604345a781a4a9dc697.jpg?alt=media&token=a2763c58-feee-47b8-ae26-1c3f8a580a43'

        return {
          backgroundImage: `url(${image})`
        }
      }
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

<style lang="scss">
.admin-nav {
  width: 25%;

  position: fixed;
  top: 0;
  left: 0;

  &__user-image {
    width: 60%;
    min-height: 200px;

    background-size: cover;
    background-position: center;

    border-radius: 50%;
  }
}
</style>