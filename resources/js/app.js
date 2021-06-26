/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap')

/**
 * We will also mount in our Vue component if needed
 */

import { createApp } from 'vue'
import axios from 'axios'
import router from './vue/router'
import App from './vue/App.vue'
import Alert from './vue/components/feedback/Alert.vue'
import Popover from './vue/components/feedback/Popover.vue'
import PrimaryNav from './vue/components/navigation/PrimaryNav.vue'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.component('PrimaryNav', PrimaryNav)
app.component('Popover', Popover)
app.component('Alert', Alert)
app.use(router)
app.mount('#v-app')

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./react/components/Example')
