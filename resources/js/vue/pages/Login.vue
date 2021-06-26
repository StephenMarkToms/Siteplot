<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div
                    v-if="error !== null"
                    class="alert alert-danger"
                    role="alert"
                >
                    {{ error }}
                </div>

                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label
                                    for="email"
                                    class="
                                        col-sm-4 col-form-label
                                        text-md-right
                                    "
                                    >E-Mail Address</label
                                >
                                <div class="col-md-6">
                                    <input
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        class="form-control"
                                        required
                                        autofocus
                                        autocomplete="off"
                                    />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label
                                    for="password"
                                    class="
                                        col-md-4 col-form-label
                                        text-md-right
                                    "
                                    >Password</label
                                >
                                <div class="col-md-6">
                                    <input
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        class="form-control"
                                        required
                                        autocomplete="off"
                                    />
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                        @click="handleSubmit"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        if (window.Laravel.isLoggedin) {
            return next('dashboard')
        }
        next()
    },
    data() {
        return {
            email: '',
            password: '',
            error: null,
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            if (this.password.length > 0) {
                this.$axios.get('/sanctum/csrf-cookie').then((response) => {
                    this.$axios
                        .post('api/login', {
                            email: this.email,
                            password: this.password,
                        })
                        .then((response) => {
                            console.log(response.data)
                            if (response.data.success) {
                                this.$router.go('/dashboard')
                            } else {
                                this.error = response.data.message
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                })
            }
        },
    },
}
</script>
