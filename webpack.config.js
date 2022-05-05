const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            vue$: 'vue/dist/vue', // 'vue/dist/vue.common.js' for webpack 1
        },
    },
    module: {
        rules: [
            {
                test: /\.(postcss)$/,
                use: [
                    'vue-style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
                ],
            },
        ],
    },
}
