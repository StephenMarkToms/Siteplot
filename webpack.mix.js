const mix = require('laravel-mix')
const config = require('./webpack.config')
const tailwindcss = require('tailwindcss')

require('laravel-mix-eslint')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .vue()
    .sass('resources/sass/app.scss', 'public/css')
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
    ])
    .webpackConfig(require('./webpack.config'))
    .sourceMaps()
    .eslint({
        fix: true,
        extensions: ['js', 'vue'],
    })
    .override((config) => {
        config.module.rules.find((rule) => rule.test.test('.svg')).exclude =
            /\.svg$/

        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: 'html-loader' }],
        })
    })
    .browserSync('http://localhost:8000')

if (mix.inProduction()) {
    mix.version()
}
