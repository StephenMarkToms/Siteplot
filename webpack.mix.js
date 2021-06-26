const mix = require('laravel-mix')
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
    .browserSync('http://localhost:8000')

if (mix.inProduction()) {
    mix.version()
}
