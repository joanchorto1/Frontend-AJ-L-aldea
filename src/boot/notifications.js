import { boot } from 'quasar/wrappers';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export default boot(() => {
  async function registerNotifications() {
    // Solo ejecutar en dispositivos móviles
    if (!Capacitor.isNativePlatform()) {
      console.warn("Las notificaciones push solo funcionan en dispositivos móviles.");
      return;
    }

    let permStatus = await PushNotifications.requestPermissions();

    if (permStatus.receive === 'granted') {
      await PushNotifications.register();
    } else {
      console.error("Permiso de notificaciones denegado");
      return;
    }

    // Obtener el token de Firebase
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM Token:', token.value);
      sendTokenToServer(token.value);
    });

    // Manejar errores
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error al registrar notificaciones:', error);
    });

    // Escuchar notificaciones recibidas
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notificación recibida:', notification);
    });
  }

  // Enviar el token al backend
  async function sendTokenToServer(token) {
    try {
      await fetch('http://127.0.0.1:8000/api/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
    } catch (error) {
      console.error('Error enviando el token al servidor:', error);
    }
  }

  registerNotifications();
});
