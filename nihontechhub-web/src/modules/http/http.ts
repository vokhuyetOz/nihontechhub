import axios from 'axios';
import JsCookies from 'js-cookie';

import { COOKIE_ACCESS_TOKEN_KEY } from '../constants';
import { isServer } from '../utils';

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'x-lang': process.env.NEXT_PUBLIC_LANG ?? 'Ja',
  },
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.request.use(
  async (config) => {
    if (!isServer) {
      const token = JsCookies.get(COOKIE_ACCESS_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
