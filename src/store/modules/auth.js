import firebase from 'firebase'

export const auth = {
	namespaced: true,

	state: {
		user: null
	},

	mutations: {
		SET_USER(state, value) {
			state.user = value
		}
	},

	actions: {
		async login({commit}, credentials) {
			await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
			  .then((userCredential) => {

			  	let { id, email, emailVerified } = userCredential.user

			    // Signed in
			    var user = {
			    	id,
			    	email,
			    	emailVerified
			    }

			    commit('SET_USER', user)
			  })
			  .catch((error) => {
			    var errorCode = error.code;
			    var errorMessage = error.message;
			});

			return Promise.resolve("Success")
		},
		async logout({commit}) {
			firebase.auth().signOut().then(() => {
			  let user = null

			  commit('SET_USER', user)
			}).catch((error) => {
			  // An error happened.
			});
		},
		async authState({commit}) {
			firebase.auth().onAuthStateChanged((user) => {
			  if (user) {
			    
			  	let { id, email, emailVerified } = user

			    // Signed in
			    var data = {
			    	id,
			    	email,
			    	emailVerified
			    }

			    commit('SET_USER', data)

			  }
			});
		}
	}
}