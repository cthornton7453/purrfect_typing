<script setup lang="ts">
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const isForgotPassword = ref(false);

const loginForm = useForm({
    email: '',
    password: '',
    remember: false,
});

const forgotPasswordForm = useForm({
    email: '',
});

const registerForm = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submitLogin = () => {
    loginForm.post(route('login'), {
        onFinish: () => {
            loginForm.reset('password');
        },
    });
};

const submitForgotPassword = () => {
    forgotPasswordForm.post(route('password.email'), {
        onFinish: () => {
            forgotPasswordForm.reset();
        },
    });
};

const submitRegister = () => {
    registerForm.post(route('register'), {
        onFinish: () => {
            registerForm.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Login / Register" />
        <div class="flex flex-col lg:flex-row justify-center items-center lg:space-x-12 space-y-8 lg:space-y-0 min-h-screen overflow-y-auto p-4">
            <div class="w-full max-w-md p-8 bg-white shadow-md rounded-md dark:bg-gray-800">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                    {{ isForgotPassword ? 'Forgot Password' : 'Login' }}
                </h2>
                <form @submit.prevent="isForgotPassword ? submitForgotPassword() : submitLogin()">
                    <div v-if="!isForgotPassword">
                        <div>
                            <InputLabel for="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                class="mt-1 block w-full"
                                v-model="loginForm.email"
                                required
                                autocomplete="username"
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

                        <div class="mt-4 block">
                            <label class="flex items-center">
                                <Checkbox name="remember" v-model:checked="loginForm.remember" />
                                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                            </label>
                        </div>
                    </div>

                    <div v-if="isForgotPassword">
                        <div>
                            <InputLabel for="forgot-email" value="Email" />

                            <TextInput
                                id="forgot-email"
                                type="email"
                                class="mt-1 block w-full"
                                v-model="forgotPasswordForm.email"
                                required
                                autofocus
                                autocomplete="username"
                            />

                            <InputError class="mt-2" :message="forgotPasswordForm.errors.email" />
                        </div>
                    </div>

                    <div class="mt-4 flex items-center justify-between">
                        <a
                            href="#"
                            @click.prevent="isForgotPassword = !isForgotPassword"
                            class="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                        >
                            {{ isForgotPassword ? 'Back to Login' : 'Forgot your password?' }}
                        </a>

                        <PrimaryButton
                            class="ms-4"
                            :class="{ 'opacity-25': isForgotPassword ? forgotPasswordForm.processing : loginForm.processing }"
                            :disabled="isForgotPassword ? forgotPasswordForm.processing : loginForm.processing"
                        >
                            {{ isForgotPassword ? 'Email Password Reset Link' : 'Log in' }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <div class="w-full max-w-md p-8 bg-white shadow-md rounded-md dark:bg-gray-800">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Register</h2>

                <form @submit.prevent="submitRegister">
                    <div>
                        <InputLabel for="name" value="Name" />

                        <TextInput
                            id="name"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="registerForm.name"
                            required
                            autocomplete="name"
                        />

                        <InputError class="mt-2" :message="registerForm.errors.name" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            class="mt-1 block w-full"
                            v-model="registerForm.email"
                            required
                            autocomplete="username"
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

                        <InputError class="mt-2" :message="registerForm.errors.password_confirmation" />
                    </div>

                    <div class="mt-4 flex items-center justify-end">
                        <PrimaryButton
                            class="ms-4"
                            :class="{ 'opacity-25': registerForm.processing }"
                            :disabled="registerForm.processing"
                        >
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
