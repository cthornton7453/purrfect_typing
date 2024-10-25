<!-- resources/js/Components/AppFooter.vue -->

<template>
    <footer
        class="fixed bottom-0 w-full bg-background py-4 text-sm text-text transition-colors duration-500"
    >
        <div class="container mx-auto flex items-center justify-between px-4">
            <!-- Left Section: Links -->
            <div class="flex items-center space-x-4">
                <button
                    @click="showContactDialog = true"
                    class="hover-effect flex items-center"
                >
                    <i class="fas fa-envelope"></i>
                    <span class="ml-2">Contact</span>
                </button>
                <!-- <span class="border-l border-gray-500 h-4"></span> -->
                <button
                    @click="showSupportDialog = true"
                    class="hover-effect flex items-center"
                >
                    <i class="fas fa-life-ring"></i>
                    <span class="ml-2">Support</span>
                </button>
                <span class="h-4 border-l border-gray-500"></span>
                <a
                    href="https://github.com/cthornton7453/purrfect_typing"
                    target="_blank"
                    class="hover-effect flex items-center"
                >
                    <i class="fab fa-github"></i>
                    <span class="ml-2">GitHub</span>
                </a>
            </div>

            <!-- Center Section: Theme Toggle -->
            <div class="flex items-center">
                <ThemeToggle />
            </div>

            <!-- Right Section: Copyright -->
            <div class="text-xs">&copy; 2024 Purrfect Typing</div>

            <!-- Dialogs -->
            <Dialog
                v-if="showContactDialog"
                @close="showContactDialog = false"
                title="Contact Us"
            >
                <p>
                    You can reach us at contact@example.com or by phone at (123)
                    456-7890.
                </p>
            </Dialog>
            <Dialog
                v-if="showSupportDialog"
                @close="showSupportDialog = false"
                title="Support"
            >
                <p>
                    For support, visit our Help Center or contact our support
                    team at support@example.com.
                </p>
            </Dialog>
        </div>
    </footer>
</template>

<script setup lang="ts">
import Dialog from '@/Components/AppDialog.vue';
import ThemeToggle from '@/Components/ThemeToggle.vue'; // Import ThemeToggle
import { ref } from 'vue';

const showContactDialog = ref(false);
const showSupportDialog = ref(false);
</script>

<style scoped>
.hover-effect {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: inherit;
    transition:
        color 0.3s ease,
        transform 0.3s ease;
}

.hover-effect:hover {
    color: #6366f1;
}

.hover-effect i {
    transition: transform 0.3s ease;
}

.hover-effect:hover i {
    transform: scale(1.2);
}

.hover-effect:active {
    color: #6366f0;
}
</style>
