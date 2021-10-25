<template>
	<b-modal id="modal-detalle-publicacion" size="xl" hide-header hide-footer centered>
	    <section class="container modal-detalle">
	    	<div class="row justify-content-between">
	    		<div class="col-md-5 px-0">
	    			<div v-bind:style="{backgroundImage: 'url(' + item.url + ')'}" class="modal-detalle_imagen w-100"></div>
	    		</div>

	    		<div class="col-md-6 py-4 pl-md-0 pr-md-5">

	    			<div class="d-flex justify-content-between align-items-center">
	    				<p class="small my-0">
		    				<span v-b-tooltip.hover title="Fecha de publicación">
		    					<i class="fas fa-calendar-alt"></i>
		    				</span>
		    				<span class="d-inline-block ml-2">{{ new Date | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
		    			</p>

	    				<a :href="item.url" target="_blank" class="d-inline-block my-2">
		    				URL pública
		    				<i class="fas fa-external-link-alt"></i>
		    			</a>
	    			</div>

	    			<p class="small mb-3">
	    				<span v-b-tooltip.hover title="Cantidad de vistas">
	    					Vistas
	    				</span>
	    				<span class="lead d-inline-block ml-2">5</span>
	    			</p>

	    			<!-- Descripción -->
	    			<p class="text-muted my-0" v-if="item.descripcion">
	    				{{ item.descripcion }}
	    			</p>

	    			<p class="text-muted my-0" v-if="!item.descripcion && !edit">
	    				Sin descripción

	    				<span class="pointer" v-b-tooltip.hover title="Editar" v-if="!item.descripcion" @click="edit = true">
	    					<i class="fas fa-edit"></i>
	    				</span>
	    			</p>

	    			<section v-if="edit">
	    				<textarea placeholder="Actualizando descripción" class="form-control"></textarea>

	    				<div class="d-flex justify-content-end align-items-center">
	    					<p class="text-danger pointer my-0" @click="edit = false">
		    					Cancelar
		    					<i class="fas fa-times"></i>
		    				</p>

	    					<a href="" class="text-success ml-3">
	    						Actualizar
	    						<i class="fas fa-check"></i>
	    					</a>
	    				</div>
	    			</section>

	    			<section class="mt-3">
	    				<button type="button" class="btn btn-danger text-white" @click="eliminar()">Eliminar</button>
	    			</section>
	    		</div>
	    	</div>
	    </section>
	</b-modal>
</template>

<script>
	export default {
		data() {
			return {
				edit: false
			}
		},
		props: {
			item: Object
		},
		methods: {
			eliminar() {
				alert('w')
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