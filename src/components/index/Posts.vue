<template>
  <div id="posts-container" class="posts w-100">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="posts_titulo text-white">{{ titulo }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 d-flex justify-content-end">
          <button
            type="button"
            class="grid-button mr-2"
            :class="{ 'grid-button--active': grid === 'three' }"
            @click="grid = 'three'"
          >
            <i class="fas fa-th"></i>
          </button>

          <button
            type="button"
            class="grid-button"
            :class="{ 'grid-button--active': grid === 'two' }"
            @click="grid = 'two'"
          >
            <i class="fas fa-grip-vertical"></i>
          </button>
        </div>
      </div>
    </div>

    <section class="container mt-3">
      <div class="row" v-if="grid === 'three'">
        <div class="col-md-12">
          <div>
            <b-card-group columns>
              <post
                v-for="(item, index) in posts"
                :key="index"
                :item="item"
              ></post>
            </b-card-group>
          </div>
        </div>
      </div>

      <div class="row" v-else>
        <div class="col-md-6" v-for="(item, index) in posts" :key="index">
          <post :item="item"></post>
        </div>
      </div>
    </section>

    <button
      type="button"
      class="alert-fixed bg-info text-white py-2 px-3"
      @click="setItems()"
      v-if="showAlert"
    >
      Existen nuevos posts
    </button>
  </div>
</template>

<script>
import Post from "./Post";

export default {
  data() {
    return {
      posts: [],
      newPosts: [],
      showAlert: false,
      grid: "three",
    };
  },
  mounted() {
    setTimeout(() => {
      this.setItems();
    }, 1000);
  },
  props: {
    titulo: String,
    items: Array,
  },
  components: {
    Post,
  },
  watch: {
    items: function (val) {
      this.newPosts = val;

      if (this.posts.length && this.newPosts.length > this.posts.length) {
        this.showAlert = true;
      }
    },
  },
  methods: {
    setItems() {
      this.posts = JSON.parse(JSON.stringify(this.items));

      const myEl = document.getElementById("posts-container");

      this.$smoothScroll({
        scrollTo: myEl,
        updateHistory: false,
        offset: -50,
      });

      this.showAlert = false;
    },
  },
  computed: {
    // postsList: function() {
    //   if(this.items) {
    //     return JSON.parse(JSON.stringify(this.items))
    //   }
    // }
  },
};
</script>

<style lang="scss">
.posts {
  &_titulo {
    font-size: 6vw;

    @media (min-width: 768px) {
      font-size: 2em;
    }
  }
}

.alert-fixed {
  position: fixed;
  bottom: 0;
  right: 0;
}

.grid-button {
  width: 30px;
  height: 30px;

  background-color: rgba($dark, 0.9);

  color: rgba(white, 0.3);

  display: inline-block;

  border: 1px solid rgba($dark, 0.9);
  border-radius: 0.1rem;

  transition: background-color 0.5s, border 0.3s, color 0.3s;

  &:hover {
    background-color: $dark;

    color: white;

    border: 1px solid $dark;
  }

  &--active {
    background-color: $dark;

    color: white;

    border: 1px solid $dark;
  }
}
</style>