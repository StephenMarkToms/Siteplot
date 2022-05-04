const state = {}
const getters = {}
const actions = {
    searchWebsites({}, { name, amount }) {
        return axios
            .post('graphql', {
                query: `
                    {
                        websites(first: ${amount}, where: { column: NAME, operator: LIKE, value: "%${name}%" }) {
                            data{
                                domain
                                name
                                id
                                created_at
                                updated_at
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
                console.log(result.data.data.websites.data)
                return result.data.data.websites.data
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
