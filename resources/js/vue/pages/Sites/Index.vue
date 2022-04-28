<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2">
                <div class="flex space-x-2">
                    <div class="w-full bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="flex space-x-2">
                                <div class="w-56">
                                    <Field
                                        v-model="websiteName"
                                        autocomplete="off"
                                        name="name"
                                        placeholder="Search"
                                        class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        @input="
                                            websiteName === '' && getWebsites()
                                        "
                                    />
                                </div>
                                <WButtonsBase
                                    v-if="websiteName !== ''"
                                    icon="plus"
                                    @click="clearSearch()"
                                >
                                    Clear
                                </WButtonsBase>
                            </div>
                            <WButtonsBase
                                @click="$router.push('/sites/create')"
                            >
                                Create new
                            </WButtonsBase>
                        </div>
                        <div class="h-96 overflow-auto pr-5">
                            <div v-if="websites && websites.length > 0">
                                <TableRow
                                    v-for="(website, index) in websites"
                                    :key="index"
                                    :website="website"
                                />
                            </div>
                            <div v-else-if="websites" class="h-full flex">
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
                                        No websites
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500">
                                        Get started by creating a new website.
                                    </p>
                                    <div class="mt-6">
                                        <WButtonsBase
                                            icon="plus"
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
import TableRow from '../../components/siteplot/sites/TableRow.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        LoadingList,
        TableRow,
    },
    data() {
        return {
            websiteName: '',
            websites: null,
            loading: false,
        }
    },
    watch: {
        websiteName(newValue) {
            console.log('new')
            this.loading = true
            let debounce = setTimeout(() => {
                if (this.websiteName !== '') {
                    this.getWebsites()
                }
                this.loading = false
            }, 600)
        },
    },
    async mounted() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
        await this.getWebsites()
    },
    methods: {
        clearSearch() {
            this.websiteName = ''
            this.getWebsites()
        },
        async getWebsites() {
            await this.$axios
                .post('graphql', {
                    query: `
                    {
                        websites(first: 6, where: { column: NAME, operator: LIKE, value: "%${this.websiteName}%" }) {
                            data{
                                domain
                                name
                                id
                                created_at
                                updated_at
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
