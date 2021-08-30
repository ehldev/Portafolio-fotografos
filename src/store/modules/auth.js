import { firebaseAuth, db, firebaseTimestamp } from '@/firebase/firebaseConfig'

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
		registration({commit, dispatch}, {name, email, password}) {
			return new Promise((resolve, reject) => {
				firebaseAuth.createUserWithEmailAndPassword(email, password)
				  	.then((userCredential) => {
				    	var user = userCredential.user;

				      	db.collection("users").add({
				          userId: user.uid,
				          name,
				          email,
				          photo: '',
				          createdAt: firebaseTimestamp
				      	})
				      	.then((docRef) => {
				          dispatch('login', {email, password})
				          	.then(() => {
				          		dispatch('sendEmailVerify')
				          			.then(() => resolve())
				          	})
				      	})
				      	.catch((error) => {
				          console.error("Error adding document: ", error);
				      	})
				  	})
				  	.catch((error) => {
				    	reject(error)
					});
			})
		},
		login({commit}, credentials) {
			return new Promise((resolve, reject) => {
				firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
				  .then((userCredential) => {

				  	let { uid, email, emailVerified } = userCredential.user

				    // Signed in
				    var user = {
				    	id: uid,
				    	email,
				    	emailVerified
				    }

				    commit('SET_USER', user)

				    resolve()
				  })
				  .catch((error) => {
				    reject(error)
				  });
			})
		},
		async logout({commit}) {
			firebaseAuth.signOut()
			.then(() => {
			  let user = null

			  commit('SET_USER', user)
			})
		},
		authState({commit}) {
			return new Promise(resolve => {
				firebaseAuth.onAuthStateChanged((user) => {
				  if (user) {
				    
				  	let { uid, email, emailVerified } = user

				    var data = {
				    	id: uid,
				    	email,
				    	emailVerified
				    }

				    commit('SET_USER', data)
				  }

				  resolve()
				});
			})
		},
		async sendEmailVerify() {
			await firebaseAuth.currentUser.sendEmailVerification()
		},
		sendEmailResetPassword({ commit }, { email }) {
			return new Promise((resolve, reject) => {
				firebaseAuth.sendPasswordResetEmail(email)
					.then(() => {
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			})
		}
	}
}