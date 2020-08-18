<template>
  <vue-draggable-resizable :x="mX" :y="mY" :w="mWidth" :h="mHeight" @dragging="onDrag" @resizing="onResize" class-name="note" :parent="true">
    <v-card :height="mHeight">
      <v-card-title>{{ note.text }}</v-card-title>
    </v-card>
  </vue-draggable-resizable>
</template>

<script>
import db from '../firebase';

export default {
  props: {
    note: {
      type: Object,
      default: () => {},
    },
    id: Number
  },
  data() {
    return {
      mX: this.note.x,
      mY: this.note.y,
      mWidth: this.note.width,
      mHeight: this.note.height,
    }
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.mX = x
      this.mY = y
      this.mWidth = width
      this.mHeight = height
      this.updateNote();
    },
    onDrag: function (x, y) {
      this.mX = x
      this.mY = y
      this.updateNote();
    },
    updateNote() {
      db.ref('towers/' + this.$auth.user.towerName + '/notes/' + this.id).set({
        x: this.mX,
        y: this.mY,
        width: this.mWidth,
        height: this.mHeight,
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