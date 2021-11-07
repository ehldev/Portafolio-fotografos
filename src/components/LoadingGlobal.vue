<template>
	<section class="loading-global d-flex justify-content-center align-items-center">
		<h1 class="text-white">Loading...</h1>
	</section>
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
.loading-global {
	width: 100vw;
	height: 100vh;

	position: fixed;
	top: 0;
	left: 0;
}
</style>