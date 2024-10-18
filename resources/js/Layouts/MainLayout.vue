<!-- resources/js/Layouts/MainLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <AppBar :isAuthenticated="isAuthenticated" :userName="userName" />
    <main class="flex-grow pt-16">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/Components/AppBar.vue';
import Footer from '@/Components/AppFooter.vue';

defineProps<{
  isAuthenticated: boolean;
  userName?: string;
}>();
</script>
