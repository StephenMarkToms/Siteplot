import router from '../../router'

const state = {}
const getters = {}
const actions = {
    searchRepositories({}, { name, amount, page }) {
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

    async createRepository({}, values) {
        let query = JSON.stringify(values)
            .replace(/[{}]/g, '')
            .replace(/"([^"]+)":/g, '$1:')
        return await axios
            .post('/graphql', {
                query: `
                    mutation {
                        createRepository(${query}) {
                            id
                        }
                    }
                    `,
            })
            .then((res) => {
                console.log(res)
                return res.data.data.createRepository.id
            })
    },

    async getRepositoryById({}, id) {
        return await new Promise(function (resolve, reject) {
            axios
                .post('/graphql', {
                    query: `
                    {
                        repository(id: ${id}){
                            name
                            path
                            personal_access_token
                            id
                            created_at
                            updated_at
                        }
                    }
                    `,
                })
                .then((res) => {
                    if (res.data.data.repository) {
                        resolve(res.data.data.repository)
                    } else {
                        reject()
                        router.push({
                            name: 'known-error',
                            params: {
                                error: "The repository you're looking for cannot be found.",
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
