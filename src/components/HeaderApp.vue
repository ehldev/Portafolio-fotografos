<template>
	<header class="header d-flex justify-content-end align-items-center py-2 px-3">
		<button type="button" class="btn btn-danger text-white" @click="logoutAction" v-if="user">Salir</button>

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

<style lang="scss">
.header {
	width: 50%;
	height: 50px;

	position: fixed;
	top: 0;
	right: 0;
}
</style>