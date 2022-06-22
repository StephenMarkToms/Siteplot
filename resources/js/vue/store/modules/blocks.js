import router from '../../router'

const state = {}
const getters = {}
const actions = {
    async createBlockType({}, values) {
        let query = JSON.stringify(values)
            .replace(/[{}]/g, '')
            .replace(/"([^"]+)":/g, '$1:')

        // mutation {
        //     createBlockType(${query}) {
        //         id
        //     }
        // }
        return await axios
            .post('/graphql', {
                query: `
                    
                    createBlockType(input: { name: "TestBlock", file_name: "testBlock.vue", repositories: { sync: [1] } }) {
                        id
                        repositories {
                            name
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
                                repositories{
                                    name
                                }
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
    async getBlockTypeById({}, id) {
        return await new Promise(function (resolve, reject) {
            axios
                .post('/graphql', {
                    query: `
                    {
                        block_type(id: ${id}){
                            name
                            file_name
                            component
                            repositories
                            id
                            created_at
                            updated_at
                        }
                    }
                    `,
                })
                .then((res) => {
                    if (res.data.data.block_type) {
                        resolve(res.data.data.block_type)
                    } else {
                        reject()
                        router.push({
                            name: 'known-error',
                            params: {
                                error: "The block you're looking for cannot be found.",
                            },
                        })
                    }
                })
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
