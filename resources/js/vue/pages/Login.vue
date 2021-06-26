<template>
    <div
        class="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-50
            py-12
            px-4
            sm:px-6
            lg:px-8
        "
    >
        <div class="max-w-md w-full space-y-8">
            <div>
                <img
                    class="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2
                    class="
                        mt-6
                        text-center text-3xl
                        font-extrabold
                        text-gray-900
                    "
                >
                    SitePlot Login
                </h2>
            </div>
            <form class="mt-8 space-y-6" action="#">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only"
                            >Email address</label
                        >
                        <input
                            id="email-address"
                            v-model="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            autofocus
                            class="
                                appearance-none
                                rounded-none
                                relative
                                block
                                w-full
                                px-3
                                py-2
                                border border-gray-300
                                placeholder-gray-500
                                text-gray-900
                                rounded-t-md
                                focus:outline-none
                                focus:ring-indigo-500
                                focus:border-indigo-500
                                focus:z-10
                                sm:text-sm
                            "
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
                            class="
                                appearance-none
                                rounded-none
                                relative
                                block
                                w-full
                                px-3
                                py-2
                                border border-gray-300
                                placeholder-gray-500
                                text-gray-900
                                rounded-b-md
                                focus:outline-none
                                focus:ring-indigo-500
                                focus:border-indigo-500
                                focus:z-10
                                sm:text-sm
                            "
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a
                            href="#"
                            class="
                                font-medium
                                text-indigo-600
                                hover:text-indigo-500
                            "
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="
                            group
                            relative
                            w-full
                            flex
                            justify-center
                            py-2
                            px-4
                            border border-transparent
                            text-sm
                            font-medium
                            rounded-md
                            text-white
                            bg-indigo-600
                            hover:bg-indigo-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-indigo-500
                        "
                        @click="handleSubmit"
                    >
                        <span
                            class="
                                absolute
                                left-0
                                inset-y-0
                                flex
                                items-center
                                pl-3
                            "
                        >
                            <!-- Heroicon name: solid/lock-closed -->
                            <svg
                                class="
                                    h-5
                                    w-5
                                    text-indigo-500
                                    group-hover:text-indigo-400
                                "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
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
