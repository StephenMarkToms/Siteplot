import assign from './utils/assign' // eslint-disable-line
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
        styles: {
            type: String,
            required: false,
            default: null,
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
        }
    },
    computed: {
        scopedStyle() {
            return this.styles
                ? insertScope(this.styles, `.${this.className}`)
                : ''
        },
    },
    mounted() {
        this.renderChildren()
    },
    beforeUnmount() {
        this.iApp.unmount()
    },
    methods: {
        renderChildren() {
            const children = this.$slots.default
            const body = this.$el.contentDocument.body
            const el = document.createElement('DIV') // we will mount or nested app to this element
            body.appendChild(el)

            try {
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
            } catch (e) {
                /* istanbul ignore next */
                this.$emit('error', e)
                console.log('error', e)
            }
        },
        insertScope(style, scope) {
            const regex = /(^|\})\s*([^{]+)/g
            return style.trim().replace(regex, (m, g1, g2) => {
                return g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`
            })
        },
        getDocumentStyle() {
            const links = document.querySelectorAll('link[rel="stylesheet"]')
            const styles = document.querySelectorAll('style')
            return Array.from(links).concat(Array.from(styles))
        },
        renderCode() {
            const val = this.value
            const lastData =
                this.keepData && this.codeVM && assign({}, this.codeVM.$data)
            const container = this.iframe
                ? this.$el.contentDocument.body
                : this.$el

            if (this.codeVM) {
                this.codeVM.$destroy()
                container.removeChild(this.codeVM.$el)
            }

            this.codeEl = document.createElement('div')
            container.appendChild(this.codeEl)
            this.codeEl.setAttribute('id', 'target')
        },
    },
    render() {
        return h('iframe', {
            on: { load: this.renderChildren },
        })
    },
}
