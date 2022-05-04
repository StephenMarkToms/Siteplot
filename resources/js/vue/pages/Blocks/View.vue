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
                        type="blank"
                        @click="
                            $router.push({
                                name: 'blocks-edit',
                                params: { id: block.id },
                            })
                        "
                    >
                        <div class="text-sm text-gray-600 my-auto">edit</div>
                    </WButtonsBase>
                </div>
                <Viewer class="rounded-b-lg shadow-lg">
                    <div>
                        {{ block }}
                    </div>
                </Viewer>
            </div>
        </template>
    </ContainedLayout>
</template>

<script>
import ContainedLayout from '../../layouts/ContainedLayout.vue'
import Viewer from '../../components/viewers/ResponsiveWeb.vue'

export default {
    name: 'Dashboard',
    components: {
        ContainedLayout,
        Viewer,
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
