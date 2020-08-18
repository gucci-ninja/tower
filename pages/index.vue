<template>
  <div id="main">
    <div v-if="$auth.loggedIn">
      <div class="board">
        <Card 
          v-for="(item, i) in items" :key="(item, i)" :x=100 :y=120 :z='i' :width=150 :height=60 :text='item' />
      </div>
      <div class="bottom-right">
        <Chat></Chat>
      </div>
    </div>
    <div v-else>
      <LandingPage/>
    </div>
    
  </div>
  
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Chat from '../components/Chat.vue';
import Card from '../components/Card.vue';
import db from '../firebase';

export default {
 name: 'App',
  components: {
    Chat,
    Card,
  },
  data() {
    return {
      items: ["Do laundry", "Bullet journal"]
    }
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

<style >

#main {
  display: inline-block;
}
body, html {
  height: 100%;
  background-color: #F6F6F2 !important;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
  align-content: center;
  justify-content: center;
}
.bottom-right {
  position: absolute;
  right: 0;
  bottom: 0;
}

.top-right {
  position: absolute;
  right: 0;
  top: 0;
}

.board {
  height: 500px;
  width: 500px;
  position: relative;
  background-color: rgb(245, 237, 245);
}
</style>