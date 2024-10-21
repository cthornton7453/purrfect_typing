<template>
  <div class="relative flex items-center" ref="userIconRef">
    <!-- Loading Overlay -->
    <AppLoader v-if="loggingOut" message="Logging out..." />

    <!-- Authenticated User -->
    <template v-if="isAuthenticated">
      <div
        class="flex items-center cursor-pointer"
        @mouseenter="isHoveringAvatar = true"
        @mouseleave="isHoveringAvatar = false"
        @focus="isHoveringAvatar = true"
        @blur="isHoveringAvatar = false"
        tabindex="0"
        aria-haspopup="true"
        :aria-expanded="showDropdownComputed"
      >
        <!-- Icon with No Background -->
        <i class="pi pi-user text-primary mr-2"></i>
        <span class="text-text">{{ userName }}</span>
      </div>

      <Teleport to="body">
        <transition name="fade">
          <div
            v-show="showDropdownComputed"
            :style="dropdownStyle"
            class="fixed w-48 rounded-md shadow-lg bg-background text-text ring-1 ring-black ring-opacity-5 z-30"
            @mouseenter="isHoveringDropdown = true"
            @mouseleave="isHoveringDropdown = false"
            v-click-outside="handleClickOutside"
          >
            <div class="py-1">
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-primary hover:bg-secondary transition-colors duration-500"
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
        <!-- Icon with No Background -->
        <i class="pi pi-user text-primary mr-2"></i>
      </Link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AppLoader from '@/Components/AppLoader.vue'; // Import AppLoader

// Define Props
const props = defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
  userName: {
    type: String,
    required: false,
    default: '',
  },
});

const showDropdown = ref(false);
const loggingOut = ref(false);

const isHoveringAvatar = ref(false);
const isHoveringDropdown = ref(false);

const showDropdownComputed = computed(() => isHoveringAvatar.value || isHoveringDropdown.value);

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

const handleClickOutside = () => {
  isHoveringAvatar.value = false;
  isHoveringDropdown.value = false;
};

const handleLogout = () => {
  isHoveringAvatar.value = false;
  isHoveringDropdown.value = false;
  loggingOut.value = true;

  setTimeout(() => {
    router.post('/logout', {}, {
      onFinish: () => {
        loggingOut.value = false;
      },
    });
  }, 2000);
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.hover-effect {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.hover-effect:hover {
  color: secondary; 
}

.hover-effect .pi {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.hover-effect:hover .pi {
  transform: scale(1.2);
  filter: brightness(1.5);
}

.hover-effect span {
  transition: color 0.3s ease;
}

.hover-effect:hover span {
  color: secondary;
}

.hover-effect:active {
  color: tertiary; 
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

.fixed {
  position: fixed;
}
</style>
