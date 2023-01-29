import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import store from './store/index.js'
import router from './router.js'
import quasarUserOptions from './quasar-user-options'


const app = createApp(App)
app.use(router)
app.use(store)
app.use(Quasar, quasarUserOptions)
    app.mount('#app')
