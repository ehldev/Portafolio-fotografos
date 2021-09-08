<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <h1>{{ userData.name }}</h1>
        <h2 class="small font-weight-normal">Panel de administración</h2>
      </div>

      <div class="col-md-12">
        <b-alert class="small" variant="info" show v-if="!userData.emailVerified">
          Su correo aún no ha sido verificado.
          <br>
          Por favor revise su bandeja de entrada para poder gozar de todas las funcionalidades de la app.
        </b-alert>
      </div>

      <div class="col-md-12">
        <Posts :items="items" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import firebase from 'firebase'

  import Posts from '@/components/index/Posts'

  const storageRef = firebase.storage().ref();
  const db = firebase.firestore()

  export default {
    data() {
      return {
        items: []
      }
    },
    mounted() {
      this.getItems()
    },
    components: {
      Posts
    },
    methods: {
      getItems() {
        db.collection("posts")
          .where("userId", "==", this.user.id)
          .orderBy("createdAt", "desc")
          .onSnapshot((querySnapshot) => {
              let list = []

              querySnapshot.forEach((doc) => {
                let data = doc.data()
                    data.id = doc.id

                list.push(data)
              });

              this.items = list
          });
      }
    },
    computed: {
      ...mapState({
        userData: state => state.auth.user
      }),
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
</script>
