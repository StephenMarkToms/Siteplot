const state = {
    canClose: true,
    show: false,
}
const getters = {}
const actions = {
    toggleModal({ commit, state }) {
        commit('setShow', !state.show)
    },
}
const mutations = {
    setShow(state, payload) {
        state.show = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
