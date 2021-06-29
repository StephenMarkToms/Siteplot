export default {
    install: (app, options) => {
        app.config.globalProperties.$wind = {
            analytics: false,
            icons: {
                base: {
                    neutral: 'focus:outline-none',
                    blank: 'focus:outline-none mx-1 w-5 h-5 my-auto',
                    primary:
                        'focus:outline-none text-primary-600 mx-1 w-5 h-5 my-auto',
                    danger: 'focus:outline-none text-secondary-800 hover:text-secondary-900 transition duration-150 mx-1 w-5 h-5 my-auto',
                    secondary:
                        'focus:outline-none text-secondary-600 mx-1 w-5 h-5 my-auto',
                },
            },
            links: {
                base: {
                    secondary:
                        'flex active:text-secondary-700 font-medium text-secondary-600 hover:text-secondary-800 transition duration-150 ease-in-out h-full',
                    navPrimary:
                        'flex text-primary-700 select-none focus:outline-none',
                    warning:
                        'flex active:text-yellow-700 font-medium text-yellow-600 hover:text-yellow-800 transition duration-150 ease-in-out h-full',
                    primary:
                        'flex active:text-primary-700 font-medium text-primary-600 hover:text-primary-800 transition duration-150 ease-in-out h-full',
                    danger: 'flex active:text-danger-500 font-medium text-danger-500 hover:text-danger-600 transition duration-150 ease-in-out h-full',
                },
            },
            buttons: {
                base: {
                    blank: 'focus:outline-none',
                    primary:
                        'border-transparent bg-primary-100 shadow-md my-auto flex justify-center py-2 px-2 border text-sm font-medium rounded-md transition duration-150 ease-in-out hover:bg-primary-300 hover:border-primary-700 active:bg-primary-700 text-white transition duration-150 ease-in-out',
                    primaryInverted:
                        'shadow-md w-full my-auto flex justify-center py-2 px-2 border text-sm font-medium rounded-md transition duration-150 ease-in-out w-full inline-flex justify-center py-2 px-4 border border-primary-300 rounded-md bg-white text-sm font-medium text-primary-500 hover:text-primary-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out',
                    alert: 'shadow-md w-full my-auto flex justify-center py-2 px-2 border text-sm font-medium rounded-md transition duration-150 ease-in-out w-full inline-flex justify-center py-2 px-4 border border-yellow-300 rounded-md bg-white text-sm font-medium text-yellow-500 hover:text-yellow-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out',
                    danger: 'border-transparent bg-danger-500 shadow-md w-full my-auto flex justify-center py-2 px-2 border text-sm font-medium rounded-md transition duration-150 ease-in-out hover:bg-danger-600 hover:border-danger-700 active:bg-danger-700 text-white',
                    dangerInverted:
                        'shadow-md w-full my-auto flex justify-center py-2 px-2 border text-sm font-medium rounded-md transition duration-150 ease-in-out w-full inline-flex justify-center py-2 px-4 border border-danger-300 rounded-md bg-white text-sm font-medium text-danger-500 hover:text-danger-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out',
                },
            },
        }
    },
}
