<template>
  <section class="bg-white mt-4 p-4">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-2" label-for="name">
        <b-form-input id="name" placeholder="Nombre" v-model="name" required></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
      >
        <b-form-input
          id="email"
          placeholder="Correo electrónico"
          v-model="email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Contraseña (Mínimo 6 caracteres)"
          required
        ></b-form-input>
      </b-form-group>

      <b-alert variant="danger" show v-if="error">{{ error }}</b-alert>

      <section
        class="d-flex flex-column justify-content-between align-items-center mt-4"
      >
        <div class="w-100 d-flex justify-content-between align-items-center">
          <slot name="link"></slot>

          <button type="submit" class="btn btn-success">{{
            loading ? "Registrando..." : "Crear cuenta"
          }}</button>
        </div>

        <p class="text-muted small mt-3 mb-4">O regístrate con</p>

        <div>
          <GoogleButton />
          <button type="button" class="btn btn-primary">Facebook</button>
        </div>
      </section>
    </b-form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import GoogleButton from './GoogleButton'

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
      errors: [
        {
          code: "auth/email-already-in-use",
          message:
            "La dirección de correo electrónico ya está siendo utilizada por otra cuenta.",
        },
      ],
      error: null,
    };
  },
  components: {
    GoogleButton
  },
  methods: {
    ...mapActions({
      registration: "auth/registration",
    }),
    onSubmit() {
      this.loading = true;
      this.error = null;

      let { name, email, password } = this;

      this.registration({ name, email, password })
        .then(() => {
          this.loading = false;

          this.$router.push("/");
        })
        .catch(({ code }) => {
          this.error = this.errors.find((e) => e.code === code).message;

          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
</style>
