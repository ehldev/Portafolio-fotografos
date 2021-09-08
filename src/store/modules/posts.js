import { firebaseAuth, db, firebaseTimestamp } from '@/firebase/firebaseConfig'

export const posts = {
	namespaced: true,
	state: {
		posts: []
	},
	mutations: {
		SET_POSTS(state, data) {
			state.posts = data
		}
	},
	actions: {
		async getPosts({ commit }) {
			const items = await db.collection("posts")
	          .orderBy("createdAt", "desc")
	          .onSnapshot((querySnapshot) => {
	              let list = []

	              querySnapshot.forEach((doc) => {
	                let data = doc.data()
	                    data.id = doc.id

	                list.push(data)
	              });

	              // this.items = list

	              commit('SET_POSTS', list)
	          });
		}
	},
	getters: {
		items(state) {
			return state.posts
		}
	}
}