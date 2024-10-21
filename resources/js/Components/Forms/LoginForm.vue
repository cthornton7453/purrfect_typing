<script setup lang="ts">
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const loginForm = useForm({
    email: '',
    password: '',
    remember: false,
});

const showLoader = ref(false);

const submitLogin = () => {
    showLoader.value = true;
    loginForm.post(route('login'), {
        onFinish: () => {
            loginForm.reset('password');
            showLoader.value = false;
        },
    });
};
</script>

<template>
    <form @submit.prevent="submitLogin">
        <div>
            <InputLabel for="email" value="Email" />
            <TextInput
                id="email"
                type="email"
                class="mt-1 block w-full"
                v-model="loginForm.email"
                required
                autocomplete="email"
            />
            <InputError class="mt-2" :message="loginForm.errors.email" />
        </div>

        <div class="mt-4">
            <InputLabel for="password" value="Password" />
            <TextInput
                id="password"
                type="password"
                class="mt-1 block w-full"
                v-model="loginForm.password"
                required
                autocomplete="current-password"
            />
            <InputError class="mt-2" :message="loginForm.errors.password" />
        </div>

        <div class="mt-4 flex items-center">
            <Checkbox name="remember" v-model:checked="loginForm.remember" />
            <span class="ms-2 text-sm">Remember me</span>
        </div>

        <div class="mt-4 flex items-center justify-between">
            <slot name="forgot-password-link"></slot>
            <PrimaryButton :disabled="loginForm.processing"
                >Log in</PrimaryButton
            >
        </div>
    </form>
</template>
