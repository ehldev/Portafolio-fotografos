<template>
	<section class="container">
		<div class="row jus justify-content-center">
			<div class="col-md-6">
				<div class="card">
					<div class="card-body">
						<b-form @submit.prevent="submit">
						  <b-form-group
							id="input-group-1"
						  >
							<b-form-input
							  id="email"
							  v-model="email"
							  type="email"
							  placeholder="Correo electrónico"
							  required
							></b-form-input>
						  </b-form-group>

						  <b-form-group id="password">
							<b-form-input
								type="password"
							  id="password"
							  v-model="password"
							  placeholder="Contraseña"
							  required
							></b-form-input>
						  </b-form-group>

						  <b-button type="submit" variant="primary">Submit</b-button>
						</b-form>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		data() {
		  return {
			email: 'erick@test.com',
			password: 'secret'
		  };
		},
		methods: {
			...mapActions({
                login: 'auth/login'
            }),
			async submit() {
				let credentials = {
					email: this.email,
					password: this.password
				}

				await this.login(credentials)

				this.$router.push('/admin')
			}
		},
	}
</script>