<template>
  <div class="home">
    <template>
      <div class="home__image h-100 d-flex justify-content-end align-items-end p-4">
        <router-link to="/" class="badge badge-light">@ehldev</router-link>
      </div>

      <div class="home__content h-100 py-5 px-3">
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-8">
              <div class="text-center">
                <h1 class="home__title text-white font-weight-bold my-0">Muéstrale al mundo</h1>
                <h2 class="home__subtitle text-white font-weight-normal mt-2">Tus mejores fotos</h2>

                <section class="text-left">
                  <FormRegistration v-if="tipoFormulario === 'REGISTRO'">
                    <template slot="link">
                      <b-button type="button" variant="link" class="text-dark small pl-0" @click="tipoFormulario = 'INGRESAR'">Tengo una cuenta</b-button>
                    </template>
                  </FormRegistration>


                  <FormLogin v-if="tipoFormulario === 'INGRESAR'" @reset="tipoFormulario = 'RESTABLECER_PASSWORD'">
                    <template slot="link">
                      <b-button type="button" variant="link" class="text-dark small pl-0" @click="tipoFormulario = 'REGISTRO'">Quiero registrarme</b-button>
                    </template>
                  </FormLogin>

                  <FormResetPassword v-if="tipoFormulario === 'RESTABLECER_PASSWORD'">
                    <template slot="link">
                      <b-button type="button" variant="link" class="text-dark small pl-0" @click="tipoFormulario = 'INGRESAR'">Regresar</b-button>
                    </template>
                  </FormResetPassword>
                </section>  
              </div>
            </div>
          </div>
        </div>  
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import FormRegistration  from '@/components/auth/FormRegistration'
import FormLogin  from '@/components/auth/FormLogin'
import FormResetPassword  from '@/components/auth/FormResetPassword'

export default {
  name: 'Home',
  data() {
    return {
      tipoFormulario: 'REGISTRO'
    }
  },
  components: {
    FormRegistration,
    FormLogin,
    FormResetPassword
  },
  computed: {
    ...mapState({
        user: state => state.auth.user
    })
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr 1fr;

  &__image {
    background-image: url('https://i.pinimg.com/originals/73/53/c6/7353c69376d019fe48b6f6e175490a6e.jpg');
    background-size: cover;
    background-position: center;
  }

  .badge {
    &:hover {
      background-color: $light;
    }
  }

  &__title {
    font-size: 1.5em;

    @media (min-width: 768px) {
      font-size: 1.8em;
    }
  }

  &__subtitle {
    font-size: .9em;

    @media (min-width: 768px) {
      font-size: 1em;
    }
  }
}
</style>
