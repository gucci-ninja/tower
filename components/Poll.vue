<template>
  <v-card
    active-class="poll"
    :color="poll.color"
    :height="poll.height"
    :width="poll.width"
    @mouseover="$emit('toggle-options')"
    @mouseleave="$emit('toggle-options')"
    @focus="$emit('toggle-drag')"
    @blur="$emit('toggle-drag')"
  >
    <v-text-field
      solo
      :value="poll.title"
      class="title"
      background-color="rgba(255,255,255,0)"
      @input="onTitle"
      ></v-text-field>
    <v-card-actions>
      <v-row class="option">
        <v-btn
          width="100%"
          v-for="(option, i) in poll.options"
          :key="(option, i)"
          :label="option"
          color="rgba(255,255,255,0.2)"
        ></v-btn>
        <v-text-field
          v-model="option"
          hide-details solo
          background-color="rgba(255,255,255,0.2)"
          append-icon="mdi-plus"
          @click:append="addOption"
        ></v-text-field>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
/*
Architecture for poll:
type: 'poll'
x: Number
y: Number
width: Number
height: Number
title: String
color: String
options: { id: { text: String, votes: Number } }

when you add a poll, create a title
store how many votes per option
onVote -> ref(options.id) += 1
user.polls.add(poll.id)
completedPolls
finish = disableVote

*/
export default {
  name: 'Poll',
  data: () => ({
    option: ''
  }),
  props: {
    poll: {
      type: Object,
      default: () => {}
    },
    id: String
  },
  methods: {
    onTitle(title) {
      this.poll.title = title;
      this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/cards/' + this.id).update({
        title: this.poll.title
      })      
    },
    addOption() {
      var newOptionRef = this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/cards/' + this.id + '/options/').push();
      newOptionRef.set({
        text: this.option,
        votes: 0,
      })
      this.option = '';
    }
  }
  
}
</script>

<style lang="scss" scoped>
.option {
  padding: 0 2em;
}

.title {
  font-size: 16px;
  color: black;
  padding: 0.5em;
}

</style>