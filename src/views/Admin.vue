<template>
  <div class="about">
    <h1>Admin dashboard</h1>
    {{ user }}
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user
      })
    }
  }
</script>
