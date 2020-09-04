<template>
  <v-card color="#F5F5F5" height="97vh" class="board">
    <Card
      v-for="(card, i) in boardState"
      :key="(card, i)"
      :card='card'
      :id='i'
    >
    </Card>
  </v-card>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'Board',
  components: {
    Card,
  },
  props: {
    boardState: Object
  },
}
</script>

<style scoped>
.board {
  background: #F2F2F2;
  background-image: radial-gradient(black 1px, transparent 0);
  background-size: 1.5em 1.5em;
  background-position: -19px -19px;
}
</style>