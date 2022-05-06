import { h } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'
import parser from './utils/parser'
import compiler from './utils/compiler'

export default {
    name: 'ComponentPreview',
    emits: ['handleError'],
    props: {
        value: {
            type: String,
            required: true,
        },
        keepData: {
            type: Boolean,
            required: false,
            default: false,
        },
        centerComponent: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data: function () {
        return {
            iApp: null,
            scope: {},
            compiledCode: null,
        }
    },
    mounted() {
        if (this.value) {
            const result = parser(this.value)
            const compiledCode = compiler(result, this.scope)
            this.compiledCode = compiledCode
            this.renderChildren()
        }
    },
    beforeUnmount() {
        if (this.iApp) {
            this.iApp.unmount()
        }
    },
    methods: {
        renderChildren() {
            const children = this.$slots.default
            const style = document.createElement('style')
            const head = this.$el.contentDocument.head
            const tailwind = document.createElement('script')
            const body = this.$el.contentDocument.body
            const el = document.createElement('DIV') // we will mount or nested app to this element
            if (this.centerComponent) {
                el.classList.add('w-full', 'flex', 'h-full', 'justify-center')
            }

            tailwind.setAttribute('src', 'https://cdn.tailwindcss.com')
            tailwind.type = 'text/javascript'

            head.appendChild(tailwind)
            body.appendChild(el)

            this.styleNodes = []
            const documentStyles = this.getDocumentStyle()
            for (const key in documentStyles) {
                this.styleNodes[key] = documentStyles[key].cloneNode(true)
                head.appendChild(this.styleNodes[key])
            }
            head.appendChild(style)

            setTimeout(() => {
                try {
                    const result = parser(this.value)
                    const compiledCode = compiler(result, this.scope)

                    const PreviewComponent = compiledCode.result

                    // eslint-disable-next-line vue/one-component-per-file
                    const iApp = createApp({
                        name: 'IApp',
                        render: () => h(PreviewComponent),
                    })
                    iApp.mount(el)
                    iApp.config.errorHandler = (err, instance, info) => {
                        // handle error, e.g. report to a service
                        this.$emit('handleError', { err, instance, info })
                    }
                    this.iApp = iApp
                } catch (e) {
                    /* istanbul ignore next */
                    this.$emit('handleError', e)
                    console.log('handleError', e)
                }
            }, 100)
        },
        getDocumentStyle() {
            const links = document.querySelectorAll('link[rel="stylesheet"]')
            const styles = document.querySelectorAll('style')
            return Array.from(links).concat(Array.from(styles))
        },
    },
    render() {
        return h('iframe', {
            class: ['w-full', 'min-h-[30em]'],
        })
    },
}
