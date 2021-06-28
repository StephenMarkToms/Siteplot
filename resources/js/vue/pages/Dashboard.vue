<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2">
                <div class="flex space-x-2">
                    <div class="w-full bg-white shadow p-5 rounded-lg">
                        <div class="border-b pb-2 mb-3">
                            Welcome back
                            <span class="font-bold">{{ name }}</span> 🧙
                        </div>
                        <div class="mt-2 flex space-x-2">
                            <div
                                class="
                                    w-1/4
                                    rounded-lg
                                    bg-gray-50
                                    py-2
                                    px-3
                                    text-primary-500
                                "
                            >
                                <div class="text-sm">Bandwidth used</div>
                                <div class="text-2xl">7 GB/400 GB</div>
                            </div>
                            <div
                                class="
                                    w-1/4
                                    rounded-lg
                                    bg-gray-50
                                    py-2
                                    px-3
                                    text-primary-500
                                "
                            >
                                <div class="text-sm">Bandwidth used</div>
                                <div class="text-2xl">7 GB/400 GB</div>
                            </div>
                            <div
                                class="
                                    w-1/4
                                    rounded-lg
                                    bg-gray-50
                                    py-2
                                    px-3
                                    text-primary-500
                                "
                            >
                                <div class="text-sm">Bandwidth used</div>
                                <div class="text-2xl">7 GB/400 GB</div>
                            </div>
                            <div
                                class="
                                    w-1/4
                                    rounded-lg
                                    bg-gray-50
                                    py-2
                                    px-3
                                    text-primary-500
                                "
                            >
                                <div class="text-sm">Bandwidth used</div>
                                <div class="text-2xl">7 GB/400 GB</div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-1/3 bg-primary-100 shadow p-5 rounded-lg flex"
                    >
                        <svg
                            class="text-white mx-auto my-auto"
                            width="83"
                            height="88"
                            viewBox="0 0 83 88"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M23.3361 39.617L11.7142 30.975L41.5 8.75818L71.2858 30.975L65.5595 35.2496L71.4166 39.617L82.9615 30.975L41.5 0L0 30.975L41.5 61.95L59.6639 48.3984L71.2858 57.0714L41.5 79.2805L11.7142 57.025L17.8715 52.4562L11.9836 48.0887L0 57.025L41.5 88L83 57.025L41.5 26.05L23.3361 39.617ZM41.5 53.1686L29.1855 43.9845L41.5 34.8469L53.8145 44.0232L41.5 53.1686Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <div class="w-2/3 bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="text-2xl font-medium secondary-600">
                                Sites
                            </div>
                            <div>Create new</div>
                        </div>
                        <div>Site 1 here</div>
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
