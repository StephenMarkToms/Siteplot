<template>
    <div class="h-screen w-full bg-purple-300 pt-24 flex">
        <div class="my-auto mx-auto max-w-2xl">
            <div class="box font-bold italic text-center">API Data</div>
            <div class="my-auto mx-auto text-sm mt-3">
                <div v-if="apiData">
                    {{ apiData }}
                </div>
                <div v-else>Loading API Data</div>
                <div class="box font-bold italic text-center mt-5">
                    Widget Data
                </div>
                <pre>
            {{ widgetData }}
  		</pre
                >
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            widgetData: null,
            apiData: null,
        }
    },
    mounted() {
        console.log('hi')
    },
}
</script>
