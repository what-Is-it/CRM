import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from './utils/massage.plugin'
import Loader from './components/app/Loader'

createApp(App)
  .component('Loader', Loader)
  .use(store)
  .use(router)
  .use(messagePlugin)
  .mount('#app')
