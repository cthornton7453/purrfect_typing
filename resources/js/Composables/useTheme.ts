// resources/js/Composables/useTheme.ts

import { Theme, themes } from '@/Themes/themes';
import { onMounted, ref } from 'vue';

// Define the theme state outside the function to share it globally
const currentTheme = ref<Theme>(themes[0]); // Default to light theme

export function useTheme() {
    // Initialize theme on first import
    if (!document.documentElement.hasAttribute('data-theme-initialized')) {
        onMounted(() => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                const foundTheme = themes.find(
                    (theme) => theme.name === savedTheme,
                );
                if (foundTheme) {
                    currentTheme.value = foundTheme;
                }
            } else {
                // Detect system preference
                const prefersDark = window.matchMedia(
                    '(prefers-color-scheme: dark)',
                ).matches;
                currentTheme.value = prefersDark ? themes[1] : themes[0];
            }
            // Apply the theme
            document.documentElement.setAttribute(
                'data-theme',
                currentTheme.value.name,
            );
            document.documentElement.setAttribute(
                'data-theme-initialized',
                'true',
            );
        });
    }

    // Watch for changes and apply the theme
    currentTheme.value; // Ensure reactivity

    // Function to set the theme
    function setTheme(themeName: string) {
        const selected = themes.find((theme) => theme.name === themeName);
        if (selected) {
            currentTheme.value = selected;
            localStorage.setItem('theme', themeName);
            document.documentElement.setAttribute('data-theme', selected.name);
        }
    }

    return {
        currentTheme,
        setTheme,
        themes,
    };
}
