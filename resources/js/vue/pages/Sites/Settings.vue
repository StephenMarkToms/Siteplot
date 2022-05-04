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
                    <div class="mt-3 w-full bg-white shadow rounded-lg">
                        <div class="flex justify-between pb-2 mb-2 p-5">
                            <div class="text-2xl font-medium secondary-600">
                                {{ website.name }}
                            </div>
                        </div>
                        <div class="bg-gray-200 p-3 px-5 flex">
                            <div class="w-1/2">Domain:</div>
                            <div class="w-1/2">
                                <a
                                    :href="`${website.domain}`"
                                    target="_blank"
                                    class="text-primary-200 font-medium"
                                >
                                    {{ website.domain }}
                                </a>
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
                                {{
                                    $dayjs(website.created_at).format(
                                        'MMM DD, YYYY'
                                    )
                                }}
                            </div>
                        </div>
                        <div class="p-3 px-5 flex">
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
        this.$store
            .dispatch('sites/getWebsiteById', this.$route.params.id)
            .then((website) => {
                this.website = website
            })
    },
    methods: {
        isRequired(value) {
            return value ? true : 'This field is required'
        },
    },
}
</script>
