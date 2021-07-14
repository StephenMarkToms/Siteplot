<template>
    <div class="mt-3 inline-flex rounded-md sm:mt-0">
        <div
            class="w-full relative flex text-left hover:cursor-pointer"
            @click="!isActive ? (isActive = true) : null"
        >
            <slot />
            <div v-if="isActive" class="fixed z-30 inset-0 transition-opacity">
                <div class="absolute inset-0" @click.stop="isActive = false" />
            </div>
            <div
                :class="[
                    x && y
                        ? x === 'left'
                            ? 'origin-right right-0'
                            : 'origin-left left-0'
                        : 'center',
                    x && y
                        ? y === 'top'
                            ? 'top-0 transform -translate-y-full'
                            : 'bottom-0 transform translate-y-full'
                        : 'center',
                    'absolute rounded-md z-50',
                    { hidden: !isActive },
                ]"
            >
                <div
                    :class="[
                        animated &&
                            'animate__animated animate__fastest animate__zoomIn',
                        'rounded-md bg-white shadow-xs z-50 relative',
                    ]"
                >
                    <div
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                        class="shadow rounded-lg"
                    >
                        <slot name="content" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        links: {
            type: Object,
            default() {
                return {}
            },
        },
        show: {
            type: Boolean,
            default: false,
        },
        animated: {
            type: Boolean,
            default: false,
        },
        x: {
            type: [String, Boolean],
            default: 'left',
        },
        y: {
            type: [String, Boolean],
            default: 'bottom',
        },
    },
    data() {
        return {
            isActive: this.show,
        }
    },
}
</script>
