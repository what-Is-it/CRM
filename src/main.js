import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from './utils/massage.plugin'
import Loader from './components/app/Loader'
import tooltip from './directives/tooltip.directive'
import Paginate from 'vuejs-paginate-next'

createApp(App)
  .component('Loader', Loader)
  .use(store)
  .use(router)
  .use(messagePlugin)
  .directive('tooltip', tooltip) //v-tooltip
  .use(Paginate)
  .mount('#app')
