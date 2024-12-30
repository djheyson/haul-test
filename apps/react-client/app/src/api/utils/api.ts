import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const BASE_API_URL =
  process.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

const API_BASE_URL = BASE_API_URL + '/api';
console.log('API_BASE_URL', API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  baseURL: API_BASE_URL,

  async get<T>(endpoint: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response = await axiosInstance.get(endpoint, config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `GET request failed: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw new Error('An unexpected error occurred');
    }
  },

  async post<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await axiosInstance.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `POST request failed: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw new Error('An unexpected error occurred');
    }
  },

  async put<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await axiosInstance.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `PUT request failed: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw new Error('An unexpected error occurred');
    }
  },

  async patch<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await axiosInstance.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `PATCH request failed: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw new Error('An unexpected error occurred');
    }
  },

  async delete<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await axiosInstance.delete(endpoint, config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `DELETE request failed: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw new Error('An unexpected error occurred');
    }
  },
};
