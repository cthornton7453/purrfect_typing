<template>
  <nav class="fixed top-0 left-0 w-full z-10 bg-background text-text transition-colors duration-500">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <div class="flex">
          <Link href="/" class="text-xl font-bold text-primary">
            Purrfect Typing
          </Link>
        </div>

        <div class="flex items-center space-x-4">
          <!-- User Icon -->
          <AppUserIcon :isAuthenticated="isAuthenticated" :userName="userName" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Link } from '@inertiajs/vue3';
import AppUserIcon from '@/Components/User/AppUserIcon.vue';  

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
</script>

<style scoped>
/* Add any AppBar-specific styles here if necessary */
</style>
