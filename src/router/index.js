import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/portafolio',
		name: 'portafolio',
		component: () => import('../views/Portafolio.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/admin/fotos',
		name: 'admin-fotos',
		component: () => import('../views/SubirFotos.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/:username',
		name: 'user-profile',
		component: () => import('../views/Profile.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/editar-datos',
		name: 'editar-datos',
		component: () => import('../views/EditarDatos.vue'),
		meta: {
			requireAuth: true
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let requireAuth = to.meta.requireAuth,
		user = store.state.auth.user

	if(requireAuth && !user) {
		next('/')
	} else {
		next()
	}
})

export default router
