import { boot } from 'quasar/wrappers';
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});
export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
});
export { api };
