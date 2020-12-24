<template>
  <div class="container">
    <div class="board-demo">
      <img src="../assets/demo.png">
    </div>

    <div class="login-form">
      <h1>Welcome to dotboard</h1>
      <br>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="joinTower"
      >
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.towerName"
              placeholder="Room Code"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.name"
              placeholder="Your Name"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          type="submit"
          color="#6fb3b8"
          @click="joinTower()"
        > Join </v-btn>
      </v-form>
      <div id="new-board">
        <nuxt-link to="/create" class='link'>
          Create a new board
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'LoginForm',
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

<style lang="scss" scoped>

.container {
	display: flex;
	width: 100%;
	height: 100%;
	padding-top: 100px;

  .board-demo {
		display: flex;
		width: 60%;

    img {
			max-width: 100%;
      border-radius: 3% 0 0 3%;
		}
  }

  .login-form {
    display: flex;
    flex-direction: column;
    padding: 30px 60px;
    background-color: white;
    // border-top-right-radius: 30px;
    // border-bottom-right-radius: 30px;
    border-radius:0 3% 3% 0;
    font-family: 'Comfortaa';

    #new-board {
      margin: 20px;

      .link {
        text-decoration: none;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
.container {
	display: inline;
	width: 100%;
	height: 100%;
	padding-top: 0px;

  .board-demo {
		display: inline-block;
		width: 100%;

    img {
			max-width: 100%;
      border-radius: 3% 0 0 3%;
		}
  }

  .login-form {
    flex-direction: column;
    padding: 30px 60px;
    background-color: white;
    // border-top-right-radius: 30px;
    // border-bottom-right-radius: 30px;
    border-radius:0 3% 3% 0;

    .form-header {
      font-family: 'Comfortaa';
    }
  }
}

}
</style>
