<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div v-if="website" class="space-y-2 max-w-3xl mx-auto">
                <div>
                    <router-link
                        to="/sites"
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
                        Back to sites
                    </router-link>
                    <Form @submit="onSubmit">
                        <div class="mt-3 w-full bg-white shadow rounded-lg">
                            <div class="flex justify-between pb-2 mb-2 p-5">
                                <div class="text-2xl font-medium secondary-600">
                                    Editing:
                                    <span class="text-gray-500 italic">{{
                                        website.name
                                    }}</span>
                                </div>
                            </div>
                            <div class="bg-gray-200 p-3 px-5 flex">
                                <div class="w-1/2">Name:</div>
                                <div class="w-1/2">
                                    <Field
                                        v-model="website.name"
                                        name="name"
                                        :rules="isRequired"
                                        class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    <ErrorMessage
                                        name="domain"
                                        class="text-red-600 text-sm"
                                    />
                                </div>
                            </div>
                            <div class="p-3 px-5 flex">
                                <div class="w-1/2">Domain:</div>
                                <div class="w-1/2">
                                    <Field
                                        v-model="website.domain"
                                        name="domain"
                                        :rules="isRequired"
                                        class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    <ErrorMessage
                                        name="domain"
                                        class="text-red-600 text-sm"
                                    />
                                </div>
                            </div>
                            <div class="bg-gray-200 p-3 px-5 flex">
                                <div class="w-1/2">Netlify Build Hook:</div>
                                <div class="w-1/2">
                                    <Field
                                        v-model="website.netlify_build_hook"
                                        name="netlify_build_hook"
                                        :rules="isRequired"
                                        class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    <ErrorMessage
                                        name="netlify_build_hook"
                                        class="text-red-600 text-sm"
                                    />
                                </div>
                            </div>
                            <div class="p-3 px-5 flex">
                                <div class="w-1/2">Created:</div>
                                <div class="w-1/2">
                                    {{
                                        $dayjs(website.created_at).format(
                                            'MMM DD, YYYY'
                                        )
                                    }}
                                </div>
                            </div>
                            <div class="bg-gray-200 p-3 px-5 flex">
                                <div class="w-1/2">Last Updated:</div>
                                <div class="w-1/2">
                                    {{
                                        $dayjs(website.updated_at).format(
                                            'MMM DD, YYYY'
                                        )
                                    }}
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <WButtonsBase class="w-36 ml-auto">
                                <div v-if="!submitting">Update</div>
                                <div v-else>Updating...</div>
                            </WButtonsBase>
                        </div>
                    </Form>
                </div>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ContainedLayout from '../../layouts/ContainedLayout.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
    },
    data() {
        return {
            website: null,
            submitting: false,
        }
    },
    created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
        this.$axios
            .post('/graphql', {
                query: `
                    {
                        website(id: ${this.$route.params.id}){
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
                this.website = res.data.data.website
            })
    },
    methods: {
        isRequired(value) {
            return value ? true : 'This field is required'
        },
        async onSubmit(values) {
            let query = JSON.stringify(values)
                .replace(/[{}]/g, '')
                .replace(/"([^"]+)":/g, '$1:')
            this.submitting = true
            await this.$axios
                .post('/graphql', {
                    query: `
                    mutation {
                        updateWebsite(id: ${this.website.id}, name: "${this.website.name}", domain: "${this.website.domain}", netlify_build_hook: "${this.website.netlify_build_hook}") {
                            id
                        }
                    }
                    `,
                })
                .then((res) => {
                    this.$router.push(
                        `/sites/view/${res.data.data.updateWebsite.id}`
                    )
                })
        },
    },
}
</script>
