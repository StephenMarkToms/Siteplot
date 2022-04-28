<template>
    <div :class="['fixed z-30 inset-0 overflow-y-auto', { hidden: !show }]">
        <div
            :class="[
                'flex items-center justify-center min-h-screen p-2 sm:p-6 text-center sm:block',
            ]"
        >
            <div class="fixed inset-0 transition-opacity" @click="closeModal">
                <div class="absolute inset-0 opacity-75 -ml-8">
                    <div
                        class="animate__animated animate__fadeIn bg-gray-800 w-full h-full"
                    ></div>
                </div>
            </div>
            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
            ></span>
            <div
                class="animate__animated animate__faster animate__zoomIn bg-white inline-block p-4 sm:p-6 rounded-lg shadow-xl sm:align-middle sm:my-8 text-left transform transition-all w-full md:w-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            show: (state) => state.modal.show,
            canClose: (state) => state.modal.canClose,
        }),
    },
    methods: {
        closeModal() {
            console.log('hi')
            this.$store.dispatch('modal/toggleModal')
        },
    },
}
</script>
