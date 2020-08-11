
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
    '@nuxtjs/auth',
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    }
  },
};
