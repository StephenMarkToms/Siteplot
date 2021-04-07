<template>
    <div>Example component, {{ greeting }}</div>
    <div>Foo:</div>
</template>
<script>
import { ref } from 'vue'
export default {
    setup() {
        const greeting = ref('hello there')
        return {
            greeting,
        }
    },
}
</script>
