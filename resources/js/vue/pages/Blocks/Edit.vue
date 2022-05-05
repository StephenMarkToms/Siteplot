<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div v-if="block && originalBlock">
                <div
                    class="pt-3 px-5 ring-1 ring-gray-200 bg-gray-100 rounded-t-lg shadow-lg flex justify-between"
                >
                    <WTabsHorizontal
                        v-model="view"
                        class="w-1/4 my-auto"
                        :tabs="['meta', 'code', 'data', 'preview']"
                    />
                    <div class="my-auto flex space-x-2">
                        <WButtonsBase
                            v-if="
                                block &&
                                originalBlock &&
                                !deepEqual(block, originalBlock)
                            "
                            class="w-32"
                            @click="onSubmit"
                        >
                            <div v-if="!submitting">Save</div>
                            <div v-else>Saving...</div>
                        </WButtonsBase>
                        <WButtonsBase
                            class="w-32"
                            type="primaryInverted"
                            @click="$router.push({ name: 'blocks' })"
                        >
                            <div v-if="!submitting">Cancel</div>
                        </WButtonsBase>
                    </div>
                </div>
                <div
                    class="rounded-b-lg shadow-lg overflow-hidden bg-white py-8"
                >
                    <Viewer v-if="view === 'preview'">
                        <div>
                            <ComponentPreview :value="block.component" />
                        </div>
                    </Viewer>
                    <div :class="['bg-white p-4', view !== 'meta' && 'hidden']">
                        <BlockForm
                            class="max-w-screen-md mx-auto"
                            :block="block"
                        />
                    </div>
                    <div v-if="view === 'code'" class="p-4">
                        <CodeEditor
                            v-model="block.component"
                            z_index="0"
                            :languages="[
                                ['html', 'HTML'],
                                ['javascript', 'JS'],
                                ['css', 'CSS'],
                            ]"
                            :autofocus="true"
                            :wrap_code="true"
                            :language_selector="true"
                            theme="light"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ComponentPreview from '../../components/viewers/ComponentPreview/ComponentPreview'
import CodeEditor from 'simple-code-editor'
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import Viewer from '../../components/viewers/ResponsiveWeb.vue'
import BlockForm from '../../components/siteplot/forms/BlockType.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        Viewer,
        BlockForm,
        CodeEditor,
        ComponentPreview,
    },
    data() {
        return {
            originalBlock: null,
            block: null,
            submitting: false,
            view: 'meta',
        }
    },
    async created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
        await this.$store
            .dispatch('blocks/getBlockTypeById', this.$route.params.id)
            .then((block) => {
                this.block = block
                this.originalBlock = { ...block }
            })
    },
    methods: {
        async onSubmit(values) {
            this.submitting = true
            await this.$axios
                .post('/graphql', {
                    query: `mutation updateBlockType($id: Int!, $name: String!, $file_name: String!, $component: String!) {
                                updateBlockType(id: $id, name: $name, file_name: $file_name, component: $component){
                                    id
                                    name
                                    file_name
                                    component
                                }
                            }`,
                    variables: {
                        id: parseInt(this.block.id),
                        name: this.block.name,
                        file_name: this.block.file_name,
                        component: this.block.component,
                    },
                })
                .then((res) => {
                    console.log(res)
                    this.$router.push({
                        name: 'blocks',
                    })
                })
        },
        isRequired(value) {
            return value ? true : 'This field is required'
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
                    (areObjects && !deepEqual(val1, val2)) ||
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
