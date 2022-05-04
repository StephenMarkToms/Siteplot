<template>
    <div>
        <div class="">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex px-5 lg:px-8 justify-around">
                    <WButtonsBase
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :type="value === tab ? 'tabSelected' : 'tab'"
                        @click="value = tab"
                    >
                        {{ tab }}
                    </WButtonsBase>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from 'vue'
export default {
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            },
            required: true,
        },
        modelValue: {
            type: String,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const value = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        })

        return {
            value,
        }
    },
}
</script>
