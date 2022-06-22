import Vuex from 'vuex'
import modal from './modules/modal'
import sites from './modules/sites'
import blocks from './modules/blocks'
import repositories from './modules/repositories'

export default new Vuex.Store({
    modules: {
        modal,
        sites,
        blocks,
        repositories,
    },
})
