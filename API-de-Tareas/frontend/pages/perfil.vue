<template>
  <div class="perfil-wrapper">
    <div class="perfil-card">
      <img
        :src="auth.user?.foto || 'https://via.placeholder.com/96'"
        alt="Foto de perfil"
        class="avatar"
      />
      <h2 class="nombre">{{ auth.user?.nombre }}</h2>
      <p class="email">{{ auth.user?.email }}</p>

      <button @click="cerrarSesion" class="boton">
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

const cerrarSesion = async () => {
  await auth.logout()
  router.push('/login')
}

onMounted(async () => {
  await auth.fetchUser()
  if (!auth.user.value) {
    router.push('/login')
  }
})
</script>

<style scoped>
.perfil-wrapper {
  min-height: 100vh;
  background-color: #eff1f3;
  color: #225a76;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.perfil-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.nombre {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.email {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #444;
}

.boton {
  padding: 0.75rem 1.2rem;
  background-color: #225a76;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.boton:hover {
  background-color: #318ead;
}
</style>
