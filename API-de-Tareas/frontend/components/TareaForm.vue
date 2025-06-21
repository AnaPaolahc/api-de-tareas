<template>
  <form @submit.prevent="submit" class="space-y-2">
    <input
      v-model="form.titulo"
      placeholder="Título"
      class="w-full p-2 border"
    />
    <p v-if="v$.titulo.$error" class="text-red-500 text-sm">
      Título requerido (mín. 3 caracteres)
    </p>

    <textarea
      v-model="form.descripcion"
      placeholder="Descripción"
      class="w-full p-2 border"
    ></textarea>
    <p v-if="v$.descripcion.$error" class="text-red-500 text-sm">
      Descripción requerida
    </p>

    <button class="bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const emit = defineEmits(['crear'])

const form = ref({
  titulo: '',
  descripcion: '',
  completado: false
})

const rules = {
  titulo: { required, minLength: minLength(3) },
  descripcion: { required }
}

const v$ = useVuelidate(rules, form)

async function submit() {
  await v$.value.$validate()
  if (!v$.value.$error) {
    emit('crear', form.value)
    form.value = { titulo: '', descripcion: '', completado: false }
    v$.value.$reset()
  }
}
</script>
