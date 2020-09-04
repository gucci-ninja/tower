<template>
  <div v-show="$auth.loggedIn">
    <Toolbar/>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex d-flex md9 sm12>
          <Board :boardState="boardState" />
        </v-flex>
        <v-flex d-flex md3 sm12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <Info/>
            </v-flex>
            <v-flex d-flex xs12>
              <Chat/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Chat from '../components/Chat.vue';
import Board from '../components/Board.vue';
import LandingPage from '../components/LandingPage.vue';
import Info from '../components/Info.vue';
import Toolbar from '../components/Toolbar.vue';

export default {
 name: 'App',
  components: {
    Chat,
    LandingPage,
    Info,
    Toolbar,
    Board,
  },
  data() {
    return {
      boardState: {},
    }
  },
  async asyncData({ app }){
    if (app.$auth.loggedIn) {
      const ref = await app.$fireDb.ref('towers/' + app.$auth.user.towerName + '/notes')
      const value = await ref.once('value');
      console.log(value.val())
      return { boardState: value.val() }
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["enterTower", "addUser"]),
    ...mapMutations(["setUser"]),
    updateBoardState() {
      let app = this;
      var notesRef = this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/notes');
      notesRef.on('child_changed', snapshot => {
        app.boardState[snapshot.key] = snapshot.val();
      });
    },
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login');
    } else { 
      this.addUser(this.$auth.user);
      this.updateBoardState();
    }
  },
  validate({ params }) {
    // Must be a tower name
    return /^[a-zA-Z]+$/.test(params.id)
  }
}
</script>

<style >
#main {

    height: 100%;

  /* display: inline-block; */
}
body, html {
  /* height: 100%; */
  
  font-family: 'Quicksand', sans-serif;
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

.chat-div {
  position: fixed;
  bottom: 1em;
  right: 1em;
}

.info {
  position: fixed;
  top: 1em;
  right: 1em;
}
</style>