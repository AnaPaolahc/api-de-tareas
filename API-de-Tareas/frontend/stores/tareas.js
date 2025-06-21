import { defineStore } from 'pinia'
import axios from 'axios'


export const useTareasStore = defineStore('tareas', {
  state: () => ({
    lista: [],
    cargando: false,
    paginaActual: 1,
    totalPaginas: 1
  }),
  actions: {
    async cargar(pagina = 1, limite = 5) {
      this.cargando = true
      try {
        const { data } = await axios.get(`http://localhost:3001/api/tareas?page=${pagina}&limit=${limite}`, {
          headers: { Authorization: 'secreto123' }
        })
        this.lista = data.tareas
        this.totalPaginas = data.pages
        this.paginaActual = data.page
      } catch (error) {
        console.error('Error al cargar tareas:', error)
      } finally {
        this.cargando = false
      }
    },
    async crear(tarea) {
      await axios.post('http://localhost:3001/api/tareas', tarea, {
        headers: { Authorization: 'secreto123' }
      })
      await this.cargar(this.paginaActual)
    },
    async eliminar(id) {
      await axios.delete(`http://localhost:3001/api/tareas/${id}`, {
        headers: { Authorization: 'secreto123' }
      })
      await this.cargar(this.paginaActual)
    }
  }
})
