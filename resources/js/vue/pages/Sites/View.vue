<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div v-if="website" class="space-y-2 max-w-3xl mx-auto">
                <div class="flex space-x-2">
                    <div class="w-full bg-white shadow rounded-lg">
                        <div class="flex justify-between pb-2 mb-2 p-5">
                            <div class="text-2xl font-medium secondary-600">
                                {{ website.name }}
                            </div>
                        </div>
                        <div class="bg-gray-200 p-3 px-5 flex">
                            <div class="w-1/2">Domain:</div>
                            <div class="w-1/2">
                                {{ website.domain }}
                            </div>
                        </div>
                        <div class="p-3 px-5 flex">
                            <div class="w-1/2">Netlify Build Hook:</div>
                            <div class="w-1/2">
                                {{ website.netlify_build_hook }}
                            </div>
                        </div>
                        <div class="bg-gray-200 p-3 px-5 flex">
                            <div class="w-1/2">Created:</div>
                            <div class="w-1/2">
                                {{ website.created_at }}
                            </div>
                        </div>
                        <div class="p-3 px-5 flex">
                            <div class="w-1/2">Last Updated:</div>
                            <div class="w-1/2">
                                {{ website.updated_at }}
                            </div>
                        </div>
                    </div>
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
    },
}
</script>
