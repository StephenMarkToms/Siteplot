<template>
    <Form @submit="onSubmit">
        <div class="grid grid-cols-2 gap-5">
            <div class="w-full">
                <label class="block text-sm font-medium text-gray-700">
                    Name*
                </label>
                <Field
                    v-model="formData.name"
                    name="name"
                    :rules="isRequired"
                    class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <ErrorMessage name="name" class="text-red-600 text-sm" />
            </div>
            <div v-if="repository" class="w-full">
                <label class="block text-sm font-medium text-gray-700">
                    Path*
                </label>
                <Field
                    v-model="formData.path"
                    name="path"
                    :rules="isRequired"
                    disabled="true"
                    class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <ErrorMessage name="path" class="text-red-600 text-sm" />
            </div>
            <div class="w-full">
                <label class="block text-sm font-medium text-gray-700">
                    Personal Access Token*
                </label>
                <Field
                    v-model="formData.personal_access_token"
                    name="personal_access_token"
                    :rules="isRequired"
                    class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <ErrorMessage
                    name="personal_access_token"
                    class="text-red-600 text-sm"
                />
            </div>
        </div>
        <WButtonsBase v-if="!repository" class="w-36 ml-auto mt-3">
            <div v-if="!submitting">Create</div>
            <div v-else>Creating...</div>
        </WButtonsBase>
        <WButtonsBase
            v-if="repository && formData && !deepEqual(repository, formData)"
            class="w-36 ml-auto mt-3"
        >
            <div v-if="!submitting">Update</div>
            <div v-else>Updating...</div>
        </WButtonsBase>
    </Form>
</template>
<script>
export default {
    props: {
        repository: {
            type: Object,
            required: false,
            default: null,
        },
    },
    emits: ['onSubmit'],
    data() {
        return {
            name: null,
            submitting: false,
            formData: {
                name: null,
                personal_access_token: null,
                path: null,
            },
        }
    },
    computed: {},
    async created() {
        if (this.repository) {
            this.formData = { ...this.repository }
        }
    },
    methods: {
        isRequired(value) {
            return value ? true : 'This field is required'
        },
        onSubmit(values) {
            this.submitting = true
            let dataValues = { ...values }
            if (this.formData.repositories && this.submitting) {
                dataValues = {
                    ...values,
                    repositories: {
                        sync: this.formData.repositories,
                    },
                }
            }
            this.$emit('onSubmit', dataValues)
            this.submitting = false
        },
        isObject(object) {
            return object != null && typeof object === 'object'
        },
        deepEqual(object1, object2) {
            const keys1 = Object.keys(object1)
            const keys2 = Object.keys(object2)
            if (keys1.length !== keys2.length) {
                return false
            }
            for (const key of keys1) {
                const val1 = object1[key]
                const val2 = object2[key]
                const areObjects = this.isObject(val1) && this.isObject(val2)
                if (
                    (areObjects && !this.deepEqual(val1, val2)) ||
                    (!areObjects && val1 !== val2)
                ) {
                    return false
                }
            }
            return true
        },
    },
}
</script>
