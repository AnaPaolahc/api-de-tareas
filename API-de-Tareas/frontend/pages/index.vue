<template>
  <div class="form-container">
    <h2 class="form-title">Agregar nueva tarea</h2>
    <form @submit.prevent="enviar" class="form">
      <input v-model="titulo" type="text" placeholder="Título de la tarea" class="input" />
      <input v-model="descripcion" type="text" placeholder="Descripción" class="input" />
      <button type="submit" class="boton">Agregar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const titulo = ref('')
const descripcion = ref('')

const emit = defineEmits(['crear'])

const enviar = () => {
  if (titulo.value.trim()) {
    emit('crear', { titulo: titulo.value, descripcion: descripcion.value })
    titulo.value = ''
    descripcion.value = ''
  }
}
</script>

<style scoped>
.form-container {
  margin-top: 1rem;
}

.form-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #225a76;
}

.form {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  min-width: 200px;
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


@media (max-width: 600px) {
  .form {
    flex-direction: column;
    align-items: stretch;
  }

  .boton {
    width: 100%;
  }
}
</style>
