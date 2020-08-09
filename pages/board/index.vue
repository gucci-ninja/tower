<template>
  <div id="main">
    <div class="right">
      <Chat></Chat>
    </div>
    
  </div>
  
</template>

<script>
import { mapState, mapActions } from "vuex";
import Chat from '../../components/Chat.vue';
import db from '../../firebase';

export default {
 name: 'App',
  components: {
    Chat,
  },
  methods: {
    ...mapActions(["enterTower"]),
  },
  computed: {
    ...mapState(["user", "users"]),
  },
  created() {
    // db.ref('towers/' + this.user.towerName + '/users/' + this.user.id).set({
    //   name: this.user.name
    // });
    if(!this.user.name) {
      this.$nuxt.$router.push('/');
    } else { this.enterTower(this.user); }
  },
  validate({ params }) {
    // Must be a tower name
    return /^[a-zA-Z]+$/.test(params.id)
  }
}
</script>

<style scoped>

#main {
  display: inline-block;
}
.right {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>