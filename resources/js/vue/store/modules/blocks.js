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
                return result.data.data.websites.data
            })
    },
    deleteWebsite({}, { id }) {
        return axios
            .post('graphql', {
                query: `
                    mutation {
                        deleteWebsite(id: ${id}) {
                            name
                        }
                    }
                    `,
            })
            .then((result) => {
                return result.data
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
