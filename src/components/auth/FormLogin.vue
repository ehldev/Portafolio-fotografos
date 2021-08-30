<template>
  <section class="bg-light mt-4 p-3">
    <b-form @submit.prevent="onSubmit">
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

      <b-form-group
        id="input-group-1"
        label="Contraseña"
        label-for="password"
        class="mb-1"
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <a href="" class="small" @click.prevent="$emit('reset')">He olvidado mi contraseña</a>

      <div class="mt-2">
        <b-alert variant="danger" show v-if="error">{{ error }}</b-alert>
      </div>

      <section class="d-flex justify-content-between align-items-center mt-3">
        <slot name="link">
        </slot>

        <b-button type="submit" variant="primary">{{ loading ? 'Ingresando...' : 'Ingresar' }}</b-button>
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
      password: null,
      loading: false,
      errors: [
        {
          code: 'auth/user-not-found',
          message: 'No hay ningún registro de usuario que corresponda a este correo.'
        },
        {
          code: 'auth/wrong-password',
          message: 'La contraseña es incorrecta.'
        }
      ],
      error: null
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async onSubmit() {
      this.loading = true
      this.error = null

      let { email, password } = this

      await this.login({ email, password })
            .then(() => {
              this.loading = false

              this.$router.push('/admin')
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
