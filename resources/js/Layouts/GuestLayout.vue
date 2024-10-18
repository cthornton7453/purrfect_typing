<template>
    <div class="flex flex-col min-h-screen">
      <AppBar :isAuthenticated="false" :hideAuthButtons="hideAuthButtons" />
  
      <div
        class="flex-grow flex flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900 lg:overflow-hidden overflow-auto"
      >
        <div
          class="mt-6 w-full px-6 py-4 sm:max-w-2xl lg:max-w-4xl sm:rounded-lg bg-white dark:bg-gray-900"
        >
          <slot />
        </div>
      </div>
  
      <Footer class="footer" />
    </div>
</template>

<script setup lang="ts">
import AppBar from '@/Components/AppBar.vue';
import Footer from '@/Components/AppFooter.vue';

defineProps({
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
