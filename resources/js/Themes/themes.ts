// resources/js/themes/themes.ts
export interface Theme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        [key: string]: string;
    };
}

export const lightTheme: Theme = {
    name: 'light',
    colors: {
        primary: '#4F46E5',
        secondary: '#F59E0B',
        background: '#FFFFFF',
        text: '#1F2937',
    },
};

export const darkTheme: Theme = {
    name: 'dark',
    colors: {
        primary: '#6366F1',
        secondary: '#FCD34D',
        background: '#1F2937',
        text: '#F3F4F6',
    },
};

export const themes = [lightTheme, darkTheme];
