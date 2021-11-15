<template>
  <div class="container admin-fotos editar-datos mt-3">
    <div class="row">
      <div class="col-md-12">
        <VerificarCorreo />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h1 class="admin-fotos_titulo text-white">Editar datos</h1>
      </div>

      <div class="col-md-8 mt-3">
        <form @submit.prevent="verifyUpdate()">
          <div class="form-group">
            <label for="name" class="text-white">Nombres y apellidos</label>
            <input type="text" id="name" class="form-control mt-1" v-model="name">
          </div>

          <div class="form-group">
            <label for="description" class="text-white">Sobre mí</label>
            <textarea id="description" class="form-control" v-model="description"></textarea>
          </div>

          <div class="form-group text-right mt-4">
            <button type="submit" :disabled="loading || !validateForm" class="btn btn-primary px-5">{{ loading ? 'Actualizando' : 'Actualizar' }}</button>
          </div>
        </form>
      </div>

      <div class="col-md-4">
        <section v-if="!file">
          <vue-dropzone ref="dropzone" id="dropzone" class="dropzone-main" :options="dropzoneOptions" @vdropzone-drop="setUploadFileLoading" @vdropzone-file-added="setUploadFileLoading" @vdropzone-complete="setFile($event)">
          </vue-dropzone>
        </section>

        <section v-else>
          <img :src="previewFile" alt="Nueva foto de perfil" class="preview">

          <div class="text-right">
            <a href="" class="text-danger d-inline-block mt-3" @click.prevent="removeFile()" v-if="!loading">Cancelar</a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  import { v1 as uuidv1 } from 'uuid'

  import { mapGetters, mapActions } from 'vuex'

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
              <p class="dropzone-main_descripcion">Arrastre o haga click aquí, para cambiar su foto de perfil.</p>
            </div>
          `
        },
        items: [],
        name: '',
        description: '',
        file: null,
        previewFile: null,
        loadingUploadFile: false,
        loading: false
      }
    },
    mounted() {
      this.assignData()
    },
    components: {
      VerificarCorreo,
      vueDropzone
    },
    methods: {
      ...mapActions({
        authState: 'auth/authState'
      }),
      async assignData() {
        this.name = `${this.user.name}`
        this.description = this.user.description ? `${this.user.description}` : ''
      },
      setUploadFileLoading() {
        this.loadingUploadFile = true
      },
      setFile(file) {
        this.loadingUploadFile = false

        this.file = file

        this.previewFile = URL.createObjectURL(file)

        this.$refs.dropzone.disable()
      },
      removeFile() {
        this.file = null
        this.previewFile = null

        if(this.$refs.dropzone) {
          this.$refs.dropzone.enable()
        }
      },
      async verifyUpdate() {
        if(this.file) {
          await this.uploadFile()
        } else {
          await this.update()
        }
      },
      async uploadFile() {
        if(!this.validateForm) return

        this.loading = true

        let fileName = `${uuidv1()}-${this.file.name}`,
            refPath = `images/${this.user.id}/perfil/${fileName}`
        
        let imageRef = storageRef.child(refPath)

        await imageRef.put(this.file)
          .then(async (snapshot) => {
            let url = await snapshot.ref.getDownloadURL()
            
            this.update({
              url
            })
          })
      },
      async update(image) {
        if(!this.validateForm) return

        try {
          this.loading = true

          let userRef = await db.collection("users").doc(this.user.docId)

          await userRef.update({
            name: this.name,
            description: this.description,
            photo: image ? image.url : ''
          })

          this.loading = false

          this.authState()

          this.removeFile()

          this.$toast.open({
            message: 'Datos actualizados',
            type: 'success',
            position: 'top-right'
          })

        } catch(error) {
          console.log(error)

          this.$toast.open({
            message: 'Ocurrió un error al actualizar sus datos',
            type: 'error',
            position: 'top-right'
          });
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      }),
      validateForm() {
        let status = false

        if(this.name && !this.loadingUploadFile) {
          status = true
        }

        return status
      }
    }
  }
</script>

<style lang="scss">
.editar-datos {
  .preview {
    width: 100%;
    height: 270px;
  }
}

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
