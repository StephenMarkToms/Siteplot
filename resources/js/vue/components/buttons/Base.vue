<template>
    <button :class="classes" @click="analytics()">
        <slot name="icon"
            ><component
                :is="svgComponent"
                if="svgComponent"
                class="mx-1 w-5 h-5 my-auto"
        /></slot>
        <slot />
    </button>
</template>
<script>
export default {
    props: {
        type: {
            type: [String, Array, Object],
            required: false,
            default: 'primary',
        },
        icon: {
            type: [String, Array, Object],
            required: false,
            default: null,
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
                return this.$wind.buttons.base[this.type[0]]
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
                return this.$wind.buttons.base[Object.keys(this.type)[0]]
            }

            return this.$wind.buttons.base[this.type]
        },
        svgComponent() {
            if (Array.isArray(this.icon)) {
                return (
                    this.icon[0] &&
                    require(`../../../icons/${this.icon}.svg?inline`)
                )
            }
            return (
                this.icon && require(`../../../icons/${this.icon}.svg?inline`)
            )
        },
    },
    methods: {
        analytics() {
            if (
                process.client &&
                this?.$wind?.analytics &&
                this.$wind.analytics === true
            ) {
                window.dataLayer = window.dataLayer || []
                window.dataLayer.push({
                    event: 'windEvent',
                    category: 'Button click',
                    action: this.$el.textContent,
                    label: window.location.pathname,
                })
            }
            if (
                process.client &&
                this?.$wind?.debug &&
                this.$wind.debug === true
            ) {
                // eslint-disable-next-line no-console
                console.log({
                    event: 'windEvent',
                    category: 'Button click',
                    action: this.$el.textContent,
                    label: window.location.pathname,
                })
            }
        },
    },
}
</script>
