<!-- resources/js/Components/ThemeToggle.vue -->

<template>
    <div class="flex items-center">
      <label for="theme-toggle" class="mr-2">Dark Mode</label>
      <input
        id="theme-toggle"
        type="checkbox"
        :checked="isDark"
        @change="toggleTheme"
        class="toggle-checkbox"
        aria-label="Toggle Dark Mode"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useTheme } from '@/Composables/useTheme';
  
  const { currentTheme, setTheme } = useTheme();
  
  // Determine if the current theme is dark
  const isDark = computed(() => currentTheme.value.name === 'dark');
  
  // Toggle theme between light and dark
  function toggleTheme() {
    const newTheme = isDark.value ? 'light' : 'dark';
    setTheme(newTheme);
  }
  </script>
  
  <style scoped>
  /* Toggle Switch Styles */
  .toggle-checkbox {
    width: 40px;
    height: 20px;
    appearance: none;
    background-color: #ccc;
    border-radius: 9999px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .toggle-checkbox:checked {
    background-color: #4f46e5;
  }
  
  .toggle-checkbox::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  
  .toggle-checkbox:checked::before {
    transform: translateX(20px);
  }
  </style>
  