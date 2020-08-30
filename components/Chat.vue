<template>
    <v-card class="chat">
          <div class="chat__header">
      <span class="title"><v-icon>mdi-message</v-icon> Chat</span>
    </div>
      <div class="chat-messages">
        <div id="msgs">
          <Message
            v-for="(msg, i) in messages"
            :key="`message-${i}`"
            :message="msg"
            :me="msg.user === user.name"
          />
        </div>
        <v-form
          ref="form"
          @submit.prevent="send"
        >
          <v-text-field
            outlined
            v-model="content"
            autocomplete="off"
            @click:append="send"
            append-icon="fas fa-paper-plane"
            placeholder="Send a message"
            class="type-msg"
            hide-details
            height="15"
          />
        </v-form>
      </div>
    </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Message from "@/components/Message";

export default {
  name: "Chat",
  components: {
    Message,
  },
  data: () => ({
    content: "",
  }),
  computed: {
    ...mapState(["messages", "user"]),
  },
  methods: {
    ...mapActions(["sendMessage"]),
    send() {
      this.sendMessage(this.content);
      this.content = "";
    },
    scrollToEnd() {
      var msgs = this.$el.querySelector('#msgs');
      msgs.scrollTop = msgs.scrollHeight;
    }
  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  }
}
</script>

<style lang="scss" scoped>

$headerClr:#8C8D96;

.chat {
  height: 29em;
  background: #F5F5F5;

  &__header {
    background: $headerClr;
    padding: 0.75em;
    color: #fff;
  }
}

.title {
  font-size: 20px;
  font-weight: 300;
  font-family: 'Comfortaa';
  i {
    color: #E5E4EA;
  }
}

.chat-messages {
  background: #F5F5F5;
}

#msgs {
  height: 21.5em;
  overflow: auto;
}

.type-msg {
  background: #fff;
  margin: 0.5em;
  font-family: 'Comfortaa';
  font-weight: 400;
}

*::-webkit-scrollbar {width: 7px; height: 0;}
*::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.0);
    border-radius: 10px;
    box-shadow: rgba(255,255,255,0.3) 0 0 0 1px;
}
*::-webkit-scrollbar-thumb {background: rgba(0,0,0,0.55)}

</style>