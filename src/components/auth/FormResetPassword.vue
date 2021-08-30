<template>
  <section class="bg-light mt-4 p-3">
    <b-form @submit.prevent="onSubmit">
      <p>
        Te enviaremos un link al correo registrado para que puedas cambiar tu contraseña.
      </p>

      <b-form-group
        id="input-group-1"
        label="Correo electrónico"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-alert variant="danger" show v-if="error">{{ error }}</b-alert>

      <b-alert variant="success" show v-if="success">
        Mensaje enviado, por favor revisa tu bandeja de entrada.
      </b-alert>

      <section class="d-flex justify-content-between align-items-center">
        <slot name="link">
        </slot>

        <b-button type="submit" variant="primary">{{ loading ? 'Enviando...' : 'Recuperar acceso' }}</b-button>
      </section>
    </b-form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: null,
      loading: false,
      errors: [
        {
          code: 'auth/user-not-found',
          message: 'El correo electrónico no está registrado.'
        }
      ],
      error: null,
      success: false
    }
  },
  methods: {
    ...mapActions({
      sendEmailResetPassword: 'auth/sendEmailResetPassword'
    }),
    async onSubmit() {
      this.loading = true
      this.error = null
      this.success = false

      let { email } = this

      await this.sendEmailResetPassword({ email })
            .then(() => {
              this.email = null

              this.success = true

              this.loading = false
            })
            .catch(({ code }) => {
              this.error = this.errors.find(e => e.code === code).message

              this.loading = false
            })
    }
  }
}
</script>

<style lang="scss">
</style>
