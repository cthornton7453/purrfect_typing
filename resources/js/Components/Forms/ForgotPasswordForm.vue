<script setup lang="ts">
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const forgotPasswordForm = useForm({
    email: '',
});

const showLoader = ref(false);

const submitForgotPassword = () => {
    showLoader.value = true;
    forgotPasswordForm.post(route('password.email'), {
        onFinish: () => {
            forgotPasswordForm.reset();
            showLoader.value = false;
        },
    });
};
</script>

<template>
    <form @submit.prevent="submitForgotPassword">
        <div>
            <InputLabel for="forgot-email" value="Email" />
            <TextInput
                id="forgot-email"
                type="email"
                class="mt-1 block w-full"
                v-model="forgotPasswordForm.email"
                required
                autocomplete="username"
            />
            <InputError
                class="mt-2"
                :message="forgotPasswordForm.errors.email"
            />
        </div>

        <div class="mt-4 flex items-center justify-between">
            <slot name="back-to-login-link"></slot>
            <PrimaryButton :disabled="forgotPasswordForm.processing"
                >Email Password Reset Link</PrimaryButton
            >
        </div>
    </form>
</template>
