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
                        <div>
                            <Form @submit="onSubmit">
                                <div class="grid grid-cols-2 gap-5">
                                    <div class="w-full">
                                        <label
                                            class="
                                                block
                                                text-sm
                                                font-medium
                                                text-gray-700
                                            "
                                        >
                                            Name*
                                        </label>
                                        <Field
                                            name="name"
                                            :rules="isRequired"
                                            class="
                                                h-10
                                                text-primary-700
                                                appearance-none
                                                w-full
                                                px-3
                                                py-2
                                                border border-gray-300
                                                rounded-md
                                                placeholder-primary-400
                                                focus:outline-none
                                                focus:shadow-outline-blue
                                                focus:border-blue-300
                                                transition
                                                duration-150
                                                ease-in-out
                                                sm:text-sm sm:leading-5
                                            "
                                        />
                                        <ErrorMessage
                                            name="name"
                                            class="text-red-600 text-sm"
                                        />
                                    </div>
                                    <div class="w-full">
                                        <label
                                            class="
                                                block
                                                text-sm
                                                font-medium
                                                text-gray-700
                                            "
                                        >
                                            Domain*
                                        </label>
                                        <Field
                                            name="domain"
                                            :rules="isRequired"
                                            class="
                                                h-10
                                                text-primary-700
                                                appearance-none
                                                w-full
                                                px-3
                                                py-2
                                                border border-gray-300
                                                rounded-md
                                                placeholder-primary-400
                                                focus:outline-none
                                                focus:shadow-outline-blue
                                                focus:border-blue-300
                                                transition
                                                duration-150
                                                ease-in-out
                                                sm:text-sm sm:leading-5
                                            "
                                        />
                                        <ErrorMessage
                                            name="domain"
                                            class="text-red-600 text-sm"
                                        />
                                    </div>
                                    <div class="w-full">
                                        <label
                                            class="
                                                block
                                                text-sm
                                                font-medium
                                                text-gray-700
                                            "
                                        >
                                            Netlify Build Hook
                                        </label>
                                        <Field
                                            name="netlify_build_hook"
                                            class="
                                                h-10
                                                text-primary-700
                                                appearance-none
                                                w-full
                                                px-3
                                                py-2
                                                border border-gray-300
                                                rounded-md
                                                placeholder-primary-400
                                                focus:outline-none
                                                focus:shadow-outline-blue
                                                focus:border-blue-300
                                                transition
                                                duration-150
                                                ease-in-out
                                                sm:text-sm sm:leading-5
                                            "
                                        />
                                    </div>
                                </div>
                                <WButtonsBase icon="plus" class="w-36 ml-auto">
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
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        Field,
        Form,
        ErrorMessage,
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
            let query = JSON.stringify(values)
                .replace(/[{}]/g, '')
                .replace(/"([^"]+)":/g, '$1:')
            this.submitting = true
            await this.$axios
                .post('/graphql', {
                    query: `
                    mutation {
                        createWebsite(${query}) {
                            name
                            domain
                        }
                    }
                    `,
                })
                .then((res) => {
                    console.log(res)
                })
            this.submitting = false
        },
    },
}
</script>
