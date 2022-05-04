<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div class="space-y-2 max-w-3xl mx-auto">
                <div>
                    <router-link
                        :to="{ name: 'blocks' }"
                        class="text-primary-200 font-semibold flex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        Back to block library
                    </router-link>
                    <div class="mt-3 w-full bg-white shadow p-5 rounded-lg">
                        <div class="flex justify-between border-b -2 pb-2 mb-4">
                            <div class="text-2xl font-medium secondary-600">
                                Create a new block!
                            </div>
                        </div>
                        <div>
                            <Form @submit="onSubmit">
                                <div class="grid grid-cols-2 gap-5">
                                    <div class="w-full">
                                        <label
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Name*
                                        </label>
                                        <Field
                                            v-model="formData.name"
                                            name="name"
                                            :rules="isRequired"
                                            class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            class="text-red-600 text-sm"
                                        />
                                    </div>
                                    <div class="w-full">
                                        <label
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            File name*
                                        </label>
                                        <Field
                                            v-model="fileName"
                                            name="file_name"
                                            :rules="isRequired"
                                            disabled="true"
                                            class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        <ErrorMessage
                                            name="file_name"
                                            class="text-red-600 text-sm"
                                        />
                                    </div>
                                </div>
                                <WButtonsBase class="w-36 ml-auto mt-3">
                                    <div v-if="!submitting">Create</div>
                                    <div v-else>Creating...</div>
                                </WButtonsBase>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ContainedLayout from '../../layouts/ContainedLayout.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
    },
    data() {
        return {
            name: null,
            submitting: false,
            formData: {
                name: null,
                file_name: null,
            },
        }
    },
    computed: {
        fileName() {
            var WHITE_SPACES = [
                ' ',
                '\n',
                '\r',
                '\t',
                '\f',
                '\v',
                '\u00A0',
                '\u1680',
                '\u180E',
                '\u2000',
                '\u2001',
                '\u2002',
                '\u2003',
                '\u2004',
                '\u2005',
                '\u2006',
                '\u2007',
                '\u2008',
                '\u2009',
                '\u200A',
                '\u2028',
                '\u2029',
                '\u202F',
                '\u205F',
                '\u3000',
            ]

            /**
             * Remove chars from beginning of string.
             */
            function ltrim(str, chars) {
                chars = chars || WHITE_SPACES

                var start = 0,
                    len = str.length,
                    charLen = chars.length,
                    found = true,
                    i,
                    c

                while (found && start < len) {
                    found = false
                    i = -1
                    c = str.charAt(start)

                    while (++i < charLen) {
                        if (c === chars[i]) {
                            found = true
                            start++
                            break
                        }
                    }
                }

                return start >= len ? '' : str.substr(start, len)
            }

            /**
             * Remove chars from end of string.
             */
            function rtrim(str, chars) {
                chars = chars || WHITE_SPACES

                var end = str.length - 1,
                    charLen = chars.length,
                    found = true,
                    i,
                    c

                while (found && end >= 0) {
                    found = false
                    i = -1
                    c = str.charAt(end)

                    while (++i < charLen) {
                        if (c === chars[i]) {
                            found = true
                            end--
                            break
                        }
                    }
                }

                return end >= 0 ? str.substring(0, end + 1) : ''
            }

            /**
             * Remove white-spaces from beginning and end of string.
             */
            function trim(str, chars) {
                chars = chars || WHITE_SPACES
                return ltrim(rtrim(str, chars), chars)
            }

            /**
             * Replaces all accented chars with regular ones
             */
            function replaceAccents(str) {
                // verifies if the String has accents and replace them
                if (str.search(/[\xC0-\xFF]/g) > -1) {
                    str = str
                        .replace(/[\xC0-\xC5]/g, 'A')
                        .replace(/[\xC6]/g, 'AE')
                        .replace(/[\xC7]/g, 'C')
                        .replace(/[\xC8-\xCB]/g, 'E')
                        .replace(/[\xCC-\xCF]/g, 'I')
                        .replace(/[\xD0]/g, 'D')
                        .replace(/[\xD1]/g, 'N')
                        .replace(/[\xD2-\xD6\xD8]/g, 'O')
                        .replace(/[\xD9-\xDC]/g, 'U')
                        .replace(/[\xDD]/g, 'Y')
                        .replace(/[\xDE]/g, 'P')
                        .replace(/[\xE0-\xE5]/g, 'a')
                        .replace(/[\xE6]/g, 'ae')
                        .replace(/[\xE7]/g, 'c')
                        .replace(/[\xE8-\xEB]/g, 'e')
                        .replace(/[\xEC-\xEF]/g, 'i')
                        .replace(/[\xF1]/g, 'n')
                        .replace(/[\xF2-\xF6\xF8]/g, 'o')
                        .replace(/[\xF9-\xFC]/g, 'u')
                        .replace(/[\xFE]/g, 'p')
                        .replace(/[\xFD\xFF]/g, 'y')
                }

                return str
            }

            /**
             * Remove non-word chars.
             */
            function removeNonWord(str) {
                return str.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '')
            }

            function slugify(str, delimeter) {
                if (delimeter == null) {
                    delimeter = '-'
                }

                str = replaceAccents(str)
                str = removeNonWord(str)
                str = trim(str) //should come after removeNonWord
                    .replace(/ +/g, delimeter) //replace spaces with delimeter
                    .toLowerCase()

                return str
            }

            function unCamelCase(str) {
                str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2')
                str = str.toLowerCase() //add space between camelCase text
                return str
            }

            function hyphenate(str) {
                str = unCamelCase(str)
                return slugify(str, '-')
            }

            /**
             * "Safer" String.toLowerCase()
             */
            function lowerCase(str) {
                return str.toLowerCase()
            }

            /**
             * "Safer" String.toUpperCase()
             */
            function upperCase(str) {
                return str.toUpperCase()
            }

            function camelCase(str) {
                str = replaceAccents(str)
                str = removeNonWord(str)
                    .replace(/\-/g, ' ') //convert all hyphens to spaces
                    .replace(/\s[a-z]/g, upperCase) //convert first char of each word to UPPERCASE
                    .replace(/\s+/g, '') //remove spaces
                    .replace(/^[A-Z]/g, lowerCase) //convert first char to lowercase
                return str
            }

            if (this.formData.name) {
                return camelCase(this.formData.name) + '.vue'
            }

            return null
        },
    },

    created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
    },
    methods: {
        isRequired(value) {
            return value ? true : 'This field is required'
        },
        async onSubmit(values) {
            this.submitting = true
            await this.$store
                .dispatch('blocks/createBlockType', values)
                .then((res) => {
                    this.$router.push({ name: 'blocks' })
                })
        },
    },
}
</script>
