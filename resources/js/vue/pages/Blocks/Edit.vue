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
                            <div>Cancel</div>
                        </WButtonsBase>
                    </div>
                </div>
                <div
                    class="rounded-b-lg shadow-lg overflow-hidden bg-white py-8"
                >
                    <Viewer v-if="view === 'preview'">
                        <div>
                            <ComponentDebugger :value="block.component" />
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
                    <div v-if="view === 'data'">
                        <div class="mt-8 -mt-10 flex flex-col">
                            <div class="mt-5 mb-4 px-4 justify-center flex">
                                <WButtonsBase type="primary">
                                    Add Widget
                                </WButtonsBase>
                            </div>
                            <div
                                class="-mb-6 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"
                            >
                                <div
                                    class="inline-block min-w-full align-middle md:px-6 lg:px-8"
                                >
                                    <div
                                        class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                                    >
                                        <table
                                            class="min-w-full divide-y divide-gray-300"
                                        >
                                            <thead class="bg-gray-50">
                                                <tr
                                                    class="divide-x divide-gray-200"
                                                >
                                                    <th
                                                        scope="col"
                                                        class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    ></th>
                                                    <th
                                                        scope="col"
                                                        class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Label
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Usage
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                                                    ></th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                class="divide-y divide-gray-200 bg-white"
                                            >
                                                <Draggable
                                                    :list="blockData"
                                                    item-key="name"
                                                    ghost-class="ghost"
                                                    class="contents"
                                                    :move="checkMove"
                                                    @start="dragging = true"
                                                    @end="dragging = false"
                                                >
                                                    <template
                                                        #item="{ element }"
                                                    >
                                                        <tr
                                                            class="divide-x divide-gray-200"
                                                        >
                                                            <td
                                                                class="hover:bg-gray-50 cursor-pointer"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-5 w-5 mx-auto cursor-pointer text-gray-400"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                                                    />
                                                                </svg>
                                                            </td>
                                                            <td
                                                                :class="{
                                                                    'not-draggable':
                                                                        !enabled,
                                                                }"
                                                                class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6"
                                                            >
                                                                {{
                                                                    element.label
                                                                }}
                                                            </td>
                                                            <td
                                                                class="whitespace-nowrap p-4 text-sm text-gray-500"
                                                            >
                                                                {{
                                                                    element.name
                                                                }}
                                                            </td>
                                                            <td
                                                                class="whitespace-nowrap p-4 text-sm text-gray-500"
                                                            >
                                                                {{
                                                                    element.usage
                                                                }}
                                                            </td>
                                                            <td
                                                                class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"
                                                            >
                                                                <div
                                                                    class="flex space-x-2 justify-center"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="h-5 w-5"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                                                        />
                                                                    </svg>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        class="h-5 w-5"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                            clip-rule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </Draggable>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import draggable from 'vuedraggable'
import ComponentDebugger from '../../components/viewers/ComponentDebugger.vue'
import CodeEditor from 'simple-code-editor'
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import Viewer from '../../components/viewers/ResponsiveWeb.vue'
import BlockForm from '../../components/siteplot/forms/BlockType.vue'

export default {
    name: 'Dashboard',
    components: {
        Draggable: draggable,
        ContainedLayout,
        Viewer,
        BlockForm,
        CodeEditor,
        ComponentDebugger,
    },
    data() {
        return {
            originalBlock: null,
            block: null,
            submitting: false,
            view: 'data',
            drag: false,
            blockData: [
                { name: 'hidden', label: 'Hide', usage: 'content', id: 0 },
                { name: 'title', label: 'Title', usage: 'content', id: 1 },
                {
                    name: 'bg-color',
                    label: 'Background Color',
                    usage: 'style',
                    id: 2,
                },
            ],
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            }
        },
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
