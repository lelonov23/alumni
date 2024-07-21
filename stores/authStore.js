import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await fetch('https://api.alumni-portal.ru/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    this.user = data.user;
                    return data;
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error', error);
                throw error;
            }
        },
        logout() {
            this.user = null;
            document.cookie = 'Authorization=; Max-Age=0; path=/;';
        },
    },
});
