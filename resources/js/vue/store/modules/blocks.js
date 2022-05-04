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
    searchBlocks({}, { name, amount, page }) {
        return axios
            .post('graphql', {
                query: `
                    {
                        search_block_types(first: ${amount}, page: ${
                    page ? page : '1'
                }, where: { column: NAME, operator: LIKE, value: "%${name}%" }) {
                            data{
                                name
                                id
                                created_at
                                updated_at
                            }
                            paginatorInfo {
                                currentPage
                                lastPage
                                total
                            }
                        }
                    }
                    `,
            })
            .then((result) => {
                return result.data.data.search_block_types.data
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
