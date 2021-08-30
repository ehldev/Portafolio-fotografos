<template>
  <section class="bg-light mt-4 p-3">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-2" label="Nombre" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          required
        ></b-form-input>
      </b-form-group>

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
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          required
        ></b-form-input>
      </b-form-group>

      <b-alert variant="danger" show v-if="error">{{ error }}</b-alert>

      <section class="d-flex justify-content-between align-items-center">
        <slot name="link">
        </slot>

        <b-button type="submit" variant="primary">{{ loading ? 'Registrando...' : 'Registrarme' }}</b-button>
      </section>
    </b-form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false,
      errors: [
        {
          code: 'auth/email-already-in-use',
          message: 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'
        }
      ],
      error: null
    }
  },
  methods: {
    ...mapActions({
      registration: 'auth/registration'
    }),
    onSubmit() {
      this.loading = true
      this.error = null

      let { name, email, password } = this

      this.registration({name, email, password})
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
