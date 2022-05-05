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
import ComponentPreview from '../../components/viewers/ComponentPreview/ComponentPreview.vue'
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
            view: 'code',
            code: `<template>
		<!-- That's right! You Tailwind is brought in natively for you already :) -->
    <div>
      	<div class="text-2xl text-center font-bold text-indigo-500">  
      		My New Block!
  			</div>
        <br>
      	<div class="text-center">
        		<!-- All data from the Content tab will appear in the widgetData Object -->
            {{ widgetData }}
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
            const gsap = this.$gsap
            gsap.from(this.$el, 5, {
                alpha: 0,
                ease: 'Power4.easeOut'
            })
        }
    }
<\/script>`,
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
