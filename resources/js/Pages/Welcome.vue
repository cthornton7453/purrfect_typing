<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import MainLayout from '@/Layouts/MainLayout.vue';  

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

<template>
    <MainLayout :isAuthenticated="isAuthenticated" :userName="userName"> 
        <Head title="Purrfect Typing Test" />
        <div class="flex h-screen items-center justify-center bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 overflow-hidden">
            <div class="w-full max-w-3xl p-4">
            
                <div class="rounded bg-white p-6 text-center shadow-lg dark:bg-gray-800">
                    <div class="mb-4 text-xl">
                        <span
                            v-for="(word, index) in typingWords"
                            :key="index"
                            :class="{ 'text-green-500': index < currentIndex }"
                        >
                            {{ word }}
                        </span>
                    </div>
                    <input
                        v-model="userInput"
                        @keydown="handleTyping"
                        class="w-full rounded border p-3 text-lg focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                        placeholder="Start typing here..."
                        autofocus
                    />
                </div>
            </div>
        </div>
    </MainLayout>
</template>
