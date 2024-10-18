<!-- resources/js/Components/AppDialog.vue -->
<template>
    <!-- Modal backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <!-- Dialog box -->
      <div class="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <!-- Dialog Header -->
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <!-- Close button -->
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
  
        <!-- Dialog Content -->
        <div class="mt-4">
          <slot /> <!-- This is where the dialog's content goes -->
        </div>
  
        <!-- Optional Footer for actions (e.g., close or submit buttons) -->
        <div v-if="$slots.footer" class="mt-4 flex justify-end space-x-2">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  /* Add additional styles as needed */
  </style>
  