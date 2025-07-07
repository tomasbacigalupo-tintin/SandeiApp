import api, { API_URL } from './api';

export async function login(email: string, password: string) {
  const res = await api.post(`${API_URL}/api/auth/login`, { email, password });
  return res.data;
}

export async function register(name: string, email: string, password: string) {
  const res = await api.post(`${API_URL}/api/auth/register`, {
    name,
    email,
    password,
  });
  return res.data;
}
