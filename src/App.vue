<template>
  <div id="app">
    <LoadingGlobal v-if="loading" />

    <template v-else>
      <div class="container-fluid px-0 py-0">
        <div class="row no-gutters px-0">
          <AdminNav v-if="user" />

          <main
            :class="user ? 'col-md-9 offset-md-3 pt-3 px-md-3' : 'col-md-12'"
          >
            <!-- <form action="" class="form-search" v-if="user && $route.name != 'admin'">
              <div class="form-group">
                <input type="search" placeholder="Buscar usuario" class="form-control py-4">
              </div>
            </form> -->

            <section>
              <router-view />
            </section>
          </main>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import LoadingGlobal from "@/components/LoadingGlobal";
import AdminNav from "@/components/admin/AdminNav";

export default {
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    await this.authState();

    await this.getPosts();

    this.loading = false;
  },
  components: {
    LoadingGlobal,
    AdminNav,
  },
  methods: {
    ...mapActions({
      authState: "auth/authState",
      getPosts: "posts/getPosts",
    }),
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>

<style lang="scss">
.form-search {
  @media (min-width: 768px) {
    max-width: 350px;

    margin: 0 auto;
  }

  .form-control {
    box-shadow: none !important;
  }
}
</style>
