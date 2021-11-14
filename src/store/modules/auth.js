import { firebaseAuth, db, firebaseTimestamp } from '@/firebase/firebaseConfig'

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

			dispatch('login', {email, password})
			dispatch('sendEmailVerify')
		},
		async login({commit, dispatch}, credentials) {

			let userCredential = await firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)

			let { uid, email, emailVerified } = userCredential.user

		    let dataForGetInfo = {
		  		uid,
		  		email,
		  		emailVerified
		  	}
		  	
		  	await dispatch('getUserData', dataForGetInfo)


			// return new Promise(async (resolve, reject) => {
			// 	firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
			// 	  .then((userCredential) => {

			// 	  	let { uid, email, emailVerified } = userCredential.user

			// 	    let dataForGetInfo = {
			// 	  		uid,
			// 	  		email,
			// 	  		emailVerified
			// 	  	}

				  	
			// 	  	await dispatch('getUserData', dataForGetInfo)

			// 	  	resolve()
			// 	  })
			// 	  .catch((error) => {
			// 	    reject(error)
			// 	  });
			// })
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

				  	let { uid, email, emailVerified } = user

				  	let dataForGetInfo = {
				  		uid,
				  		email,
				  		emailVerified
				  	}

				  	
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
				let { name, username, photo, description } = doc.data()

			    var userData = {
			    	id: data.uid,
			    	name,
			    	username,
			    	photo,
			    	email: data.email,
			    	emailVerified: data.emailVerified,
			    	description
			    }

		    	commit('SET_USER', userData)
			})

			// await db.collection("users").where("userId", "==", data.uid)
		 //  		.get()
			//     .then((querySnapshot) => {
			//         querySnapshot.forEach((doc) => {
			//             let { name, username, photo, description } = doc.data()

			// 		    var userData = {
			// 		    	id: data.uid,
			// 		    	name,
			// 		    	username,
			// 		    	photo,
			// 		    	email: data.email,
			// 		    	emailVerified: data.emailVerified,
			// 		    	description
			// 		    }

			// 	    	commit('SET_USER', userData)
			//         });
			//     })
			//     .catch((error) => {
			//         console.log("Error getting documents: ", error);
			//     });
		}
	},
	getters: {
		user(state) {
			return state.user
		}
	}
}