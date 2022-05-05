<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div v-if="block">
                <div
                    class="pt-3 px-5 ring-1 ring-gray-200 bg-gray-100 rounded-t-lg shadow-lg flex justify-between"
                >
                    <div class="my-auto">
                        <div class="text-sm font-medium">{{ block.name }}</div>
                        <div class="text-xs text-gray-400">1.0.0</div>
                    </div>
                    <WTabsHorizontal
                        v-model="view"
                        class="w-1/4 my-auto"
                        :tabs="['meta', 'code', 'data', 'preview']"
                    />
                    <div class="my-auto">
                        <WButtonsBase class="w-32">Save</WButtonsBase>
                    </div>
                </div>
                <div
                    class="rounded-b-lg shadow-lg overflow-hidden bg-white py-8"
                >
                    <Viewer v-if="view === 'preview'">
                        <div>
                            <ComponentPreview :value="code" />
                        </div>
                    </Viewer>
                    <div :class="['bg-white p-4', view !== 'meta' && 'hidden']">
                        <BlockForm
                            class="max-w-screen-md mx-auto"
                            :block="{ ...block }"
                        />
                    </div>
                    <div v-if="view === 'code'" class="p-4">
                        <CodeEditor
                            v-model="code"
                            z_index="0"
                            :languages="[
                                ['html', 'HTML'],
                                ['javascript', 'JS'],
                                ['css', 'CSS'],
                            ]"
                            :autofocus="true"
                            :wrap_code="true"
                            :language_selector="true"
                            theme="light"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ComponentPreview from '../../components/viewers/ComponentPreview/ComponentPreview'
import CodeEditor from 'simple-code-editor'
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import Viewer from '../../components/viewers/ResponsiveWeb.vue'
import BlockForm from '../../components/siteplot/forms/BlockType.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        Viewer,
        BlockForm,
        CodeEditor,
        ComponentPreview,
    },
    data() {
        return {
            block: null,
            submitting: false,
            view: 'preview',
            code: `<template>
		<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white">
  <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
      <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Take control of your team.</p>
      <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p>
    </div>
  </div>
</div>

</template>

<script>
    module.exports = {
        data() {
            return {
                widgetData: null
            }
        },
        mounted() {
          	//Call in GSAP animations similar to something like this!
            
        }
    }
<\/script>
<style>
    .body{
        background-color: red;
    }
<\/style>
`,
        }
    },
    created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
        this.$store
            .dispatch('blocks/getBlockTypeById', this.$route.params.id)
            .then((block) => {
                this.block = block
            })
    },
    methods: {
        isRequired(value) {
            return value ? true : 'This field is required'
        },
    },
}
</script>
