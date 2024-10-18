<template>
    <div>
      <!-- Persistent App Bar -->
      <AppBar :isAuthenticated="isAuthenticated" :userName="userName" />
  
      <!-- Main Content -->
      <main class="pt-16"> <!-- Add padding-top to push content below the fixed app bar -->
        <slot />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import AppBar from '@/Components/AppBar.vue';
  
  defineProps<{
    isAuthenticated: boolean;
    userName?: string;
  }>();
  </script>
  