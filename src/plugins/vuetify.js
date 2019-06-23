import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#41b3a3',
    success: '#85ccca',
    info: '#c2c5cc',
    warning: '#e8a87c',
    error: '#e27d60'
  }
})
