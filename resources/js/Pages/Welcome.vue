<!-- resources/js/Pages/Welcome.vue -->

<template>
  <MainLayout :isAuthenticated="isAuthenticated" :userName="userName">
    <Head title="Purrfect Typing Test" />
    <div class="flex h-[80vh] items-center justify-center bg-background text-text/50 transition-colors duration-500">
      <div class="w-full max-w-3xl p-4">
        <div class="rounded bg-background p-6 text-center  transition-colors duration-500">
          <div class="mb-4 text-xl">
            <span
              v-for="(word, index) in typingWords"
              :key="index"
              :class="{ 'text-primary': index < currentIndex }"
            >
              {{ word }}
              <span v-if="index < typingWords.length - 1"> </span>
            </span>
          </div>
          <input
            v-model="userInput"
            @keydown="handleTyping"
            class="w-full rounded border border-secondary p-3 text-lg focus:ring-2 focus:ring-primary transition-colors duration-500 bg-background text-text placeholder-text focus:outline-none"
            placeholder="Start typing here..."
            autofocus
          />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import MainLayout from '@/Layouts/MainLayout.vue';

// Define Props
defineProps<{
  isAuthenticated: boolean;
  userName?: string;
}>();

const typingWords = ref([
  'hello',
  'world',
  'this',
  'is',
  'a',
  'typing',
  'test',
]);
const userInput = ref('');
const currentIndex = ref(0);

function handleTyping(event: KeyboardEvent) {
  const key = event.key;

  if (key === ' ') {
    if (userInput.value.trim() === typingWords.value[currentIndex.value]) {
      currentIndex.value += 1;
      userInput.value = '';
    }
  }
}
</script>

<style scoped>
/* Custom styles if necessary */
</style>
