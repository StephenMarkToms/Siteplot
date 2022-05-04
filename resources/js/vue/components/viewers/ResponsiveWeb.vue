<template>
    <div class="bg-white p-4 rounded-lg shadow-lg">
        <div class="w-32 ml-auto pb-3 flex space-x-3">
            <WButtonsBase type="grayRounded">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
            </WButtonsBase>
            <WButtonsBase type="grayRounded">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    class="h-5 w-5"
                    fill="currentColor"
                >
                    <path
                        d="M128 96h384v256h64v-272c0-26.38-21.62-48-48-48h-416c-26.38 0-48 21.62-48 48V352h64V96zM624 383.1h-608c-8.75 0-16 7.25-16 16v16c0 35.25 28.75 64 64 64h512c35.25 0 64-28.75 64-64v-16C640 391.2 632.8 383.1 624 383.1z"
                    />
                </svg>
            </WButtonsBase>
            <WButtonsBase type="grayRounded">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            </WButtonsBase>
        </div>
        <div class="ring-1 rounded-lg ring-gray-200 p-4">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            mode: 'desktop',
        }
    },
}
</script>
