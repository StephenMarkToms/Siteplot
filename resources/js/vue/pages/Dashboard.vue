<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div>Welcome {{ name }}</div>
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
