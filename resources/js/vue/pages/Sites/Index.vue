<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2">
                <div
                    class="flex h-24 bg-white bg-white shadow p-5 rounded-lg"
                ></div>
                <div class="flex space-x-2">
                    <div class="w-2/3 bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="text-2xl font-medium secondary-600">
                                Sites
                            </div>
                            <WButtonsBase
                                icon="plus"
                                @click="$router.push('/sites/create')"
                            >
                                Create new
                            </WButtonsBase>
                        </div>
                        <div class="h-96 overflow-auto">
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
                            >
                                <div
                                    class="w-24 h-20 rounded-lg bg-gray-200"
                                ></div>
                                <div class="my-auto">
                                    <div class="font-bold">
                                        {{ website.name }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ website.domain }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/3 bg-white shadow p-5 rounded-lg">
                        <div
                            class="
                                text-2xl
                                font-medium
                                border-b
                                secondary-600
                                4
                                -2
                                pb-2
                                mb-4
                            "
                        >
                            Deployments
                        </div>
                        <div>Site 1 here</div>
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
            name: null,
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
                        websites(first: 10) {
                            data {
                                id
                                name
                                domain
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
