<!-- resources/js/Layouts/MainLayout.vue -->

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-500">
    <!-- AppBar Component -->
    <AppBar :isAuthenticated="isAuthenticated" :userName="userName" />

    <!-- Main Content -->
    <main class="flex-grow bg-background text-text transition-colors duration-500 pt-16">
      <slot></slot>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import AppBar from '@/Components/AppBar.vue';
import AppFooter from '@/Components/AppFooter.vue';
import { useTheme } from '@/Composables/useTheme';

// Define the props that MainLayout expects to receive
const props = defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
  userName: {
    type: String,
    required: false,
    default: '',
  },
});

// Use the theme composable
const { currentTheme } = useTheme();

// Watch for theme changes and update the data-theme attribute
watch(currentTheme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme.name);
});
</script>

<style>
/* Add any global styles here */
</style>
