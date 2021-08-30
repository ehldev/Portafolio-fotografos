import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
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
		path: '/admin',
		name: 'admin',
		component: () => import('../views/Admin.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/admin/fotos',
		name: 'admin-fotos',
		component: () => import('../views/Fotos.vue'),
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
