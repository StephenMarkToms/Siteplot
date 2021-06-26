<template>
    <div>
        <PrimaryNav v-if="isLoggedIn" />
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            isLoggedIn: false,
        }
    },
    created() {
        if (window.Laravel.isLoggedin) {
            this.isLoggedIn = true
        }
    },
}
</script>
