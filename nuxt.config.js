
module.exports = {
  server: {
    port: process.env.PORT || 8000, // default: 3000
  //   host: '0.0.0.0', // default: localhost,
  //   timing: false
  },
  plugins: [
    { src: '~/plugins/socket.client.js' },
  ],
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
  ],
};
