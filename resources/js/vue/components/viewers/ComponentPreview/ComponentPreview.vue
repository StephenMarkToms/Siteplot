<script>
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
    },
    render() {
        return [
            h(
                this.iframe ? 'iframe' : 'div',
                {
                    class: 'preview',
                },
                [this.scopedStyle ? h('style', null, this.scopedStyle) : '']
            ),
        ]
    },
}
</script>
