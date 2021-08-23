<template>
	<header>
		<button type="button" @click="logoutAction" v-if="user">Salir</button>

		<router-link to="/login" v-else>Login</router-link>
	</header>
</template>

<script>
	import { mapState, mapActions } from 'vuex'

	export default {
		data() {
		  return {
			email: 'erick@test.com',
			password: 'secret'
		  };
		},
		methods: {
			...mapActions({
                logout: 'auth/logout'
            }),
			async logoutAction() {
				await this.logout()

				this.$router.push('/')
			}
		},
		computed: {
			...mapState({
				user: state => state.auth.user
			})
		}
	}
</script>