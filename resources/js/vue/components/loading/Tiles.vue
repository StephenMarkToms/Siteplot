<template>
    <div class="grid grid-cols-4 gap-6 p-3">
        <Tile
            v-for="index in tiles"
            :key="index"
            :class="['animate-pulse']"
            :style="{
                animationFillMode: 'backwards',
                animationDelay: `${String(index * 50)}ms`,
            }"
        />
    </div>
</template>
<script>
import Tile from '../siteplot/blocks/BlockTile.vue'
export default {
    components: {
        Tile,
    },
    props: {
        tiles: {
            required: false,
            type: Number,
            default: 12,
        },
    },
}
</script>
