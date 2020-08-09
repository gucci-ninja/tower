
module.exports = {
  server: {
    port: process.env.PORT || 8000, // default: 3000
  },
  plugins: [
    { src: '~/plugins/socket.client.js' },
  ],
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
  ],
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
};
