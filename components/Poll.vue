<template>
  <v-card
    active-class="poll"
    color="rgba(255,255,255,0)"
    :height="poll.height"
    :width="poll.width"
  >
    <v-text-field
      solo
      :value="poll.title"
      class="title"
      :background-color="poll.color"
      @input="onTitle"
      @focus="$emit('toggle-drag')"
      @blur="$emit('toggle-drag')"
      @mouseover="$emit('toggle-options')"
      @mouseleave="$emit('toggle-options')"
      ></v-text-field>
    <v-card-actions>
      <v-row class="option">
        <v-btn
          class="poll-btn"
          width="100%"
          v-for="(option, i) in poll.options"
          :key="(option, i)"
          :label="option"
          :color="poll.color"
          @click="vote(i)"
        >{{ option.text }} : {{ option.votes }}</v-btn>
        <v-text-field
          v-model="option"
          hide-details solo
          :background-color="poll.color"
          append-icon="mdi-plus"
          @click:append="addOption"
        ></v-text-field>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

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
    },
    vote(option) {
      // let app = this;
      var optionRef = this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/cards/' + this.id + '/options/' + option);
      optionRef.update({
        votes: (this.poll.options[option].votes + 1)
      });
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

.poll-btn {
  margin-bottom: 10px;
}
</style>