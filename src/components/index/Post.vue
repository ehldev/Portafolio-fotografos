<template>
  <div>
    <b-card
      :img-src="item.url"
      img-alt="Image"
      class="main-card mb-4 border-0 bg-dark pointer"
      no-body
      @click="seleccionar()"
    >
      <b-card-text class="bg-dark p-2">
        <p class="card-description text-muted my-0">Lorem ipsum dolor sit, amet, consectetur adipisicing elit. Quia tenetur explicabo consequatur quidem cupiditate, officia.</p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    seleccionar() {
      this.$emit('selected', this.item)
    }
  }
};
</script>

<style lang="scss">
.main-card {
  transition: transform .3s;

  &:hover {
    transform: scale(1.02);
  }
}

.card-description {
  font-size: .8em;
  line-height: .8rem;
}
</style>