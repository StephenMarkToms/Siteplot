<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="min-h-full pt-16 pb-12 flex flex-col">
                <main
                    class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div class="flex-shrink-0 flex justify-center">
                        <svg
                            class="w-12 text-primary-300"
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
                    <div class="py-16">
                        <div class="text-center">
                            <p
                                class="text-sm font-semibold text-primary-500 uppercase tracking-wide"
                            >
                                <span v-if="error === 'page'"> 404 </span>
                                <span v-else> Error </span>
                            </p>
                            <h1
                                class="mt-2 text-4xl font-extrabold text-primary-500 tracking-tight sm:text-5xl"
                            >
                                <span v-if="error === 'page'">
                                    Page not found!
                                </span>
                                <span v-else> Something went wrong! </span>
                            </h1>
                            <p class="mt-2 text-base text-gray-500">
                                <span v-if="error === 'page'">
                                    Sorry, we couldn’t find the page you’re
                                    looking for.
                                </span>
                                <span v-else>
                                    {{ error }}
                                </span>
                            </p>
                            <div class="mt-6 justify-center w-full flex">
                                <WButtonsBase
                                    @click="$router.push({ name: 'dashboard' })"
                                >
                                    Return to dashboard
                                    <span aria-hidden="true"> &rarr; </span>
                                </WButtonsBase>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </template>
    </ContainedLayout>
</template>
<script>
import ContainedLayout from '../layouts/ContainedLayout.vue'

export default {
    components: {
        ContainedLayout,
    },
    props: {
        error: {
            type: String,
            required: false,
            default: 'page',
        },
    },
}
</script>
