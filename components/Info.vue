<template>
  <div class="info">
    <span class="info__title">board</span>

    <v-container>
       <span class="user-list__title"><i class="fas fa-user"></i> Online</span>
       <div
        v-for="(user) in users"
        :key="user.name"
        >{{ user.name }}
        </div>
    </v-container>

    <!-- <div class="chat__header">
      <span class="title"><i class="fas fa-comment-alt"></i> Chat</span>
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
    </div> -->
  </div>
</template>

<script>
// import { mapActions, mapState } from "vuex";
// import Message from "@/components/Message";

// export default {
//   name: "Chat",
//   components: {
//     Message,
//   },
//   data: () => ({
//     content: "",
//   }),
//   computed: {
//     ...mapState(["messages", "user"]),
//   },
//   methods: {
//     ...mapActions(["sendMessage"]),
//     send() {
//       this.sendMessage(this.content);
//       this.content = "";
//     },
//     scrollToEnd() {
//       var msgs = this.$el.querySelector('#msgs');
//       msgs.scrollTop = msgs.scrollHeight;
//     }
//   },
//   updated() {
//     this.$nextTick(() => this.scrollToEnd());
//   }
// }
</script>

<style lang="scss" scoped>

$headerClr:#8C8D96;

.info {
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  2px 2px 6.7px 5.3px rgba(0, 0, 0, 0.048),
  2px 2px 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12)
  ;
  border-radius: 1em;
  height: 22em;
  width: 20em;
  background: #F5F5F5;

  &__title {
    position: fixed;
    padding: 0.5em;
    font-size: 36px;
    font-weight: 600;
    font-family: 'Comfortaa';
  }

}

.user-list {

  &__title {
    position: fixed;
    margin-top: 3.5em;
    padding: 0.5em;
    font-family: 'Comfortaa';  
  }

}


.chat-messages {
  background: #F5F5F5;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
}

#msgs {
  height: 20em;
  overflow: auto;
}

.type-msg {
  background: #fff;
  margin: 0.5em;
  padding: 0px;
  font-family: 'Comfortaa';
  font-weight: 400;
}

/* The emerging W3C standard
   that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

*::-webkit-scrollbar {width: 7px; height: 0;}
*::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.0);
    border-radius: 10px;
    box-shadow: rgba(255,255,255,0.3) 0 0 0 1px;
}
*::-webkit-scrollbar-thumb {background: rgba(0,0,0,0.55)}

</style>