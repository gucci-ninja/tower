<template>
  <div id="main">
    <div v-if="$auth.loggedIn">
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
body, html {
  height: 100%;
  background-color: #F6F6F2;
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
#steppercontainer {
  padding: 3% 15% 5% 15%;
}

#stepper {
  background-color: #6fb3b8;
  color: white !important;
}
#title {
    margin-top: 5%;
    margin-bottom: 5%;
    color: #388087;
    text-align: center;
    justify-content: center;
    font-weight: 600;
    font-size: 4.5em;
} 
#roomcode {
    height: 50px;
    border: 1px solid #388087; 
    border-radius: 15px;
    outline: 0;
    font-size: 14pt;
    font-family: Quicksand;
    padding-left: 3%;
    margin-top: 3%;
    margin-right: 3%;
    width: 50%;
    color:#388087;
    font-weight: 600;
}
#enterRoom {
    border: 1px solid silver; 
    background-color: #6fb3b8;
    border-radius: 15px;
    outline: 0;
    padding: 1% 2% 1%;
    height: 50px;
    width: 40%;
    font-size: 14pt;
    font-family: Quicksand;
    transition: 0.25s;
    color: white;
    font-weight:700;
    margin-top: 6%;
}
#enterRoom:hover {
    font-size: 16pt;
    background-color: #F6F6F2;
    cursor: pointer;
    color: #388087;
    letter-spacing: 1px;
    border: 2px solid #388087; 
}
#newTowerDiv {
    margin-top: 5%;
}
#newPrompt{
    margin-top: 0;
    font-family: Quicksand;
    font-weight: 500;
    font-size: 14pt;
    margin-bottom:5%;
}
#createTowerButton {
   color: #388087;
   background-color: #F6F6F2;
   border: 1px solid #388087; 
   border-radius: 15px;
   height: 50px;
   outline: 0;
   font-size: 12pt;
   font-weight: 700;
   font-family: Quicksand;
   margin-top: 0;
   width: 45%;
   text-decoration: none;
   transition: 0.25s;

}
#createTowerButton:hover {
    font-size: 13pt;
    background-color: #6fb3b8;
    cursor: pointer;
    letter-spacing: 1px;
    color: #F6F6F2;
    border: 2px solid #388087; 

}
@media only screen and (min-width: 768px) {
  #title {
    font-size: 8.5em;
  }
  #roomcode {
    padding-left: 1.5%;
    height: 75px;
    font-size: 18pt;
  }
  #enterRoom {
    margin-top: 5%;
    height: 70px;
    font-size: 18pt;
    width: 30%;
  }
  #newTowerDiv{
      margin-top:3%;
  }
  #newPrompt{
    margin-top: 0;
    margin-bottom: 3%;
  }
  #createTowerButton {
    width: 25%;
    height: 60px;
    margin-top:0%;
  }
}
@media only screen and (min-width: 1440px) {
  #title {
    font-size: 8.5em;
  }
  #roomcode {
    padding-left: 1.5%;
    height: 80px;
    width: 45%;
  }
  #enterRoom {
    margin-top: 0;
    height: 70px;
    font-size: 16pt;
    width: 15%;
  }
  #createRoomButton {
    width: 20%;
    font-size: 16pt;
  }
  #newPrompt{
    margin-top: 0;
    margin-bottom: 1.5%;
  }
}
</style>