<template>
  <div class="login-wrapper">
    <form @submit.prevent="iniciarSesion" class="login-form">
      <h1 class="form-title">Iniciar Sesión</h1>

      <input v-model="usuario" placeholder="Usuario" class="input" />
      <input v-model="password" type="password" placeholder="Contraseña" class="input" />

      <button type="submit" class="boton">Iniciar Sesión</button>

      <NuxtLink to="/register" class="link">¿No tienes cuenta? Regístrate</NuxtLink>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const usuario = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuth()

const iniciarSesion = async () => {
  error.value = null
  try {
    await auth.login(usuario.value, password.value)
    router.push('/perfil')
  } catch (e) {
    error.value = e
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff1f3;
  color: #225a76;
  padding: 2rem;
}

.login-form {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.input {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.boton {
  padding: 0.75rem 1.2rem;
  background-color: #3fcef6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.boton:hover {
  background-color: #2cb9dc;
}

.link {
  font-size: 0.9rem;
  text-align: center;
  color: #225a76;
  text-decoration: underline;
  margin-top: 0.5rem;
}

.error {
  color: #e11d48;
  font-size: 0.9rem;
  text-align: center;
}
</style>
