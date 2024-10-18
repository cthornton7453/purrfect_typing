<template>
    <div>

      <AppBar :isAuthenticated="isAuthenticated" :userName="userName" />
  
      <!-- Main Content -->
      <main class="pt-16"> 
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
  