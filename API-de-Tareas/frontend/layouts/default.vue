<template>
  <div>
    <header class="header">
      <nav>
        <NuxtLink to="/">Inicio</NuxtLink> |
        <NuxtLink to="/perfil">Perfil</NuxtLink> |
        <button v-if="user" @click="logout">Cerrar sesión</button>
        <NuxtLink v-else to="/login">Login</NuxtLink>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>Mi app - © 2025</p>
    </footer>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const { user, logout } = useAuth()
</script>

<style scoped>
.header {
  padding: 1rem;
  background: #3FCEF6;
  color: white;
}
.footer {
  padding: 1rem;
  background: #ddd;
  text-align: center;
  margin-top: 2rem;
}
nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}
button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
