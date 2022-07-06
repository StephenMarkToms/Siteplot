<template>
    <Form @submit="onSubmit">
        <div class="grid grid-cols-2 gap-5">
            <div class="w-full">
                <label class="block text-sm font-medium text-gray-700">
                    Name*
                </label>
                <Field
                    v-model="formData.name"
                    name="name"
                    :rules="isRequired"
                    class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <ErrorMessage name="name" class="text-red-600 text-sm" />
            </div>
            <div class="w-full">
                <label class="block text-sm font-medium text-gray-700">
                    File name*
                </label>
                <Field
                    v-model="fileName"
                    name="file_name"
                    :rules="isRequired"
                    disabled="true"
                    class="h-10 text-primary-700 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-primary-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <ErrorMessage name="file_name" class="text-red-600 text-sm" />
            </div>
            <div v-if="repositories && repositories.length > 0" class="w-full">
                <label class="block text-sm font-medium text-gray-700">
                    Repository
                </label>
                <Multiselect
                    v-model="formData.repositories"
                    :options="repositoryOptions"
                    mode="multiple"
                    :searchable="true"
                    :close-on-select="false"
                />
                <ErrorMessage
                    name="repository_id"
                    class="text-red-600 text-sm"
                />
            </div>
        </div>
        <WButtonsBase v-if="!block" class="w-36 ml-auto mt-3">
            <div v-if="!submitting">Create</div>
            <div v-else>Creating...</div>
        </WButtonsBase>
    </Form>
</template>
<script>
import Multiselect from '@vueform/multiselect'

export default {
    components: {
        Multiselect,
    },
    props: {
        block: {
            type: Object,
            required: false,
            default: null,
        },
    },
    emits: ['onSubmit'],
    data() {
        return {
            name: null,
            submitting: false,
            formData: {
                name: null,
                file_name: null,
                repositories: null,
            },
            repositories: null,
            repositorySearch: '',
        }
    },
    computed: {
        repositoryOptions() {
            return this.repositories.map((el) => {
                return {
                    label: el.name,
                    value: Number(el.id),
                }
            })
        },
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
    watch: {
        fileName(newVal) {
            this.formData.file_name = newVal
        },
    },
    async created() {
        if (this.block) {
            this.formData = this.block
        }
        await this.$store
            .dispatch('repositories/searchRepositories', {
                name: this.repositorySearch,
                amount: 6,
            })
            .then((repositories) => {
                this.repositories = repositories
            })
    },
    methods: {
        isRequired(value) {
            return value ? true : 'This field is required'
        },
        onSubmit(values) {
            this.submitting = true
            let dataValues = { ...values }
            if (this.formData.repositories && this.submitting) {
                dataValues = {
                    ...values,
                    repositories: {
                        sync: this.formData.repositories,
                    },
                }
            }
            this.$emit('onSubmit', dataValues)
            this.submitting = false
        },
    },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
