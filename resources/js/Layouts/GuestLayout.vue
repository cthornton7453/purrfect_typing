<!-- resources/js/Layouts/GuestLayout.vue -->

<template>
  <div class="flex flex-col min-h-screen">
    <!-- AppBar Component -->
    <AppBar :isAuthenticated="false" :hideAuthButtons="hideAuthButtons" />

    <!-- Main Content Area -->
    <div
      class="flex-grow flex flex-col items-center bg-background text-text pt-6 lg:pt-20 sm:justify-center sm:pt-0 transition-colors duration-500 lg:overflow-hidden overflow-auto"
    >
      <div
        class="mt-6 w-full px-6 py-4 sm:max-w-2xl lg:max-w-4xl sm:rounded-lg bg-background text-text transition-colors duration-500"
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

const props = defineProps({
  hideAuthButtons: {
    type: Boolean,
    default: false,
  },
});
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
