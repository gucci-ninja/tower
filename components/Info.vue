<template>
  <div id="info">
    <v-card height="42vh" color="#F6F6F2">
        <v-card-title class="title">
          dotboard
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="my-4 subtitle">
            <i class="fas fa-user"></i>
            Online
          </div>
        </v-card-text>
        <v-list-item
          v-for="user in users"
          :key="user.name"
        >
          <v-list-item-avatar :color="randColor()" size="12" class="icon-space">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import Message from "@/components/Message";

export default {
  name: "Info",
  data() {
    return {
      colors: ["#FF9AA2", "#C7CEEA", "#B5EAD7", "#D1E7F8", "#D8B7D6", "#9FB5E3"]
    }
  },
  computed: {
    ...mapState(["users"])
  },
  methods: {
    randColor() {
      return this.colors[Math.floor(Math.random()*this.colors.length)];
    }
  }
}
</script>

<style lang="scss" scoped>

#info {
  font-family: 'Comfortaa';
}

.title {
  font-size: 36px;
  font-weight: 600;
}


.icon-space {
  margin-right: 0.5em;
}

.subtitle {
  font-size: 18px;
  font-weight: 400;
}
</style>