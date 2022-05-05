<script>
import assign from './utils/assign' // eslint-disable-line
import { h } from 'vue'

export default {
    props: {
        value: {
            type: String,
            required: true,
        },
        iframe: {
            type: Boolean,
            required: false,
            default: true,
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
        return {}
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
        if (this.iframe) {
            this.$el.addEventListener('load', this.renderCode)
        }
    },
    beforeUnmount() {
        if (this.iframe) {
            this.$el.removeEventListener('load', this.renderCode)
        }
    },
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
            console.log(this.$el)

            // Firefox needs the iframe to be loaded
            if (
                this.iframe &&
                this.$el.contentDocument.readyState !== 'complete'
            ) {
                return
            }

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

            if (this.iframe) {
                const head = this.$el.contentDocument.head
                if (this.styleEl) {
                    head.removeChild(this.styleEl)
                    for (const key in this.styleNodes) {
                        head.removeChild(this.styleNodes[key])
                    }
                }
                this.styleEl = document.createElement('style')
                this.styleEl.appendChild(document.createTextNode(this.styles))
                this.styleNodes = []
                const documentStyles = this.getDocumentStyle()
                for (const key in documentStyles) {
                    this.styleNodes[key] = documentStyles[key].cloneNode(true)
                    head.appendChild(this.styleNodes[key])
                }
                head.appendChild(this.styleEl)
            }

            try {
                const parent = this
                this.codeVM = new Vue({ parent, ...val }).$mount(this.codeEl)

                if (lastData) {
                    for (const key in lastData) {
                        this.codeVM[key] = lastData[key]
                    }
                }
            } catch (e) {
                /* istanbul ignore next */
                this.$emit('error', e)
                console.log('error', e)
            }
        },
    },
    render() {
        return h(
            this.iframe ? 'iframe' : 'div',
            {
                class: 'preview',
            },
            [this.scopedStyle ? h('style', null, this.scopedStyle) : '']
        )
    },
}
</script>
