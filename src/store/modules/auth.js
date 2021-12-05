import { firebase, firebaseAuth, db, firebaseTimestamp } from '@/firebase/firebaseConfig'

const generateUsername = email => {
	let indexArroba = email.indexOf('@')

	return email.substr(0, indexArroba)
}

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
		async registration({commit, dispatch}, {name, email, password}) {
			const data = await firebaseAuth.createUserWithEmailAndPassword(email, password)

			let user = data.user,
				username = generateUsername(email)

			const docRef = await db.collection("users").add({
				          userId: user.uid,
				          name,
				          username,
				          email,
				          photo: '',
				          createdAt: firebaseTimestamp,
				          description: ''
				      	})

			dispatch('sendEmailVerify')
		},
		async login({commit, dispatch}, credentials) {
			let userCredential = await firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
		},
		async logout({commit}) {
			firebaseAuth.signOut()
			.then(() => {
			  let user = null

			  commit('SET_USER', user)
			})
		},
		authState({commit, dispatch}) {
			return new Promise(resolve => {
				firebaseAuth.onAuthStateChanged((user) => {
				  if (user) {

				  	let { uid, emailVerified } = user

				  	let dataForGetInfo = {
				  		uid,
				  		emailVerified
				  	}

				  	console.log('Auth state')
				  	
				  	dispatch('getUserData', dataForGetInfo)
				  		.then(() => resolve())

				  } else {
				  	resolve()
				  }
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
		},
		async getUserData({ commit }, data) {
			const querySnapshot = await db.collection("users").where("userId", "==", data.uid).get()

			querySnapshot.forEach(doc => {
				let { name, username, email, photo, description } = doc.data()

			    var userData = {
			    	id: data.uid,
			    	name,
			    	username,
			    	photo,
			    	email,
			    	emailVerified: data.emailVerified,
			    	description,
			    	docId: doc.id
			    }

		    	commit('SET_USER', userData)
			})
		},

		async loginWithGoogle({dispatch}) {
	      try {
	      	const provider = new firebase.auth.GoogleAuthProvider();

	        const data = await firebaseAuth.signInWithPopup(provider)

	        // Verificar si el usuario no está registradoo
	        const querySnapshot = await db.collection("users").where("userId", "==", data.user.uid).get()

	        if(!querySnapshot.docs.length) {
	        	let user = data.user,
				        	email = user.email,
							username = generateUsername(email)

				await db.collection("users").add({
		          userId: user.uid,
		          name: user.displayName,
		          username,
		          email,
		          photo: user.photoURL,
		          createdAt: firebaseTimestamp,
		          description: ''
		      	})
	        }
	      } catch(e) {
	      	console.log(e)
	      }
	    }
	},
	getters: {
		user(state) {
			return state.user
		}
	}
}