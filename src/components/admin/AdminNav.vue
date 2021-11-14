<template>
  <div class="col-12">
    <section class="admin-nav" :class="{'admin-nav--active': showNav}">
      <div class="d-flex flex-column justify-content-center align-items-center text-center pt-4">
        <div class="admin-nav__user-image animate__animated animate__fadeIn" v-bind:style="userImage"> 
        </div>

        <div class="py-3 px-4 animate__animated animate__fadeIn">
          <h1 class="admin-nav__titulo text-white mb-0">{{ user.name }}</h1>
          <span class="small text-white font-weight-bold d-inline-block">@{{ user.username }}</span>

          <p class="text-muted small text-left px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing, elit. Architecto, nihil nobis mollitia eius. Iusto, debitis.
          </p>
        </div>
      </div>

      <nav class="text-left mt-2 py-3 px-4">
        <router-link to="/" class="btn btn-light btn-block">Explorar</router-link>
        <router-link :to="{name: 'portafolio'}" class="btn btn-light btn-block">Portafolio</router-link>
        <router-link :to="{name: 'editar-datos'}" class="btn btn-light btn-block">Editar mis datos</router-link>
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
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        loading: false,
        showNav: true
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
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      }),
      userImage() {
        let image = 'https://firebasestorage.googleapis.com/v0/b/erick-apps.appspot.com/o/images%2FLeNPhcv1hPdORMXBKDRnOp2uqLF3%2Fc1895660-1064-11ec-9ea5-c3c21adff5da-06b373de13b7f604345a781a4a9dc697.jpg?alt=media&token=a2763c58-feee-47b8-ae26-1c3f8a580a43'

        if(this.user) {
          if(this.user.photo) image = this.user.photo
        }

        return {
          backgroundImage: `url(${image})`
        }
      }
    },
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

  &__titulo {
    font-size: 1.5em;

    @media (min-width: 768px) {
      font-size: 2em;
    }
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
  z-index: 100;

  &-inner {
    background-color: white !important;

    &::before,
    &::after {
      background-color: white !important;
    }
  }
}
</style>