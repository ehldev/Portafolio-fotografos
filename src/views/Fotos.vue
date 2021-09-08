<template>
  <div class="container admin-fotos mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1>Subir fotos</h1>
        <h2 class="small font-weight-normal">Muéstrale al mundo tus mejores</h2>
      </div>

      <div class="col-md-9 mt-3">
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="complete($event)">
          <div class="dropzone-custom-content">
            <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
            <div class="subtitle">...or click to select a file from your computer</div>
          </div>
        </vue-dropzone>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-4 mb-5" v-for="item in items" :key="item.id">
        <img :src="item.url" :alt="item.description" class="w-100">
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  import { v1 as uuidv1 } from 'uuid'

  import { mapState } from 'vuex'

  import vueDropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'

  const storageRef = firebase.storage().ref();
  const db = firebase.firestore()

  export default {
    data() {
      return {
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          dictDefaultMessage: "<p>Arrastre o haga click aquí, para mostrarle al mundo tus mejores fotos.</p>"
        },
        items: []
      }
    },
    mounted() {
      setTimeout(() => {
        this.getItems()
      }, 1000)
    },
    components: {
      vueDropzone
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
      },
      complete(file) {
        let fileName = `${uuidv1()}-${file.name}`,
            refPath = `images/${this.user.id}/${fileName}`
        
        let imageRef = storageRef.child(refPath)

        imageRef.put(file)
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(url => {
                this.savePost({
                  imageRef: refPath,
                  url
                })
              })
          })
      },
      savePost({ imageRef, url }) {
        db.collection("posts").add({
            userId: this.user.id,
            imageRef,
            url,
            description: '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user
      })
    }
  }
</script>
