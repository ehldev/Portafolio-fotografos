<template>
  <div class="posts w-100 mt-5">
    <b-card-group columns>
      <b-card
        :img-src="item.url"
        img-alt="Image"
        class="main-card mb-4 border-0"
        no-body
        v-for="(item, index) in items"
        :key="index"
      >
        <b-card-text class="py-1 px-2">
          <span class="text-muted">{{ item.description }}</span>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      items: Array
    }
  }
</script>

<style lang="scss">
</style>