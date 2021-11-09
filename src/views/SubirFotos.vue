<template>
  <div class="container admin-fotos mt-3">
    <div class="row">
      <div class="col-md-12">
        <VerificarCorreo />
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1 class="admin-fotos_titulo text-white">Subir fotos</h1>
        <h2 class="admin-fotos_subtitulo small font-weight-normal">Muéstrale al mundo tus mejores</h2>
      </div>

      <div class="col-md-9 mt-3">
        <vue-dropzone ref="dropzone" id="dropzone" class="dropzone-main" :options="dropzoneOptions" @vdropzone-complete="complete($event)">
        </vue-dropzone>
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

  import VerificarCorreo from '@/components/general/VerificarCorreo'

  export default {
    data() {
      return {
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          dictDefaultMessage: `<div>
              <span class="icono">
                <i class="far fa-images"></i>
              </span>
              <p class="dropzone-main_descripcion">Arrastre o haga click aquí, para empezar a publicar.</p>
            </div>
          `
        },
        items: []
      }
    },
    components: {
      VerificarCorreo,
      vueDropzone
    },
    methods: {
      async complete(file) {
        let fileName = `${uuidv1()}-${file.name}`,
            refPath = `images/${this.user.id}/${fileName}`
        
        let imageRef = storageRef.child(refPath)

        await imageRef.put(file)
          .then(async (snapshot) => {
            let url = await snapshot.ref.getDownloadURL()
            
            this.savePost({
              imageRef: refPath,
              url
            })

            this.$refs.dropzone.removeFile(file)

            this.$toast.open({
              message: 'Imagen publicada',
              type: 'success',
              position: 'top-right'
            });
          })
      },
      async savePost({ imageRef, url }) {
        try {
          await db.collection("posts").add({
              userId: this.user.id,
              imageRef,
              url,
              description: '',
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })

        } catch(error) {
          this.$toast.open({
            message: 'Ocurrió un error al subir la imagen.',
            type: 'error',
            position: 'top-right'
          });
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user
      })
    }
  }
</script>

<style lang="scss">
.admin-fotos {
  &_titulo {
    font-size: 6vw;

    @media (min-width: 768px) {
      font-size: 2em;
    }
  }

  &_subtitulo {
    color: rgba(white, .8);
  }

  #dropzone.dropzone-main {
    min-height: 150px;

    background-color: $dark;
    color: white;

    border: 2px dashed rgba($success, .8);

    p.dropzone-main_descripcion {
      color: rgba(white, .8);

      transition: color .5s;
    }

    &:hover {
      border: 2px dashed $success;

      p.dropzone-main_descripcion {
        color: white;
      }

      .icono {
        transform: scale(1.1);
      }
    }
  }

  .dz-default.dz-message {
    min-height: 150px;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      display: block;
    }

    .icono {
      font-size: 2em;

      display: inline-block;

      transition: transform .7s;

      @media (min-width: 768px) {
        font-size: 3em;
      }
    }
  }
}
</style>
