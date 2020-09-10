<template>
  <v-textarea 
    solo
    no-resize
    hide-details
    :background-color="note.color"
    :height="note.height"
    :value="note.text"
    @mouseover="$emit('toggle-options')"
    @mouseleave="$emit('toggle-options')"
    @focus="$emit('toggle-drag')"
    @blur="$emit('toggle-drag')"
    @input="onText"
  ></v-textarea>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      default: () => {}
    },
    id: String,
  },
  methods: {
    onText: function (text) {
      this.note.text = text
      this.updateNote();
    },
    updateNote() {
      this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/cards/' + this.id).update({
        text: this.note.text
      })
    },
  }
}
</script> 