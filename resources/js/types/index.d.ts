import { Config as ZiggyConfig } from 'ziggy-js';

export interface User {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
    name?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
    ziggy: ZiggyConfig;
};
