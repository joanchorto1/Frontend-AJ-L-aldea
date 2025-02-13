<script setup>
import { ref } from 'vue';
import { api } from 'boot/axios';

const message = ref('');

const sendNotification = async () => {
  try {
    const response = await api.get('/send-notification');
    message.value = response.data.message;
  } catch (error) {
    message.value = 'Error al enviar la notificación';
    console.error(error);
  }
};
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md">
      <q-card-section>
        <q-btn label="Enviar Notificación" color="primary" @click="sendNotification" />
        <p class="q-mt-md">{{ message }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>
