import axios from 'axios'
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'  

export const useAuth = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase 

  const user = ref(null)
  const error = ref(null)

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  })

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/api/me')
      user.value = res.data
    } catch {
      user.value = null
    }
  }

  const login = async (usuario, password) => {
    error.value = null
    try {
      await axiosInstance.post('/api/login', { usuario, password })
      await fetchUser()
    } catch (err) {
      error.value = err.response?.data?.mensaje || 'Error al iniciar sesión'
      throw error.value
    }
  }

  const register = async ({ usuario, password, nombre, email, foto }) => {
    error.value = null
    try {
      await axiosInstance.post('/api/register', { usuario, password, nombre, email, foto })
      await fetchUser()
    } catch (err) {
      error.value = err.response?.data?.mensaje || 'Error al registrar usuario'
      throw error.value
    }
  }

  const logout = async () => {
    error.value = null
    try {
      await axiosInstance.get('/api/logout')
      user.value = null
    } catch (err) {
      error.value = err
    }
  }

  return { user, error, fetchUser, login, register, logout }
}
