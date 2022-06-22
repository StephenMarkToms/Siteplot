import router from '../../router'

const state = {}
const getters = {}
const actions = {
    searchRepositories({}, { name, amount }) {
        return axios
            .post('/graphql', {
                query: `
                    {
                        repositories(first: ${amount}, where: { column: NAME, operator: LIKE, value: "%${name}%" }) {
                            data{
                                name
                                id
                            }
                            paginatorInfo {
                                currentPage
                                lastPage
                            }
                        }
                    }
                    `,
            })
            .then((result) => {
                return result.data.data.repositories.data
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
