import { createApp } from 'vue'
import App from './app.vue'
import router from './routes/index'
import 'virtual:uno.css'
import '@qd/design/css'

createApp(App)
  .use(router)
  .mount('#app')
