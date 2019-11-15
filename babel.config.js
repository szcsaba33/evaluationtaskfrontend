module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  proxy: {
    prefix: '/',
    url: 'https://backendquiz.herokuapp.com'
  }
}
