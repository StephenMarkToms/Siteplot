const state = {}
const getters = {}
const actions = {
    async createBlockType({}, values) {
        let query = JSON.stringify(values)
            .replace(/[{}]/g, '')
            .replace(/"([^"]+)":/g, '$1:')
        return await axios
            .post('/graphql', {
                query: `
                    mutation {
                        createBlockType(${query}) {
                            id
                        }
                    }
                    `,
            })
            .then((res) => {
                console.log(res)
                return res.data.data.createBlockType.id
            })
    },
}
const mutations = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
