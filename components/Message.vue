<template>
  <p>{{ message.content }}</p>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  }
}
</script>