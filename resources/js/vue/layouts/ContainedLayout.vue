<template>
    <div class="h-screen bg-gray-100 overflow-auto">
        <WFeedbackModal ref="modal">
            <slot name="modal" />
        </WFeedbackModal>
        <slot name="header" />
        <div class="pb-16 pt-16"></div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <div class="px-5 py-6 sm:px-6">
                    <slot name="content" />
                </div>
            </div>
        </main>
    </div>
</template>
