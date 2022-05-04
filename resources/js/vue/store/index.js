import Vuex from 'vuex'
import modal from './modules/modal'
import sites from './modules/sites'
import blocks from './modules/blocks'

export default new Vuex.Store({
    modules: {
        modal,
        sites,
        blocks,
    },
})
