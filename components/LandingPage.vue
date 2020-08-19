<template>
  <div>
    <div>
      <h1 id="title">Tower</h1>
      <!-- <form @submit="joinTower"> -->
      <!-- <v-form> -->
      <div id="steppercontainer">
        <v-stepper v-model="e1">
          <v-stepper-header >
            <v-stepper-step  id="stepper" color="#388087" :complete="e1 > 1" step="1"> Tower Name</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step id="stepper" :complete="e1 >2 " step="2">Password</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step  id="stepper" step="3">Who are you? </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="stepper"
                height="200px"
              > 
              <input id="roomcode"
                v-model="user.towerName"
                placeholder="Enter tower name"
              >
              </v-card>

              <v-btn
                color="#6fb3b8"
                @click="e1 = 2"
              >  
              Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              <input id="roomcode"
                type="password"
                placeholder="Enter tower password"
              >
              </v-card>
              <v-btn text  color="#6fb3b8" @click="e1 = 1">Go Back</v-btn>
              <v-btn
                color="#6fb3b8"
                @click="e1 = 3"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              <input id="roomcode"
                v-model="user.name"
                placeholder="Your name"
              >
              </v-card>
              <v-btn text color="#6fb3b8" @click="e1 = 2">Go back</v-btn>
              <v-btn
                color="#6fb3b8"
                @click="joinTower()"
              > Join Tower </v-btn>
            </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
        
        <div id="newTowerDiv">
          <nuxt-link to="/towers/newTower">
            <button target="_blank" id="createTowerButton">  CREATE A NEW TOWER </button>
          </nuxt-link>
        </div>
    </div>
      <!-- </v-form> -->
  </div>
</template>

<script>
// import db from '../firebase';
import { mapActions } from "vuex";

export default {
  data() {
    return {
      e1: 1,
      user: {
        name: '',
        towerName: '',
      },
      error: '',

    }
  },
  methods: {
    ...mapActions(["addUser"]),
    createTower() {
      if (this.user.towerName === '') { return; }
      this.$fireDb.ref('towers/' + this.user.towerName).set({
        password: 'test'
      });
      $nuxt.$router.push("/towers/newTower");
    },
    joinTower() {
      let app = this;
      this.$fireDb.ref('/towers/' + this.user.towerName).once('value').then(function(snapshot) { 
        if (snapshot.val()) {
          app.$auth.loginWith('local', { data: {
          user: app.user
          } });
        } else {
          app.error = "This room doesn't exist";
        }
      });
    }
  },
}
</script>

<style scoped>
body, html {
  height: 100%;
  background-color: #F6F6F2;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
  align-content: center;
  justify-content: center;
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
#steppercontainer {
  padding: 3% 15% 1% 15%;
}

#stepper {
  background-color: #6fb3b8;
  color: white !important;
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
