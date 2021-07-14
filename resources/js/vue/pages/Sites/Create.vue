<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2 max-w-3xl mx-auto">
                <div class="flex space-x-2">
                    <div class="w-full bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="text-2xl font-medium secondary-600">
                                Create a new site!
                            </div>
                        </div>
                        <div></div>
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
            name: null,
            formData: {
                name: null,
                domain: null,
                netlify_build_hook: null,
            },
        }
    },
    created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
        this.getWebsites()
    },
    methods: {
        getWebsites() {
            this.$axios
                .post('/graphql', {
                    query: `
                    {
                        websites(first: 10) {
                            data {
                            id
                            name
                            domain
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
                    this.websites = result.data.data.websites.data
                })
        },
    },
}
</script>
