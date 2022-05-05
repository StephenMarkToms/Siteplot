import assign from './utils/assign' // eslint-disable-line
import { h } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'
import parser from './utils/parser'
import compiler from './utils/compiler'

export default {
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
            codeVM: null,
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
        this.$watch('value', this.renderCode, { immediate: true })

        const result = parser(this.value)
        const compiledCode = compiler(result, this.scope)
        console.log(compiledCode.result)
    },
    beforeUnmount() {},
    methods: {
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

            try {
                const result = parser(this.value)
                const compiledCode = compiler(result, this.scope)

                const MyTestComponent = compiledCode.result

                const app = createApp({
                    render: () => h(MyTestComponent),
                })

                app.mount('#preview')
            } catch (e) {
                /* istanbul ignore next */
                this.$emit('error', e)
                console.log('error', e)
            }
        },
    },
    render() {
        return h(
            'div',
            {
                id: 'preview',
            },
            [this.scopedStyle ? h('style', null, this.scopedStyle) : '']
        )
    },
}
