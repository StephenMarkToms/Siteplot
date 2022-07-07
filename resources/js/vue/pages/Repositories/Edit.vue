<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div v-if="repository" class="space-y-2 max-w-3xl mx-auto">
                <div>
                    <router-link
                        :to="{ name: 'repositories' }"
                        class="text-primary-200 font-semibold flex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        Back to repository library
                    </router-link>
                    <div class="mt-3 w-full bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="text-2xl font-medium secondary-600">
                                Editing:
                                <span class="text-gray-500 italic">{{
                                    repository.name
                                }}</span>
                            </div>
                            <a
                                :href="`https://github.com/${repository.path}`"
                                target="_blank"
                            >
                                <div
                                    class="block text-sm font-medium flex space-x-2 text-primary-200 cursor-pointer"
                                >
                                    <div class="my-auto">View on GitHub</div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="ml-2 h-4 w-4 my-auto"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </div>
                            </a>
                        </div>
                        <div>
                            <RepositoryForm
                                :repository="repository"
                                @onSubmit="submit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import RepositoryForm from '../../components/siteplot/forms/Repository.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        RepositoryForm,
    },
    data() {
        return {
            originalRepository: null,
            repository: null,
        }
    },
    async created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
        await this.$store
            .dispatch('repositories/getRepositoryById', this.$route.params.id)
            .then((repository) => {
                this.repository = repository
                this.originalRepository = { ...repository }
            })
    },
    methods: {
        async submit(values) {
            await this.$axios
                .post('/graphql', {
                    query: `mutation {
                        updateRepository(id: ${this.$route.params.id}, path: "${values.path}", name: "${values.name}", personal_access_token: "${values.personal_access_token}") {
                            id
                        }
                    }`,
                })
                .then((res) => {
                    this.$router.push({
                        name: 'repositories',
                    })
                })
        },
    },
}
</script>
