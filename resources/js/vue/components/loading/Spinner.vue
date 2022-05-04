<template>
    <div :class="classes"></div>
</template>

<script>
export default {
    props: {
        type: {
            type: [String, Array],
            required: false,
            default: 'primary',
        },
    },
    computed: {
        classes() {
            // Array is allowed to allow conditional type usage via array
            // Example:
            // <ButtonsBase
            //   :type="[processingPayment ? 'primaryInverted' : 'primary']"
            //   @click.native="createPayment"
            // >
            //   <WLoadingSpinner type="button" class="mx-auto" />
            // </ButtonsBase>

            if (Array.isArray(this.type)) {
                return this.$wind.loading.spinner[this.type[0]]
            }

            // Object is allowed as a type choice so that we can conditionally render the styles on a button object
            // Example:
            // <ButtonsBase
            //   :type="{ primaryInverted: processingPayment }"
            //   @click.native="createPayment"
            // >
            //   <WLoadingSpinner type="button" class="mx-auto" />
            // </ButtonsBase>

            if (typeof this.type === 'object') {
                return this.$wind.loading.spinner[Object.keys(this.type)[0]]
            }

            return this.$wind.loading.spinner[this.type]
        },
    },
}
</script>

<style>
.loader {
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
