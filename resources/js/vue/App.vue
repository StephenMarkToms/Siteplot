<template>
    <div class="h-screen bg-gray-100">
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
