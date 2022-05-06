<template>
    <ContainedLayout>
        <template #header>
            <PrimaryNav />
        </template>
        <template #content>
            <div v-if="block">
                <div
                    class="py-3 px-5 ring-1 ring-gray-200 bg-gray-100 rounded-t-lg shadow-lg flex justify-between"
                >
                    <div>
                        <div class="text-sm font-medium">{{ block.name }}</div>
                        <div class="text-xs text-gray-400">1.0.0</div>
                    </div>
                    <WButtonsBase
                        class="w-32"
                        @click="
                            $router.push({
                                name: 'blocks-edit',
                                params: { id: block.id },
                            })
                        "
                    >
                        Edit
                    </WButtonsBase>
                </div>
                <Viewer class="rounded-b-lg shadow-lg">
                    <ComponentPreview :value="block.component" />
                </Viewer>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import Viewer from '../../components/viewers/ResponsiveWeb.vue'
import ComponentPreview from '../../components/viewers/ComponentPreview/ComponentPreview'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        Viewer,
        ComponentPreview,
    },
    data() {
        return {
            block: null,
            submitting: false,
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
