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
import dayjs from 'dayjs'
import axios from 'axios'
import router from './vue/router'
import store from './vue/store'
import App from './vue/App.vue'
import Alert from './vue/components/feedback/Alert.vue'
import WButtonsBase from './vue/components/buttons/Base.vue'
import WIconsBase from './vue/components/icons/Base.vue'
import WFeedbackModal from './vue/components/feedback/Modal.vue'
import Popover from './vue/components/feedback/Popover.vue'
import PrimaryNav from './vue/components/navigation/PrimaryNav.vue'
import Wind from './vue/plugins/wind-components'
import { Field, Form, ErrorMessage } from 'vee-validate'

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$axios = axios
app.component('WButtonsBase', WButtonsBase)
app.component('WIconsBase', WIconsBase)
app.component('WFeedbackModal', WFeedbackModal)
app.component('PrimaryNav', PrimaryNav)
app.component('Popover', Popover)
app.component('Alert', Alert)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(router)
app.use(store)
app.use(Wind)
// app.config.globalProperties.$wind = Wind
// app.config.globalProperties.$wind = 'Wind'
app.mount('#v-app')

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./react/components/Example')
