<template>
  <vue-draggable-resizable
    :draggable="draggable"
    :x="note.x"
    :y="note.y"
    :w="note.width"
    :h="note.height"
    @dragging="onDrag"
    @resizing="onResize"
    class-name="note"
    :parent="true"
    :min-width="50"
    :min-height="50"
  >
    <v-btn 
      class="options"
      v-show="options"
      icon
      @mouseover="options = true"
      @mouseleave="options = false" 
      @click="deleteCard"
      style="right: 0px"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-btn 
      class="options"
      v-show="options"
      icon
      @mouseover="options = true"
      @mouseleave="options = false" 
      @click="colorPicker = true"
      style="right: 40px"
    >
      <v-icon>mdi-palette</v-icon>
    </v-btn>
    <v-textarea
      @focus="draggable = false"
      @blur="draggable = true"
      :background-color="note.color"
      solo
      :height="note.height"
      no-resize
      :value="note.text"
      @input="onText"
      @mouseover="options = true"
      @mouseleave="options = false"
      hide-details
    >
    </v-textarea>
    <ColorPicker
      @color-picked="onColorChange"
      :defaultColor="note.color"
      v-show="colorPicker"
    />
  </vue-draggable-resizable>
</template>

<script>
import ColorPicker from '../components/ColorPicker.vue';

export default {
  name: 'Card',
  components: {
    ColorPicker,
  },
  data: () => ({
    options: false,
    colorPicker: false,
    draggable: true,
  }),
  props: {
    note: {
      type: Object,
      default: () => {},
    },
    id: String
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
    onText: function (text) {
      this.note.text = text
      this.updateNote();
    },
    onColorChange: function (color) {
      this.note.color = color;
      this.updateNote();
    },
    updateNote() {
      this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/notes/' + this.id).set({
        x: this.note.x,
        y: this.note.y,
        width: this.note.width,
        height: this.note.height,
        text: this.note.text,
        color: this.note.color,
      })
    },
    deleteCard() {
      this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/notes/' + this.id).remove();
    },
    onClickOutside(event) {
      if (event.target.className.includes('v-icon')) return;
      this.colorPicker = false;
    }
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  }
}
</script>

<style scoped>
.note {
  border: none;
  position: absolute;
}

.options {
  position: absolute;
  z-index: 9;
}
</style>