import Vuex from 'vuex'
import modal from './modules/modal'
import sites from './modules/sites'

export default new Vuex.Store({
    modules: {
        modal,
        sites,
    },
})
