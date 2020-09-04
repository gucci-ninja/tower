<template>
  <v-overlay
    :opacity="0"
  >
    <v-btn
      v-for="color in colors"
      :key="color"
      :color="color"
      @click="colorPicked(color)"
      icon>
      <v-icon>mdi-circle</v-icon>
    </v-btn>
  </v-overlay>

</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    defaultColor: {
      type: String,
      default: '#fff',
    }
  },
  data: () => ({
    selected: '',
    colors: ["#FFFFFF", "#FF9AA2", "#C7CEEA", "#B5EAD7", "#D1E7F8", "#D8B7D6", "#9FB5E3"]
  }),
  methods: {
    colorPicked(color) {
      this.selected = color;
      this.$emit('color-picked', this.selected);
    },
  },
  mounted() {
    this.selected = this.defaultColor;
  },
}
</script>