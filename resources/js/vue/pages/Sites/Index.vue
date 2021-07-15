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
                                        name="name"
                                        placeholder="Search"
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
                                        @input="
                                            websiteName === '' && getWebsites()
                                        "
                                    />
                                </div>
                                <WButtonsBase
                                    v-if="websiteName !== ''"
                                    icon="plus"
                                    @click="getWebsites()"
                                >
                                    Search
                                </WButtonsBase>
                            </div>
                            <WButtonsBase
                                icon="plus"
                                @click="$router.push('/sites/create')"
                            >
                                Create new
                            </WButtonsBase>
                        </div>
                        <div class="h-96 overflow-auto pr-5">
                            <div
                                v-for="(website, index) in websites"
                                :key="index"
                                class="
                                    flex
                                    space-x-6
                                    rounded-lg
                                    cursor-pointer
                                    hover:bg-gray-100
                                    p-2
                                "
                                @click="
                                    $router.push(`/sites/view/${website.id}`)
                                "
                            >
                                <div
                                    class="w-24 h-20 rounded-lg bg-gray-200"
                                ></div>
                                <div
                                    class="my-auto flex w-full justify-between"
                                >
                                    <div>
                                        <div class="font-bold">
                                            {{ website.name }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ website.domain }}
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-medium">
                                            {{ website.created_at }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ website.updated_at }}
                                        </div>
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
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import WButtonsBase from '../../components/buttons/Base.vue'
export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        WButtonsBase,
    },
    data() {
        return {
            websiteName: '',
            websites: [],
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
