<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2 max-w-3xl mx-auto">
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
                                Create a new Repository!
                            </div>
                        </div>
                        <div>
                            <RepositoryForm @onSubmit="submit" />
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
    async created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
    },
    methods: {
        async submit(values) {
            await this.$store
                .dispatch('repositories/createRepository', values)
                .then((res) => {
                    this.$router.push({ name: 'repositories' })
                })
        },
    },
}
</script>
