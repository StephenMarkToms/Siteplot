module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        parser: 'babel-eslint',
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    // add your custom rules here
    rules: {
        'vue/no-v-html': 0,
    },
}
