<template>
    <nav class="bg-primary-100 shadow sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex px-2 lg:px-0">
                    <div class="flex-shrink-0 flex items-center">
                        <svg
                            class="w-8 text-white"
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
                    <div class="lg:ml-6 lg:flex lg:space-x-8">
                        <router-link
                            :to="{ name: 'dashboard' }"
                            :class="
                                $route.name === 'dashboard'
                                    ? 'nav-link border-gray-300'
                                    : 'nav-link border-transparent'
                            "
                        >
                            Dashboard
                        </router-link>
                    </div>
                    <div class="lg:ml-6 lg:flex lg:space-x-8">
                        <router-link
                            :to="{ name: 'sites' }"
                            :class="
                                $route.name === 'sites'
                                    ? 'nav-link border-gray-300'
                                    : 'nav-link border-transparent'
                            "
                        >
                            Sites
                        </router-link>
                    </div>
                    <div class="lg:ml-6 lg:flex lg:space-x-8">
                        <router-link
                            :to="{ name: 'blocks' }"
                            :class="
                                $route.name === 'blocks'
                                    ? 'nav-link border-gray-300'
                                    : 'nav-link border-transparent'
                            "
                        >
                            Blocks
                        </router-link>
                    </div>
                    <div class="lg:ml-6 lg:flex lg:space-x-8">
                        <router-link
                            :to="{ name: 'repositories' }"
                            :class="
                                $route.name === 'repositories'
                                    ? 'nav-link border-gray-300'
                                    : 'nav-link border-transparent'
                            "
                        >
                            Repositories
                        </router-link>
                    </div>
                </div>
                <div class="lg:ml-4 lg:flex lg:items-center">
                    <!-- Profile dropdown -->
                    <Popover>
                        <div class="ml-4 relative flex-shrink-0">
                            <div>
                                <button
                                    id="user-menu-button"
                                    type="button"
                                    class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span class="sr-only">Open user menu</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-8 w-8 rounded-full text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <template #content>
                            <div
                                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                                tabindex="-1"
                            >
                                <!-- Active: "bg-gray-100", Not Active: "" -->

                                <a
                                    id="user-menu-item-2"
                                    href="#"
                                    class="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    tabindex="-1"
                                    @click="logout()"
                                    >Sign out</a
                                >
                            </div>
                        </template>
                    </Popover>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    methods: {
        logout(e) {
            this.$axios.get('/sanctum/csrf-cookie').then((response) => {
                this.$axios
                    .post('/api/logout')
                    .then((response) => {
                        if (response.data.success) {
                            window.location.href = '/'
                        }
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            })
        },
    },
}
</script>
<style lang="postcss" scoped>
.nav-link {
    @apply text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium;
}
</style>
