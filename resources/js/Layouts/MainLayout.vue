<template>
    <div class="flex min-h-screen flex-col transition-colors duration-500">
        <!-- AppBar Component -->
        <AppBar />

        <!-- Main Content -->
        <main
            class="flex-grow bg-background pt-16 text-text transition-colors duration-500"
        >
            <slot></slot>
        </main>

        <!-- Footer -->
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppBar from '@/Components/AppBar.vue';
import AppFooter from '@/Components/AppFooter.vue';
import { useTheme } from '@/Composables/useTheme';
import { watch } from 'vue';

const { currentTheme } = useTheme();

// Watch for theme changes and update the data-theme attribute
watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme.name);
});
</script>

<style>
/* Add any global styles here */
</style>
