<template>
    <div class="relative flex items-center" ref="userIconRef">
        <!-- Loading Overlay -->
        <AppLoader v-if="loggingOut" message="Logging out..." />

        <!-- Authenticated User -->
        <template v-if="isAuthenticated">
            <div
                class="flex cursor-pointer items-center"
                @mouseenter="isHoveringAvatar = true"
                @mouseleave="isHoveringAvatar = false"
                @focus="isHoveringAvatar = true"
                @blur="isHoveringAvatar = false"
                tabindex="0"
                aria-haspopup="true"
                :aria-expanded="showDropdownComputed"
            >
                <i class="pi pi-user mr-2 text-primary"></i>
                <span class="text-text">{{ userName }}</span>
            </div>

            <Teleport to="body">
                <transition name="fade">
                    <div
                        v-show="showDropdownComputed"
                        :style="dropdownStyle"
                        class="fixed z-30 w-48 rounded-md bg-background text-text shadow-lg ring-1 ring-black ring-opacity-5"
                        @mouseenter="isHoveringDropdown = true"
                        @mouseleave="isHoveringDropdown = false"
                    >
                        <div class="py-1">
                            <button
                                @click="handleLogout"
                                class="block w-full px-4 py-2 text-left text-primary transition-colors duration-500 hover:bg-secondary"
                                aria-label="Log Out"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </transition>
            </Teleport>
        </template>

        <!-- Unauthenticated - Login Icon -->
        <template v-else>
            <Link href="/login" class="hover-effect flex items-center">
                <i class="pi pi-user mr-2 text-primary"></i>
            </Link>
        </template>
    </div>
</template>

<script setup lang="ts">
import AppLoader from '@/Components/AppLoader.vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const { props } = usePage();
const isAuthenticated = props.auth.isAuthenticated;
const userName = props.auth.userName;

const showDropdown = ref(false);
const loggingOut = ref(false);

const isHoveringAvatar = ref(false);
const isHoveringDropdown = ref(false);

const showDropdownComputed = computed(
    () => isHoveringAvatar.value || isHoveringDropdown.value,
);

const userIconRef = ref<HTMLElement | null>(null);
const dropdownStyle = ref({
    top: '0px',
    left: '0px',
});

const handleResize = () => {
    if (showDropdownComputed.value && userIconRef.value) {
        calculateDropdownPosition();
    }
};

const calculateDropdownPosition = () => {
    const target = userIconRef.value;
    if (target) {
        const rect = target.getBoundingClientRect();
        dropdownStyle.value.top = `${rect.bottom + window.scrollY - 2}px`;
        dropdownStyle.value.left = `${rect.left + window.scrollX}px`;
    }
};

const handleLogout = () => {
    isHoveringAvatar.value = false;
    isHoveringDropdown.value = false;
    loggingOut.value = true;

    router.post('/logout', {}, {
        onFinish: () => {
            setTimeout(() => {
                loggingOut.value = false;
                router.visit('/', { method: 'get' });
            }, 1500);
        },
    });
};

watch(showDropdownComputed, (newVal) => {
    showDropdown.value = newVal;
    if (newVal) {
        calculateDropdownPosition();
    }
});

onMounted(() => {
    window.addEventListener('resize', handleResize);
    if (showDropdownComputed.value) {
        calculateDropdownPosition();
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Add styles if necessary */
</style>
