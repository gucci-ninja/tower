<template>
  <vue-draggable-resizable :x="x" :y="y" :z="z" :w="width" :h="height" @dragging="onDrag" @resizing="onResize" class-name="note" :parent="true">
    <v-card :height="height">
      <v-card-title>{{ text }}</v-card-title>
    </v-card>
  </vue-draggable-resizable>
</template>

<script>

export default {
  props: {
    id: Number,
    x: Number,
    y: Number,
    z: Number,
    width: Number,
    height: Number,
    text: String
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  },
}
</script>

<style scoped>
.note {
  border: none;
}
</style>