<template>
    <MainLayout>
        <Head title="Purrfect Typing Test" />
        <div
            class="flex h-[80vh] items-center justify-center bg-background transition-colors duration-500"
        >
            <div class="w-full max-w-4xl p-4">
                <!-- Timer Display -->
                <div class="mb-4 text-2xl font-bold text-primary">
                    {{ formatTime(timeRemaining) }}
                </div>

                <div
                    class="rounded bg-background p-6 text-center transition-colors duration-500"
                >
                    <!-- Test Finished State -->
                    <div v-if="isTestFinished" class="space-y-4">
                        <h2 class="text-2xl font-bold text-text">
                            Test Finished!
                        </h2>
                        <button
                            @click="restartTest"
                            class="hover:bg-primary/80 rounded-lg bg-primary px-6 py-2 text-white"
                        >
                            Restart Test
                        </button>
                    </div>

                    <!-- Active Test State -->
                    <template v-else>
                        <!-- Typing Container -->
                        <div
                            ref="typingContainer"
                            class="relative mx-auto h-[120px] max-w-3xl overflow-hidden text-left font-mono text-xl"
                        >
                            <div
                                class="transition-transform duration-200"
                                :style="{
                                    transform: `translateY(${-lineHeight * completedLines}px)`,
                                }"
                            >
                                <div
                                    v-for="(line, lineIndex) in visibleLines"
                                    :key="lineIndex"
                                    class="mb-4 leading-8 tracking-wide"
                                >
                                    <span
                                        v-for="(word, wordIndex) in line"
                                        :key="`${lineIndex}-${wordIndex}`"
                                        class="mr-[1ch]"
                                        :class="{
                                            'text-text/50': !isWordActive(
                                                lineIndex,
                                                wordIndex,
                                            ),
                                            'bg-primary/10': isWordActive(
                                                lineIndex,
                                                wordIndex,
                                            ),
                                        }"
                                    >
                                        <span
                                            v-for="(
                                                char, charIndex
                                            ) in word.split('')"
                                            :key="charIndex"
                                            :class="
                                                getCharacterClass(
                                                    lineIndex,
                                                    wordIndex,
                                                    charIndex,
                                                )
                                            "
                                            >{{ char }}</span
                                        >
                                    </span>
                                </div>
                            </div>

                            <!-- Caret -->
                            <div
                                ref="caret"
                                class="pointer-events-none absolute h-[1.5em] w-[2px] bg-primary"
                                :style="caretStyle"
                            ></div>
                        </div>

                        <!-- Hidden Input -->
                        <input
                            ref="hiddenInput"
                            v-model="userInput"
                            @input="handleInput"
                            @keydown="handleKeydown"
                            class="absolute left-0 top-0 h-0 w-0 opacity-0"
                            autocomplete="off"
                            autocapitalize="off"
                            spellcheck="false"
                        />

                        <!-- Restart Button Below Test -->
                        <button
                            @click="restartTest"
                            class="hover:bg-secondary/80 mt-8 rounded-lg bg-secondary px-6 py-2 text-text"
                        >
                            Restart
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/Layouts/MainLayout.vue';
import { Head } from '@inertiajs/vue3';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

// Constants
const LINE_HEIGHT = 40;
const WORDS_PER_LINE = 8;
const NUMBER_OF_LINES = 3;
const TEST_DURATION = 15;

// Word generation
const wordList = [
    'the',
    'be',
    'to',
    'of',
    'and',
    'a',
    'in',
    'that',
    'have',
    'I',
    'it',
    'for',
    'not',
    'on',
    'with',
    'he',
    'as',
    'you',
    'do',
    'at',
];

// Refs
const typingContainer = ref<HTMLElement | null>(null);
const caret = ref<HTMLElement | null>(null);
const hiddenInput = ref<HTMLInputElement | null>(null);
const activeWordElement = ref<HTMLElement | null>(null);

// State
const words = ref(generateWords());
const userInput = ref('');
const currentLineIndex = ref(0);
const currentWordIndex = ref(0);
const currentCharIndex = ref(0);
const completedLines = ref(0);
const typedHistory = ref<Map<string, { char: string; correct: boolean }>>(
    new Map(),
);
const lineHeight = ref(LINE_HEIGHT);
const timeRemaining = ref(TEST_DURATION);
const isTestFinished = ref(false);
const timerInterval = ref<number | null>(null);
const hasStarted = ref(false);
const caretPosition = ref({ x: 0, y: 0 });

// Computed
const caretStyle = computed(() => ({
    left: `${caretPosition.value.x}px`,
    top: `${caretPosition.value.y}px`,
    transition: 'all 0.1s ease-out',
}));

const visibleLines = computed(() => {
    return words.value.slice(
        completedLines.value,
        completedLines.value + NUMBER_OF_LINES,
    );
});

// Methods
function updateCaretPosition() {
    if (!typingContainer.value) return;

    const wordElements = typingContainer.value.querySelectorAll(
        'span[class*="mr-[1ch]"]',
    );
    const currentWordElement = wordElements[currentWordIndex.value];

    if (currentWordElement) {
        const containerRect = typingContainer.value.getBoundingClientRect();
        const wordRect = currentWordElement.getBoundingClientRect();
        const chars = currentWordElement.querySelectorAll('span');

        let x = wordRect.left - containerRect.left;
        if (
            currentCharIndex.value > 0 &&
            currentCharIndex.value <= chars.length
        ) {
            const charRect =
                chars[currentCharIndex.value - 1].getBoundingClientRect();
            x = charRect.right - containerRect.left;
        }

        caretPosition.value = {
            x,
            y: wordRect.top - containerRect.top,
        };
    }
}

function isWordActive(lineIndex: number, wordIndex: number): boolean {
    return (
        lineIndex === currentLineIndex.value - completedLines.value &&
        wordIndex === currentWordIndex.value
    );
}

// Timer Functions
function startTimer() {
    if (!hasStarted.value) {
        hasStarted.value = true;
        timerInterval.value = window.setInterval(() => {
            if (timeRemaining.value > 0) {
                timeRemaining.value--;
            } else {
                finishTest();
            }
        }, 1000);
    }
}

function finishTest() {
    if (timerInterval.value) {
        clearInterval(timerInterval.value);
    }
    isTestFinished.value = true;
}

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function restartTest() {
    words.value = generateWords();
    userInput.value = '';
    currentLineIndex.value = 0;
    currentWordIndex.value = 0;
    currentCharIndex.value = 0;
    completedLines.value = 0;
    typedHistory.value = new Map();
    timeRemaining.value = TEST_DURATION;
    isTestFinished.value = false;
    hasStarted.value = false;

    if (timerInterval.value) {
        clearInterval(timerInterval.value);
    }

    nextTick(() => {
        hiddenInput.value?.focus();
    });
}

function generateWords() {
    const lines = [];
    for (let i = 0; i < NUMBER_OF_LINES + 2; i++) {
        const line = [];
        for (let j = 0; j < WORDS_PER_LINE; j++) {
            line.push(wordList[Math.floor(Math.random() * wordList.length)]);
        }
        lines.push(line);
    }
    return lines;
}

function getCharacterClass(
    lineIndex: number,
    wordIndex: number,
    charIndex: number,
) {
    const key = `${lineIndex}-${wordIndex}-${charIndex}`;
    const typed = typedHistory.value.get(key);

    if (!typed) {
        return 'text-text/50';
    }
    return typed.correct ? 'text-primary' : 'text-red-500';
}

function handleInput(event: Event) {
    if (!hasStarted.value) {
        startTimer();
    }

    const input = (event.target as HTMLInputElement).value;
    const currentWord =
        words.value[currentLineIndex.value][currentWordIndex.value];
    const currentChar = input[input.length - 1];

    if (currentChar) {
        const isCorrect = currentWord[currentCharIndex.value] === currentChar;
        const key = `${currentLineIndex.value}-${currentWordIndex.value}-${currentCharIndex.value}`;

        typedHistory.value.set(key, {
            char: currentChar,
            correct: isCorrect,
        });

        currentCharIndex.value = input.length;
        nextTick(() => {
            updateCaretPosition();
        });
    }
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ') {
        event.preventDefault();
        if (userInput.value.length > 0) {
            currentWordIndex.value++;
            userInput.value = '';

            if (currentWordIndex.value >= WORDS_PER_LINE) {
                currentWordIndex.value = 0;

                // If we're finishing the second line
                if (currentLineIndex.value === 1) {
                    completedLines.value++;
                    // Stay on line 1 (second line becomes first)

                    // Add new line if needed
                    if (
                        completedLines.value + NUMBER_OF_LINES >=
                        words.value.length
                    ) {
                        words.value.push(...generateWords());
                    }
                } else {
                    // Move to second line normally
                    currentLineIndex.value++;
                }
            }
        }
    }
}

onMounted(() => {
    hiddenInput.value?.focus();
    updateCaretPosition();

    // Add resize observer to update caret position
    const observer = new ResizeObserver(() => {
        updateCaretPosition();
    });

    if (typingContainer.value) {
        observer.observe(typingContainer.value);
    }

    // Cleanup
    onUnmounted(() => {
        observer.disconnect();
        if (timerInterval.value) {
            clearInterval(timerInterval.value);
        }
    });
});
</script>

<style scoped>
.typing-container {
    font-family: monospace;
}
</style>
