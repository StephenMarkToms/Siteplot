import router from '../../router'

const state = {}
const getters = {}
const actions = {
    searchWebsites({}, { name, amount }) {
        return axios
            .post('/graphql', {
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
    async createWebsite({}, values) {
        let query = JSON.stringify(values)
            .replace(/[{}]/g, '')
            .replace(/"([^"]+)":/g, '$1:')
        return await axios
            .post('/graphql', {
                query: `
                    mutation {
                        createWebsite(${query}) {
                            id
                        }
                    }
                    `,
            })
            .then((res) => {
                console.log(res)
                return res.data.data.createWebsite.id
            })
    },
    async getWebsiteById({}, id) {
        return await new Promise(function (resolve, reject) {
            axios
                .post('/graphql', {
                    query: `
                    {
                        website(id: ${id}){
                            name
                            domain
                            netlify_build_hook
                            id
                            created_at
                            updated_at
                        }
                    }
                    `,
                })
                .then((res) => {
                    if (res.data.data.website) {
                        resolve(res.data.data.website)
                    } else {
                        reject()
                        router.push({
                            name: 'known-error',
                            params: {
                                error: "The website you're looking for cannot be found.",
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
