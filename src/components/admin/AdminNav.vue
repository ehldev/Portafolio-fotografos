<template>
  <div>
    <section class="admin-nav" :class="{'admin-nav--active': showNav}">
      <div class="d-flex flex-column justify-content-center align-items-center text-center pt-5">
        <div class="admin-nav__user-image" v-bind:style="userImage"> 
        </div>

        <div class="py-3 px-4">
          <span class="text-white font-weight-bold d-inline-block mt-3">@ehldev</span>

          <p class="text-muted small">
            Lorem ipsum dolor sit amet consectetur adipisicing, elit. Architecto, nihil nobis mollitia eius. Iusto, debitis.
          </p>
        </div>
      </div>

      <nav class="text-left mt-4 py-3 px-4">
        <router-link to="/" class="btn btn-light btn-block">Explorar</router-link>
        <router-link :to="{name: 'admin'}" class="btn btn-light btn-block">Portafolio</router-link>
        <router-link :to="{name: 'admin-fotos'}" class="btn btn-light btn-block">Fotos</router-link>
        <button type="button" class="btn btn-danger btn-block text-white" @click="logoutAction()">Salir</button>
      </nav>
    </section>

    <button class="hamburger hamburger--spin d-md-none" :class="{'is-active': showNav}" type="button" @click="showNav = !showNav">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        loading: false,
        showNav: true
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
  width: 75%;
  height: 100vh;

  background-color: rgba($dark, .97) !important;

  position: fixed;
  top: 0;
  left: -100%;
  z-index: 100;

  @media (min-width: 768px) {
    width: 25%;
    height: 100%;

    left: 0;
  }

  transition: .5s;

  &--active {
    left: 0;
  }

  &:hover {
    background-color: $dark !important;
  }

  &__user-image {
    width: 60%;
    min-height: 200px;

    background-size: cover;
    background-position: center;

    border-radius: 50%;
  }
}

.hamburger {
  position: fixed;
  top: 1rem;
  right: .5rem;

  &-inner {
    background-color: white !important;

    &::before,
    &::after {
      background-color: white !important;
    }
  }
}
</style>