<template>
    <MainLayout>
        <Head title="Purrfect Typing Test" />
        <div
            class="text-text/50 flex h-[80vh] items-center justify-center bg-background transition-colors duration-500"
        >
            <div class="w-full max-w-3xl p-4">
                <div
                    class="rounded bg-background p-6 text-center transition-colors duration-500"
                >
                    <div class="mb-4 text-xl">
                        <span
                            v-for="(word, index) in typingWords"
                            :key="index"
                            class="transition-colors duration-500"
                            :class="{
                                'text-primary': index < currentIndex,
                                'text-text': index >= currentIndex,
                            }"
                        >
                            {{ word }}
                            <span v-if="index < typingWords.length - 1"> </span>
                        </span>
                    </div>
                    <input
                        v-model="userInput"
                        @keydown="handleTyping"
                        class="w-full rounded border border-secondary bg-background p-3 text-lg text-text placeholder-text transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Start typing here..."
                        autofocus
                    />
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/Layouts/MainLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

// Define typingWords and userInput
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

// Handle user typing logic
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
