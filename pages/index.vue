<template>
  <div id="main">
    <div class="right">
      <Chat></Chat>
      <!-- {{ user.sockets }} -->
      <!-- {{ $auth.user.sockets }} -->
    </div>
    
  </div>
  
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Chat from '../components/Chat.vue';
import db from '../firebase';

export default {
 name: 'App',
  components: {
    Chat,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["enterTower", "addUser"]),
    ...mapMutations(["setUser"]),
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login');
    } else { 
      
      this.addUser(this.$auth.user);
      }

    
    // console.log(this.$auth.user);
    // this.setUser(this.$auth.user);
    // this.enterTower();
    // db.ref('towers/' + this.user.towerName + '/users/' + this.user.id).set({
    //   name: this.user.name
    // });
    // console.log(this.user.name)
    // if(!this.user.name) {
    //   this.$nuxt.$router.push('/');
    // } else { this.enterTower(this.user); }
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