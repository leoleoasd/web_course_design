import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
    .use(naive)
    .use(router)
    .use(pinia)
    .mount('#app')
