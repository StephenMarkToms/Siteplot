<template>
    <div>Welcome {{ name }}</div>
</template>

<script>
export default {
    name: 'Dashboard',
    beforeRouteEnter(to, from, next) {
        if (!window.Laravel.isLoggedin) {
            window.location.href = '/'
        }
        next()
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
