<template>
    <div
        class="flex space-x-6 rounded-lg cursor-pointer hover:bg-gray-100 p-2"
        @click="
            $router.push({ name: 'site-settings', params: { id: website.id } })
        "
        @mouseenter="showActions = true"
        @mouseleave="showActions = false"
    >
        <div class="w-24 h-20 rounded-lg bg-gray-200"></div>
        <div class="my-auto flex w-full justify-between">
            <div>
                <div class="flex">
                    <div class="font-bold mr-2">
                        {{ website.name }}
                    </div>
                    <div v-if="showActions" class="flex space-x-2">
                        <div
                            class="text-gray-400 hover:text-primary-500"
                            @click.stop="
                                $router.push({
                                    name: 'site-settings',
                                    params: { id: website.id },
                                })
                            "
                        >
                            settings
                        </div>
                        <div
                            class="text-gray-400 hover:text-primary-500"
                            @click.stop="
                                $router.push({
                                    name: 'edit-site',
                                    params: { id: website.id },
                                })
                            "
                        >
                            edit
                        </div>
                        <div
                            class="text-gray-400 hover:text-primary-500"
                            @click.stop="deleteSite()"
                        >
                            delete
                        </div>
                    </div>
                </div>
                <div class="text-sm text-gray-500">
                    {{ website.domain }}
                </div>
            </div>

            <div class="justify-end flex">
                <div class="w-48 text-right">
                    <div class="font-medium">
                        {{ $dayjs(website.created_at).format('MMM DD, YYYY') }}
                    </div>
                    <div class="text-sm text-gray-500">
                        {{ $dayjs(website.updated_at).format('MMM DD, YYYY') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        website: {
            type: Object,
            required: true,
        },
    },
    emits: ['delete'],
    data: function () {
        return {
            showActions: false,
        }
    },
    methods: {
        deleteSite(event) {
            this.$emit('delete', this.website)
        },
    },
}
</script>

<style></style>
