import axios from 'axios';

export const API_BASE_URL = 'https://notehub-public.goit.study/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
