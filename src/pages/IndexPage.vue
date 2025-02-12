<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
const message = ref('');
onMounted(async () => {
  const response = await api.get('/hello');
  message.value = response.data.message;
});
</script>
<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <q-btn label="Crida API" @click="onMounted" />
        <p>{{ message }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>
