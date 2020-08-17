<template>
    <div id="app">
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
        <nuxt-link to="/">
          <button id="goBack"> < Go back </button>
        </nuxt-link>
        <div id="container"> 
          <h1 id="title">Create a Tower</h1>
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
              <h4 id="prompt"> What would you like to call your new Tower? </h4>

              <input id="roomcode"
              v-model="user.towerName"
              placeholder="New tower name">
              
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
                <h4> This is what others will see you as </h4>
                <input id="roomcode"
                  placeholder="Your name"
                >
                </v-card>
                <v-btn text color="#6fb3b8" @click="e1 = 2">Go back</v-btn>
                <v-btn
                  color="#6fb3b8"
                  @click="createTower()"
                > Join Tower </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
            
        
        </div>
    </div>
</template>

<script>
import db from '../firebase';
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
      db.ref('towers/' + this.user.towerName).set({
        password: 'test'
      });
      $nuxt.$router.push("/towers/newTower");
    },
    joinTower() {
      let app = this;
      db.ref('/towers/' + this.user.towerName).once('value').then(function(snapshot) { 
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
#app {
    text-align:left;
}
#container {
  text-align: center;
}
body, html {
  height: 100%;
  background-color: #F6F6F2;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
}
#title {
    font-size: 5.5rem;
    margin-top: 5%;
    color: #388087;
    font-family: Avenir, sans-serif;
}
#steppercontainer {
  padding: 3% 15% 1% 15%;
}

#prompt {
  color: #388087 !important;
  font-weight: 500;
}

#stepper {
  background-color: #6fb3b8;
  color: white !important;
}
#name {
  height: 50px;
  border: 1px solid #388087; 
  border-radius: 15px;
  outline: 0;
  font-size: 1.6rem;
  font-family: 'Quicksand';
  padding-left: 3%;
  margin-right: 3%;
  width: 40%;
  color:#388087;
  font-weight: 500;
}
#goBack {
  border: 1px solid #388087; 
  background-color: #F6F6F2;
  margin-top: 3%;
  margin-left: 3%;
  align-content: flex-start;
  border-radius: 15px;
  outline: 0;
  height: 50px;
  width: 12%;
  font-family: 'Quicksand';
  font-size: 14pt;
  font-weight: 500;
  transition: 0.35s;
  color: #388087;
}
#enterRoom {
  border: 1px solid silver; 
  background-color: #6fb3b8;
  border-radius: 15px;
  outline: 0;
  height: 50px;
  width: 18%;
  font-size: 14pt;
  font-family: 'Quicksand';
  transition: 0.25s;
  color: white;
  font-weight:700;
}
#enterRoom:hover {
  font-size: 16pt;
  background-color: #F6F6F2;
  cursor: pointer;
  color: #388087;
  letter-spacing: 1px;
  border: 2px solid #388087; 
}

#goBack:hover{
  padding-right: 1%;
  cursor: pointer;
}

@media only screen and (min-width: 1440px) {
  #title {
    margin-top: 5%;
  }
  #name {
    padding-left: 1%;
    width: 25%;
  }
  #message{
      margin-top: 2%;
  }
  #enterRoom {
      width: 8%;
  }
  #goBack {
      width: 7%;
  }
}
</style>