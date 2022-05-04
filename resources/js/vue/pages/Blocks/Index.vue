<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #modal>
            <Alert>
                <template #header> Delete Site </template>
                Please confirm that you wish to delete the
                <span class="font-bold"> {{ selectedSite.name }}</span> site by
                typing in the name below.
                <Field
                    v-model="deletePrompt"
                    name="domain"
                    class="mt-2 h-10 text-primary-700 appearance-none w-3/4 px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <template #buttons>
                    <div class="justify-between flex">
                        <WButtonsBase
                            type="grayInverted"
                            class="max-w-max"
                            @click="$store.dispatch('modal/toggleModal')"
                        >
                            Cancel
                        </WButtonsBase>
                        <WButtonsBase
                            v-if="deletePrompt === selectedSite.name"
                            :type="'danger'"
                            class="max-w-max"
                            @click="deleteWebsite"
                        >
                            Delete
                        </WButtonsBase>
                    </div>
                </template>
            </Alert>
        </template>
        <template #content>
            <div class="space-y-2">
                <div class="flex space-x-2">
                    <div class="w-full bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="flex space-x-2">
                                <div class="w-56">
                                    <Field
                                        v-model="blockName"
                                        autocomplete="off"
                                        name="name"
                                        placeholder="Search"
                                        class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        @input="blockName === '' && getBlocks()"
                                    />
                                </div>
                                <WButtonsBase
                                    v-if="blockName !== ''"
                                    @click="clearSearch()"
                                >
                                    Clear
                                </WButtonsBase>
                            </div>
                            <WButtonsBase
                                @click="$router.push({ name: 'blocks-create' })"
                            >
                                Create new block
                            </WButtonsBase>
                        </div>
                        <div
                            class="overflow-auto pr-5 minimal-scrollbar max-h-[50rem] h-full"
                        >
                            <div
                                v-if="blocks && blocks.length > 0"
                                class="grid grid-cols-4 gap-6"
                            >
                                <BlockTile
                                    v-for="(block, index) in blocks"
                                    :key="index"
                                    :block="block"
                                />
                            </div>
                            <div v-else-if="blocks" class="h-full flex">
                                <div class="text-center mx-auto my-auto">
                                    <svg
                                        class="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            vector-effect="non-scaling-stroke"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    <h3
                                        class="mt-2 text-sm font-medium text-gray-900"
                                    >
                                        We cannot find that block!
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500">
                                        Would you like to create/import a local
                                        version?
                                    </p>
                                    <div class="mt-6">
                                        <WButtonsBase
                                            class="mx-auto"
                                            @click="
                                                $router.push('/sites/create')
                                            "
                                        >
                                            Get started
                                        </WButtonsBase>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <LoadingList />
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
import LoadingList from '../../components/loading/List.vue'
import Alert from '../../components/alerts/Modal.vue'
import BlockTile from '../../components/siteplot/blocks/BlockTile.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        LoadingList,
        Alert,
        BlockTile,
    },
    data() {
        return {
            blockName: '',
            blocks: null,
            loading: false,
            selectedSite: null,
            deletePrompt: null,
        }
    },
    watch: {
        blockName(newValue) {
            this.loading = true
            let debounce = setTimeout(() => {
                if (this.blockName !== '') {
                    this.getBlocks()
                }
                this.loading = false
            }, 600)
        },
    },
    async mounted() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
        await this.getBlocks()
    },
    methods: {
        clearSearch() {
            this.blockName = ''
            this.getBlocks()
        },
        promptDelete(value) {
            this.$store.dispatch('modal/toggleModal')
            this.selectedSite = value
            this.deletePrompt = null
        },
        async deleteWebsite(id) {
            await this.$store
                .dispatch('sites/deleteWebsite', {
                    id: this.selectedSite.id,
                })
                .then((blocks) => {
                    this.$store.dispatch('modal/toggleModal')
                    this.getBlocks()
                })
        },
        async getBlocks() {
            await this.$store
                .dispatch('blocks/searchBlocks', {
                    name: this.blockName,
                    amount: 12,
                })
                .then((blocks) => {
                    this.blocks = blocks
                })
        },
    },
}
</script>
