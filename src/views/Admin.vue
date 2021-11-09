<template>
  <div class="container admin">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <VerificarCorreo />
      </div>

      <div class="col-md-12">
        <Posts titulo="Mis fotos" :items="items" />
      </div>
    </div>

    <router-link to="/admin/fotos" class="admin_boton-agregar bg-success text-white text-decoration-none d-flex justify-content-center align-items-center border-0" v-b-tooltip.hover title="Agregar fotos">
      <i class="fas fa-plus"></i>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import firebase from "firebase";

import Posts from "@/components/index/Posts";

const storageRef = firebase.storage().ref();
const db = firebase.firestore();

import VerificarCorreo from '@/components/general/VerificarCorreo'

export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.getItems();
  },
  components: {
    VerificarCorreo,
    Posts
  },
  methods: {
    getItems() {
      db.collection("posts")
        .where("userId", "==", this.user.id)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          let list = [];

          querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;

            list.push(data);
          });

          this.items = list;
        });
    }
  },
  computed: {
    ...mapState({
      userData: (state) => state.auth.user,
    }),

    ...mapGetters({
      user: "auth/user",
    })
  },
};
</script>

<style lang="scss">
.admin {
  &_boton-agregar {
    width: 40px;
    height: 40px;

    border-radius: 50%;

    position: fixed;
    bottom: 3rem;
    right: 3rem;

    transition: transform .5s;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
