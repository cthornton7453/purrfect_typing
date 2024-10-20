<template>
    <nav class="fixed top-0 left-0 w-full z-10 border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between items-center">
                <div class="flex">
                    <Link href="/" class="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Purrfect Typing
                    </Link>
                </div>

                <!-- User Icon Component -->
                <AppUserIcon :isAuthenticated="isAuthenticated" :userName="userName" />
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppUserIcon from '@/Components/User/AppUserIcon.vue';  

defineProps({
    isAuthenticated: Boolean,
    userName: String,
});
</script>
