<script setup lang="ts">
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const registerForm = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const showLoader = ref(false);

const submitRegister = () => {
    showLoader.value = true;
    registerForm.post(route('register'), {
        onFinish: () => {
            registerForm.reset('username', 'password', 'password_confirmation');
            showLoader.value = false;
        },
    });
};
</script>

<template>
    <form @submit.prevent="submitRegister">
        <div>
            <InputLabel for="username" value="Username" />
            <TextInput
                id="username"
                type="text"
                class="mt-1 block w-full"
                v-model="registerForm.username"
                required
                autocomplete="username"
            />
            <InputError class="mt-2" :message="registerForm.errors.username" />
        </div>

        <div class="mt-4">
            <InputLabel for="email" value="Email" />
            <TextInput
                id="email"
                type="email"
                class="mt-1 block w-full"
                v-model="registerForm.email"
                required
                autocomplete="email"
            />
            <InputError class="mt-2" :message="registerForm.errors.email" />
        </div>

        <div class="mt-4">
            <InputLabel for="password" value="Password" />
            <TextInput
                id="password"
                type="password"
                class="mt-1 block w-full"
                v-model="registerForm.password"
                required
                autocomplete="new-password"
            />
            <InputError class="mt-2" :message="registerForm.errors.password" />
        </div>

        <div class="mt-4">
            <InputLabel for="password_confirmation" value="Confirm Password" />
            <TextInput
                id="password_confirmation"
                type="password"
                class="mt-1 block w-full"
                v-model="registerForm.password_confirmation"
                required
                autocomplete="new-password"
            />
            <InputError
                class="mt-2"
                :message="registerForm.errors.password_confirmation"
            />
        </div>

        <div class="mt-4 flex items-center justify-end">
            <PrimaryButton :disabled="registerForm.processing"
                >Register</PrimaryButton
            >
        </div>
    </form>
</template>
