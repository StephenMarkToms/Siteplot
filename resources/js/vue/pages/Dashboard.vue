<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2">
                <div class="flex space-x-2">
                    <div class="w-full bg-white shadow p-5 rounded-lg">
                        <div>Welcome back {{ name }}</div>
                    </div>
                    <div class="w-56 bg-white shadow p-5 rounded-lg">
                        asdfads
                    </div>
                </div>
                <div class="flex space-x-2">
                    <div class="w-2/3 bg-white shadow p-5 rounded-lg">
                        <div class="text-2xl font-medium border-b pb-2 mb-4">
                            Sites
                        </div>
                        <div>Site 1 here</div>
                    </div>
                    <div class="w-1/3 bg-white shadow p-5 rounded-lg">
                        <div class="text-2xl font-medium border-b pb-2 mb-4">
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
import ContainedLayout from '../layouts/ContainedLayout.vue'
export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
    },
    data() {
        return {
            name: null,
        }
    },
    created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
    },
}
</script>
