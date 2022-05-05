import { h } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'
import parser from './utils/parser'
import compiler from './utils/compiler'

export default {
    name: 'ComponentPreview',
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
            tailwind.setAttribute('src', 'https://cdn.tailwindcss.com')
            head.appendChild(tailwind)
            body.appendChild(el)

            this.styleNodes = []
            const documentStyles = this.getDocumentStyle()
            for (const key in documentStyles) {
                this.styleNodes[key] = documentStyles[key].cloneNode(true)
                head.appendChild(this.styleNodes[key])
            }
            head.appendChild(style)

            try {
                setTimeout(() => {
                    const result = parser(this.value)
                    const compiledCode = compiler(result, this.scope)

                    const PreviewComponent = compiledCode.result

                    // eslint-disable-next-line vue/one-component-per-file
                    const iApp = createApp({
                        name: 'IApp',
                        //freezing to prevent unnessessary Reactifiation of vNodes
                        data() {
                            return { children: Object.freeze(children) }
                        },
                        render: () => h(PreviewComponent),
                    })
                    iApp.mount(el)
                    this.iApp = iApp
                }, 1000)
            } catch (e) {
                /* istanbul ignore next */
                this.$emit('error', e)
                console.log('error', e)
            }
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
