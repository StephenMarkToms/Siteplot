<template>
    <div
        v-if="block"
        class="rounded-lg shadow-lg cursor-pointer ring-1 ring-transparent hover:ring-primary-100 transition duration-300 opacity-75 hover:opacity-100"
        @click="
            $router.push({
                name: 'blocks-view',
                params: { id: block.id },
            })
        "
    >
        <div class="h-36 bg-gray-200 rounded-t-lg"></div>
        <div class="border-t px-4 py-2">
            <div class="font-medium text-sm flex space-x-2 justify-between">
                <div class="truncate">
                    {{ block.name }}
                </div>
                <div class="font-light">v.1.0.1</div>
            </div>
            <div class="text-xs">A radio input.</div>
        </div>
    </div>
    <div
        v-else
        class="rounded-lg shadow-lg ring-1 ring-transparent transition duration-300 opacity-75"
    >
        <div class="h-36 bg-gray-300 rounded-t-lg"></div>
        <div class="border-t px-4 py-2">
            <div class="font-medium text-sm flex space-x-2 justify-between">
                <div class="w-24 bg-gray-300 h-3"></div>
                <div class="font-light w-10 h-3 bg-gray-300"></div>
            </div>
            <div class="w-6 h-2 bg-gray-300 mt-2"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        block: {
            type: Object,
            required: false,
            default: null,
        },
    },
}
</script>
