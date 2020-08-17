class Message {
  constructor(content, user) {
    this.content = content;
    this.user = user
  }
}

module.exports = () => {
  return Message
}