<template>
    <nav class="fixed top-0 left-0 w-full z-10 border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between items-center">
                <div class="flex">
                    <Link href="/" class="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Purrfect Typing
                    </Link>
                </div>

                <div class="relative flex items-center">
                    <div v-if="loggingOut" class="fixed inset-0 flex items-center justify-center bg-opacity-100 bg-white dark:bg-opacity-100 dark:bg-gray-800 z-20">
                        <div class="flex items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg space-x-4"> 
                            <span class="whitespace-nowrap text-gray-800 dark:text-gray-200 text-lg">Logging out...</span>
                            <div class="w-64 bg-gray-300 rounded-full h-2 dark:bg-gray-700 overflow-hidden"> 
                                <div class="loading-bar h-2 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Authenticated User -->
                    <template v-if="isAuthenticated">
                        <div class="relative">
                            <button @click="toggleDropdown" class="hover-effect flex items-center">
                                <img src="/images/cat.svg" alt="Cat Icon" class="h-6 w-6" />
                                <span class="ml-2 text-gray-800 dark:text-gray-200">{{ userName }}</span>
                            </button>
                            <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                <div class="py-1">
                                    <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Unauthenticated - Login Icon -->
                    <template v-else>
                        <Link href="/login" class="hover-effect flex items-center">
                            <img src="/images/cat.svg" alt="Cat Icon" class="h-6 w-6" />
                        </Link>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';

defineProps({
    isAuthenticated: Boolean,
    userName: String,
});

const showDropdown = ref(false);
const loggingOut = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const handleLogout = () => {
    showDropdown.value = false;
    loggingOut.value = true;

    setTimeout(() => {
        router.post('/logout', {}, {
            onFinish: () => {
                loggingOut.value = false; 
            },
        });
    }, 2000); 
};
</script>

<style scoped>
/* Hover effect for buttons and links */
.hover-effect {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: color 0.3s ease, transform 0.3s ease;
}

.hover-effect:hover {
  color: #f39c12; 
}

.hover-effect img {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.hover-effect:hover img {
  transform: scale(1.2); 
  filter: brightness(1.5); 
}

.hover-effect span {
  transition: color 0.3s ease;
}

.hover-effect:hover span {
  color: #f39c12; /
}

.hover-effect:active {
  color: #d35400; 
}

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
</style>
