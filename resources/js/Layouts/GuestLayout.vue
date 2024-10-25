<template>
    <div class="flex min-h-screen flex-col">
        <!-- AppBar Component -->
        <AppBar />

        <!-- Main Content Area -->
        <div
            class="flex flex-grow flex-col items-center overflow-auto bg-background pt-6 text-text transition-colors duration-500 sm:justify-center sm:pt-0 lg:overflow-hidden lg:pt-20"
        >
            <div
                class="mt-6 w-full bg-background px-6 py-4 text-text transition-colors duration-500 sm:max-w-2xl sm:rounded-lg lg:max-w-4xl"
            >
                <slot />
            </div>
        </div>

        <!-- Footer Component -->
        <Footer class="footer" />
    </div>
</template>

<script setup lang="ts">
import AppBar from '@/Components/AppBar.vue';
import Footer from '@/Components/AppFooter.vue';
</script>

<style scoped>
.footer {
    position: sticky;
    bottom: 0;
}

@media (max-width: 1024px) {
    .footer {
        position: static;
    }
}
</style>
