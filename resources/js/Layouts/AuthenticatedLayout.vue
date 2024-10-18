<script setup lang="ts">
import AppBar from '@/Components/AppBar.vue';
import { usePage } from '@inertiajs/vue3';

const { auth } = usePage().props;
</script>

<template>
    <div>
        <!-- Persistent App Bar -->
        <AppBar :isAuthenticated="!!auth.user" :userName="auth.user?.name" />

        <!-- Main Content -->
        <main>
            <slot />
        </main>
    </div>
</template>
