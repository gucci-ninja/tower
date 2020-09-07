<template>
  <vue-draggable-resizable
    :draggable="draggable"
    :x="card.x"
    :y="card.y"
    :w="card.width"
    :h="card.height"
    @dragging="onDrag"
    @resizing="onResize"
    class-name="card"
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
      <Note
        v-if="card.type == 'note'"
        :note="card"
        :id="id"
        @toggle-options="toggleOptions"
        @toggle-drag="toggleDrag"/>
      <Poll
        v-else-if="card.type == 'poll'"
        :poll="card"
        :id="id"
        @toggle-options="toggleOptions"
        @toggle-drag="toggleDrag"/>
    <ColorPicker
      @color-picked="onColorChange"
      :defaultColor="card.color"
      v-show="colorPicker"
    />
  </vue-draggable-resizable>
</template>

<script>
import ColorPicker from '../components/ColorPicker.vue';
import Note from './Note.vue'
import Poll from './Poll.vue'

export default {
  name: 'Card',
  components: {
    ColorPicker,
    Note,
    Poll
  },
  data: () => ({
    options: false,
    colorPicker: false,
    draggable: true,
  }),
  props: {
    card: {
      type: Object,
      default: () => {},
    },
    id: String
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.card.x = x
      this.card.y = y
      this.card.width = width
      this.card.height = height
      this.updateCard();
    },
    onDrag: function (x, y) {
      this.card.x = x
      this.card.y = y
      this.updateCard();
    },
    onText: function (text) {
      this.card.text = text
      this.updateCard();
    },
    onColorChange: function (color) {
      this.card.color = color;
      this.updateCard();
    },
    updateCard() {
      this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/cards/' + this.id).update({
        x: this.card.x,
        y: this.card.y,
        width: this.card.width,
        height: this.card.height,
        color: this.card.color,
      })
    },
    deleteCard() {
      this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/cards/' + this.id).remove();
    },
    onClickOutside(event) {
      if (event.target.className.includes('v-icon')) return;
      this.colorPicker = false;
    },
    toggleOptions() {
      this.options = !this.options;
    },
    toggleDrag() {
      this.draggable = !this.draggable;
    }
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  },
}
</script>

<style scoped>
.card {
  border: none;
  position: absolute;
}

.options {
  position: absolute;
  z-index: 9;
}
</style>