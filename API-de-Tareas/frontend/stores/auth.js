import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }),
  actions: {
    async fetchUser() {
      try {
        const res = await $fetch('/me', { credentials: 'include' });
        this.user = res;
      } catch { this.user = null; }
    },
    async login(usuario, password) {
      await $fetch('/login', {
        method: 'POST',
        body: { usuario, password },
        credentials: 'include'
      });
      await this.fetchUser();
    },
    async logout() {
      await $fetch('/logout', { credentials: 'include' });
      this.user = null;
    },
    async register(data) {
      await $fetch('/register', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });
      await this.fetchUser();
    }
  }
});