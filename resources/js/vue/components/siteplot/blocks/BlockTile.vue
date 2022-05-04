<template>
    <div
        class="rounded-lg shadow-lg cursor-pointer ring-1 ring-transparent hover:ring-primary-100 transition duration-300 opacity-75 hover:opacity-100"
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
</template>
<script>
export default {
    props: {
        block: {
            type: Object,
            required: true,
        },
    },
}
</script>
