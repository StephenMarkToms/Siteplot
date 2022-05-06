module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#006466',
                    100: '#065a60',
                    200: '#0b525b',
                    300: '#144552',
                    400: '#1b3a4b',
                    500: '#212f45',
                },
                secondary: {
                    500: '#272640',
                    600: '#312244',
                    700: '#3e1f47',
                    800: '#4d194d',
                },
                warning: {
                    300: '#F0EDCC',
                    400: '#E5E0A4',
                    500: '#D9D27B',
                    600: '#CEC555',
                    700: '#BAB036',
                },
                success: {
                    300: '#C2D8C1',
                    400: '#A3C4A1',
                    500: '#84B082',
                    600: '#659C63',
                    700: '#517D4F',
                },
                danger: {
                    300: '#BD7A86',
                    400: '#AC5867',
                    500: '#8C4552',
                    600: '#6A343E',
                    700: '#48232A',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
}
