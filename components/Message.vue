<template>
  <div>
    <div v-if="me" class="msg-wrapper">
      <div class="inline-container me">
        <div class="msg-bubble bubble-me">
          {{ message.content }}
        </div>
      </div>
    </div>
    <div v-else class="msg-wrapper">
      <span class="user-name">{{ message.user }}</span>
      <div class="inline-container">
        <div class="msg-bubble bubble-you">
          {{ message.content }}
        </div>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {},
    },
    me: {
      type: Boolean,
      default: () => false,
    },
  }
}
</script>

<style lang='scss' scoped>

$meClr: #408FEC;
$youClr: #EDF0F5;
.msg-wrapper {
	/* padding: 10px 10px; */
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	align-self: flex-end;
}

.inline-container {
  display: inline-flex;
}

.user-name {
  font-size: 14px;
  color: grey;
}

.msg-bubble {
  min-width: 45px;
	max-width: 700px;
	padding: 10px 15px;
  margin: 6px 8px;

}

.bubble-me {
  border-radius: 16px 16px 0 16px;
  background: $meClr;
  color: #fff;
}

.bubble-you {
  border-radius: 16px 16px 16px 0;
  background: $youClr;
  color: #000;
}

.me {
  align-self: flex-end;
}

.inline-container {
  display: inline-flex;
}

</style>