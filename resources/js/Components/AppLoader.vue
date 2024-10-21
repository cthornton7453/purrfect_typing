<template>
    <div class="fixed inset-0 flex items-center justify-center bg-opacity-100 bg-background dark:bg-opacity-100 dark:bg-background z-50">
      <div class="flex items-center bg-background dark:bg-background p-4 rounded-md space-x-4">
        <span class="whitespace-nowrap text-text text-lg">
          {{ message }}
        </span>
        <div class="w-64 bg-gray-300 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div class="loading-bar h-2 rounded-full bg-primary dark:bg-primary"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: {
      type: String,
      default: 'Loading...'
    }
  });
  </script>
  
  <style scoped>
  .loading-bar {
    width: 0;
    animation: loading 500ms ease-in-out forwards;
  }
  
  @keyframes loading {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
  
  .fixed {
    position: fixed;
  }
  </style>
  