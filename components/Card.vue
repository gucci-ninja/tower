<template>
  <vue-draggable-resizable :x="note.x" :y="note.y" :w="note.width" :h="note.height" @dragging="onDrag" @resizing="onResize" class-name="note" :parent="true">
    <v-card :height="note.height">
      <v-card-title>{{ note.text }}</v-card-title>
    </v-card>
  </vue-draggable-resizable>
</template>

<script>
// import db from '../firebase';
export default {
  props: {
    note: {
      type: Object,
      default: () => {},
    },
    id: Number
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.note.x = x
      this.note.y = y
      this.note.width = width
      this.note.height = height
      this.updateNote();
    },
    onDrag: function (x, y) {
      this.note.x = x
      this.note.y = y
      this.updateNote();
    },
    updateNote() {
      this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/notes/' + this.id).set({
        x: this.note.x,
        y: this.note.y,
        width: this.note.width,
        height: this.note.height,
        text: this.note.text,
      })
    }
  },
}
</script>

<style scoped>
.note {
  border: none;
  position: absolute;
}
</style>