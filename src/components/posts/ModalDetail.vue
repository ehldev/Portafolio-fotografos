<template>
	<b-modal id="modal-detalle-publicacion" size="lg" hide-header hide-footer centered>
	    <section class="container modal-detalle" v-if="item">
	    	<div class="row justify-content-between">
	    		<div class="col-md-6 px-0">
	    			<div v-bind:style="{backgroundImage: 'url(' + item.url + ')'}" class="modal-detalle_imagen w-100">
	    			</div>
	    		</div>

	    		<div class="col-md-6 d-flex flex-column justify-content-between p-4 pr-md-5">
	    			<section>
		    			<!-- <div class="mt-2">
		    				<p class="small my-0">
			    				<span class="d-inline-block">{{ new Date | moment("LLL") }}</span>
			    			</p>

		    				<a :href="item.url" target="_blank" class="d-inline-block my-3">
			    				URL pública
			    				<i class="fas fa-external-link-alt"></i>
			    			</a>
		    			</div> -->

		    			<!-- Descripción -->
			    		<div v-if="!edit">
			    			<p class="text-muted bg-light p-1" v-if="item.descripcion">
			    				{{ item.descripcion ? item.descripcion : 'Añadir descripción' }}
			    			</p>

			    			<span class="pointer text-primary" v-b-tooltip.hover title="Descripción" @click="editar()" v-if="usuarioPermitido">
		    					<i class="fas fa-edit"></i>
		    				</span>
			    		</div>

		    			<section v-else>
		    				<textarea placeholder="Actualizando descripción" class="form-control" v-model="item.descripcion"></textarea>

		    				<div class="d-flex justify-content-end align-items-center">
		    					<p class="text-danger pointer my-0" @click="cancelarActualizacion()">
			    					Cancelar
			    					<i class="fas fa-times"></i>
			    				</p>

		    					<a href="" class="text-success ml-3" @click.prevent="actualizarDescripcion()">
		    						{{ actualizando ? 'Actualizando...' : 'Actualizar' }}
		    						<i class="fas fa-check"></i>
		    					</a>
		    				</div>
		    			</section>
		    		</section>

	    			<section class="mt-3 text-right" v-if="usuarioPermitido">
	    				<button type="button" class="btn btn-danger text-white" @click="confirmarEliminacion = !confirmarEliminacion">{{ confirmarEliminacion ? 'No eliminar' : 'Eliminar' }}</button>

	    				<p class="small mt-3 mb-1" v-if="confirmarEliminacion">
	    					¿Está seguro de eliminar?

	    					<button type="button" class="btn btn-link btn-sm small text-success px-1" @click="eliminar()">Confirmar</button>
	    				</p>
	    			</section>
	    		</div>
	    	</div>
	    </section>
	</b-modal>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex'

	export default {
		data() {
			return {
				edit: false,
				confirmarEliminacion: false,
				actualizando: false,
				borradorDescripcion: null
			}
		},
		props: {
			item: Object
		},
		methods: {
			...mapActions({
				deletePost: 'posts/deletePost',
				getPosts: 'posts/getPosts',
				updateDescription: 'posts/updateDescription'
			}),
			async eliminar() {
				if(!this.usuarioPermitido) {
					return
				}
				
				await this.deletePost(this.item)
				// Aquí se actualizaría el estado con una nueva petición pero gracias a firestore ya no es necesario
				// await this.getPosts()

				this.confirmarEliminacion = false

	            this.$bvModal.hide('modal-detalle-publicacion')

	            this.$toast.open({
	              message: 'Imagen Eliminada',
	              type: 'success',
	              position: 'top-right'
	            });
			},
			async actualizarDescripcion() {
				if(!this.usuarioPermitido) {
					return
				}

				this.actualizando = true

				let data = {
					id: this.item.id,
					descripcion: this.item.descripcion
				}

				await this.updateDescription(data)

				this.actualizando = false
				this.edit = false

				this.$toast.open({
	              message: 'Descripción actualizada',
	              type: 'success',
	              position: 'top-right'
	            })
			},
			editar() {
				this.borradorDescripcion = `${this.item.descripcion}`
				this.edit = true
			},
			cancelarActualizacion() {
				this.edit = false
				this.item.descripcion = this.borradorDescripcion
			}
		},
		computed: {
			...mapGetters({
				user: 'auth/user'
			}),
			usuarioPermitido() {
				let status = false

				if(this.user) {
					if(this.item.userId === this.user.id) {
						status = true
					}
				}

				return status
			}
		}
	}
</script>

<style lang="scss">
.modal-detalle {
	&_imagen {
		background-repeat: round;

		min-height: 500px;
	}
}

#modal-detalle-publicacion___BV_modal_body_ {
	padding: 0 !important;
}
</style>