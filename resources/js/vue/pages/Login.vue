<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
        <div class="max-w-md w-full space-y-8">
            <div>
                <svg
                    class="text-primary-200 mx-auto my-auto"
                    width="83"
                    height="88"
                    viewBox="0 0 83 88"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M23.3361 39.617L11.7142 30.975L41.5 8.75818L71.2858 30.975L65.5595 35.2496L71.4166 39.617L82.9615 30.975L41.5 0L0 30.975L41.5 61.95L59.6639 48.3984L71.2858 57.0714L41.5 79.2805L11.7142 57.025L17.8715 52.4562L11.9836 48.0887L0 57.025L41.5 88L83 57.025L41.5 26.05L23.3361 39.617ZM41.5 53.1686L29.1855 43.9845L41.5 34.8469L53.8145 44.0232L41.5 53.1686Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <form class="mt-8 space-y-6" action="#">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            v-model="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            autofocus
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            id="password"
                            v-model="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a
                            href="#"
                            class="font-medium text-primary-200 hover:text-primary-100"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-200 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200"
                        @click="handleSubmit"
                    >
                        Login
                    </button>
                </div>
                <Alert v-if="error !== null">
                    {{ error }}
                </Alert>
            </form>
        </div>
    </div>
    <div class="container hidden">
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
                                    class="col-sm-4 col-form-label text-md-right"
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
                                    class="col-md-4 col-form-label text-md-right"
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
    created() {
        this.$axios
            .post('/graphql', {
                query: `
                    {
                        websites(first: 10) {
                            data {
                            id
                            name
                            domain
                            }
                            paginatorInfo {
                            currentPage
                            lastPage
                            }
                        }
                    }
                    `,
            })
            .then((result) => {
                console.log(result.data.data.websites.data)
            })
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
