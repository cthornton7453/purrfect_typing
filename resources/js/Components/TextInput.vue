<script setup lang="ts">
import { onMounted, ref } from 'vue';

const model = defineModel<string>({ required: true });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
    <input
        class="rounded-md shadow-sm focus:ring focus:border
               bg-theme-background text-theme-primary border-theme-primary"
        v-model="model"
        ref="input"
    />
</template>

<style scoped>
</style>
