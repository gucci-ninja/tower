
module.exports = {
  server: {
    port: process.env.PORT || 8000, // default: 3000
  },
  plugins: [
    { src: '~/plugins/socket.client.js' },
  ],
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
};
