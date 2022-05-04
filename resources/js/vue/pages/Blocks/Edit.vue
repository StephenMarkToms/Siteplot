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
                            {{ block }}
                        </div>
                    </Viewer>
                    <div :class="['bg-white p-4', view !== 'meta' && 'hidden']">
                        <BlockForm
                            class="max-w-screen-md mx-auto"
                            :block="{ ...block }"
                        />
                    </div>
                </div>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import Viewer from '../../components/viewers/ResponsiveWeb.vue'
import BlockForm from '../../components/siteplot/forms/BlockType.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        Viewer,
        BlockForm,
    },
    data() {
        return {
            block: null,
            submitting: false,
            view: 'meta',
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
