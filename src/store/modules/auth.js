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
		registration({commit, dispatch}, {name, email, password}) {
			return new Promise((resolve, reject) => {
				firebaseAuth.createUserWithEmailAndPassword(email, password)
				  	.then((userCredential) => {
				    	var user = userCredential.user;

				    	let username = generateUsername(email)

				      	db.collection("users").add({
				          userId: user.uid,
				          name,
				          username,
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

				    let dataForGetInfo = {
				  		uid,
				  		email,
				  		emailVerified
				  	}

				  	
				  	dispatch('getUserData', dataForGetInfo)
				  		.then(() => resolve())
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
			await db.collection("users").where("userId", "==", data.uid)
		  		.get()
			    .then((querySnapshot) => {
			        querySnapshot.forEach((doc) => {
			            let { name, username, photo } = doc.data()

					    var userData = {
					    	id: data.uid,
					    	name,
					    	username,
					    	photo,
					    	email: data.email,
					    	emailVerified: data.emailVerified
					    }

				    	commit('SET_USER', userData)
			        });
			    })
			    .catch((error) => {
			        console.log("Error getting documents: ", error);
			    });
		}
	}
}