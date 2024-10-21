<script setup lang="ts">
import Loader from '@/Components/AppLoader.vue';
import ForgotPasswordForm from '@/Components/Forms/ForgotPasswordForm.vue';
import LoginForm from '@/Components/Forms/LoginForm.vue';
import RegisterForm from '@/Components/Forms/RegisterForm.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const isForgotPassword = ref(false);
const showLoader = ref(false);
</script>

<template>
    <GuestLayout>
        <Head title="Login / Register" />

        <!-- Loader Overlay -->
        <Loader v-if="showLoader" message="Processing..." />

        <div
            v-else
            class="flex min-h-screen flex-col items-start justify-center space-y-8 overflow-y-auto p-4 lg:flex-row lg:space-x-12 lg:space-y-0"
        >
            <!-- Login / Forgot Password Section -->
            <div
                class="w-full max-w-md rounded-md bg-background p-8 transition-colors duration-500"
            >
                <h2 class="mb-6 text-xl font-semibold text-text">
                    {{ isForgotPassword ? 'Forgot Password' : 'Login' }}
                </h2>

                <!-- Conditional Login/Forgot Password Forms -->
                <LoginForm v-if="!isForgotPassword">
                    <template #forgot-password-link>
                        <a
                            href="#"
                            @click.prevent="isForgotPassword = true"
                            class="hover-effect text-sm"
                        >
                            Forgot your password?
                        </a>
                    </template>
                </LoginForm>

                <ForgotPasswordForm v-else>
                    <template #back-to-login-link>
                        <a
                            href="#"
                            @click.prevent="isForgotPassword = false"
                            class="hover-effect text-sm"
                        >
                            Back to Login
                        </a>
                    </template>
                </ForgotPasswordForm>
            </div>

            <!-- Register Section -->
            <div
                class="w-full max-w-md rounded-md bg-background p-8 transition-colors duration-500"
            >
                <h2 class="mb-6 text-xl font-semibold text-text">Register</h2>
                <RegisterForm />
            </div>
        </div>
    </GuestLayout>
</template>
