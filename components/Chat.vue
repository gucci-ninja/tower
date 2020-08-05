<template>
  <div id="chat">
    <div class="header">
      <span class="title">Chat</span>
    </div>
    <div class="chat-messages">
      <Message
        v-for="(msg, i) in messages"
        :key="`message-${i}`"
        :message="msg"
      />
    </div>
    <v-form
      ref="form"
      @submit.prevent="send"
    >
      <v-text-field
        v-model="content"
        autocomplete="off"
        @click:append="send"
      />
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Message from "../components/Message";

export default {
  name: "Chat",
  components: {
    Message,
  },
  data: () => ({
    content: "",
  }),
  computed: {
    ...mapState(["messages"]),
  },
  methods: {
    ...mapActions(["sendMessage"]),
    send() {
      this.sendMessage(this.content);
      this.content = "";
    }
  }
}
</script>

<style scoped>

#chat {
  width: 350px;
  margin: auto;
}

.header {
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  padding: 15px;
  border: 2px solid #f7f9fb;
}

.title {
  font-size: 20px;
  font-weight: 500;
}

.chat-messages {
  min-height: 300px;
  background-color: #f7f9fb;
  padding: 15px;
}
</style>