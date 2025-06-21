<template>
  <div class="p-4 bg-gray-100 rounded flex justify-between items-center">
    <div>
      <h2 class="text-lg font-bold">{{ tarea.titulo }}</h2>
      <p class="text-sm text-gray-600">{{ tarea.descripcion }}</p>
    </div>
    <button @click="$emit('eliminar', tarea._id)" class="text-red-600">Eliminar</button>
  </div>
</template>

<script setup>
defineProps(['tarea'])
defineEmits(['eliminar'])
</script>
