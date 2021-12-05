<template>
	<b-alert
          class="small animate__animated animate__fadeIn"
          variant="info"
          show
          v-if="userData && !userData.emailVerified"
        >
          Su correo aún no ha sido verificado.
          <br />
          Por favor revise su bandeja de entrada para poder gozar de todas las
          funcionalidades de la app.

          <a href="" @click.prevent="enviarCorreo()">{{ loading ? 'Enviando...' : 'Volver a enviar correo de verificación.' }}</a>
        </b-alert>
</template>

<script>
	import { mapState, mapActions } from 'vuex'

	export default {
		data() {
			return {
				loading: false
			}
		},
		methods: {
			...mapActions({
		      sendEmailVerify: 'auth/sendEmailVerify'
		    }),
			async enviarCorreo() {
				if(!this.loading) {
					this.loading = true

				      await this.sendEmailVerify()

				      this.$toast.open({
				        message: 'Mensaje enviado, por favor revise su bandeja de entrada o spam.',
				        type: 'success',
				        position: 'top-right'
				      })

				      this.loading = false
				}
		    }
		},
		computed: {
			...mapState({
		      userData: (state) => state.auth.user,
		    })
		}
	}
</script>	