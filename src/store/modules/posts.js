import firebase from 'firebase'
import { firebaseAuth, db, firebaseTimestamp } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
const storageRef = firebase.storage().ref();

export const posts = {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {
    SET_POSTS(state, data) {
      state.posts = data;
    },
  },
  actions: {
    async getPosts({ commit }) {
      const items = await db
        .collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          let list = [];

          querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;

            list.push(data);
          });

          commit("SET_POSTS", list);
        });
    },
    async deletePost({commit}, item) {
      let refToDelete = storageRef.child(item.imageRef)

      await refToDelete.delete()

      await db.collection("posts").doc(item.id).delete()

      /* db.collection("posts").doc(item.id).delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      }) */
    }
  },
  getters: {
    items(state) {
      return state.posts;
    },
  },
};
