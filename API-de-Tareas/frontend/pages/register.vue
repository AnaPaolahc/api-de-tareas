<template>
  <div class="register-wrapper">
    <form @submit.prevent="registrarUsuario" class="register-form">
      <h1 class="form-title">Registro</h1>

      <input v-model="usuario" placeholder="Usuario" class="input" />
      <input v-model="password" type="password" placeholder="Contraseña" class="input" />
      <input v-model="nombre" placeholder="Nombre" class="input" />
      <input v-model="email" placeholder="Email" class="input" />

      <button type="submit" class="boton">Registrar</button>

      <NuxtLink to="/login" class="link">¿Ya tienes cuenta? Inicia sesión</NuxtLink>

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
const nombre = ref('')
const email = ref('')
const error = ref(null)

const router = useRouter()
const auth = useAuth()

const registrarUsuario = async () => {
  error.value = null
  try {
    await auth.register({
      usuario: usuario.value,
      password: password.value,
      nombre: nombre.value,
      email: email.value,
    })
    router.push('/perfil')
  } catch (e) {
    error.value = e
  }
}
</script>

<style scoped>
.register-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff1f3;
  color: #225a76;
  padding: 2rem;
}

.register-form {
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
