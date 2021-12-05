<template>
  <button type="button" class="btn btn-light mr-3" @click="login()">Google</button>
</template>

<script>
import { mapActions } from "vuex";

import firebase from 'firebase'
import { GoogleAuthProvider } from "firebase/auth";

export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      loginWithGoogle: 'auth/loginWithGoogle',
      authState: 'auth/authState'
    }),

    async login() {
      await this.loginWithGoogle()

      this.authState()
        .then(() => {
          this.$router.push('/portafolio')
        })
    }
  },
};
</script>

<style lang="scss">
</style>
