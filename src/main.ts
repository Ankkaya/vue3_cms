import { createApp } from 'vue'

import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import { setupStore } from './store'

import router from './router'
import store from './store'

const app = createApp(App)

setupStore()
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')
