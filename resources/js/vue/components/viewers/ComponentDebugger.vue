<template>
    <div>
        <ComponentPreview
            :value="value"
            @handleError="handleError"
            @handleLog="handleLog"
        />
        <div
            v-if="logs.length > 0"
            class="bg-gray-800 text-green-400 rounded-b-lg pb-5"
        >
            <div class="font-medium text-sm pt-6 px-6 pb-2 flex space-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <div class="my-auto">
                    {{ logs.length }}
                </div>
            </div>
            <div
                v-for="(log, index) in logs"
                :key="index"
                class="pl-10 text-sm"
            >
                log: {{ log }}
            </div>
        </div>
        <div v-if="error">
            <div class="rounded-md bg-red-50 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg
                            class="h-5 w-5 text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">Error</h3>
                        <div class="mt-2 text-sm text-red-700">
                            <ul role="list" class="space-y-1">
                                <li>
                                    {{ error.err }}
                                </li>
                                <li>
                                    {{ error.instance }}
                                </li>
                                <li>
                                    {{ error.info }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ComponentPreview from '../../components/viewers/ComponentPreview/ComponentPreview'
export default {
    components: {
        ComponentPreview,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            error: null,
            logs: [],
        }
    },
    methods: {
        handleError(error) {
            this.error = error
        },
        handleLog(log) {
            this.logs.push(log[0])
        },
    },
}
</script>
