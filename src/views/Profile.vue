<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1>Erick Huamani</h1>
        <h2 class="small font-weight-normal">Panel de administración</h2>

        <pre>
          {{ user }}
        </pre>
      </div>

      <div class="col-md-6">
        <b-alert variant="info" show v-if="!user.emailVerified">
          Su correo aún no ha sido verificado.
          <br>
          Por favor revise su bandeja de entrada para poder gozar de todas las funcionalidades de la app.
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
</script>
