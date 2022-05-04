<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2 max-w-3xl mx-auto">
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
                        Back to block library
                    </router-link>
                    <div class="mt-3 w-full bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="text-2xl font-medium secondary-600">
                                Create a new block!
                            </div>
                        </div>
                        <div>
                            <Form @submit="onSubmit">
                                <div class="grid grid-cols-2 gap-5">
                                    <div class="w-full">
                                        <label
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Name*
                                        </label>
                                        <Field
                                            name="name"
                                            :rules="isRequired"
                                            class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            class="text-red-600 text-sm"
                                        />
                                    </div>
                                    <div class="w-full">
                                        <label
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            File name*
                                        </label>
                                        <Field
                                            name="file_name"
                                            :rules="isRequired"
                                            class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        <ErrorMessage
                                            name="file_name"
                                            class="text-red-600 text-sm"
                                        />
                                    </div>
                                </div>
                                <WButtonsBase class="w-36 ml-auto">
                                    <div v-if="!submitting">Create</div>
                                    <div v-else>Creating...</div>
                                </WButtonsBase>
                            </Form>
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
            name: null,
            submitting: false,
        }
    },
    created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
    },
    methods: {
        isRequired(value) {
            return value ? true : 'This field is required'
        },
        async onSubmit(values) {
            values.team_id = 1
            console.log(values)

            await this.$store
                .dispatch('blocks/createBlockType', values)
                .then((res) => {
                    this.$router.push({ name: 'blocks' })
                })
        },
    },
}
</script>
