/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { HTTP_METHODS } from '@/consts';
import { getItemFromStorage, removeItemFromStorage } from '@/utils/storage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://matchus.site',
  timeout: 5000,
});

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  (config: AxiosRequestConfig): Promise<any> => {
    const accessToken = getItemFromStorage('accessToken');
    axiosInstance.defaults.headers.common.token = accessToken ?? '';

    _axiosInstance.interceptors.response.use((response) => {
      if (!response.data) return response;
      return response.data.data;
    });

    _axiosInstance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
      const token = getItemFromStorage('accessToken');
      if (token) {
        const expireTime: number = getItemFromStorage('expireTime');

        const nowDate = new Date().getTime();

        if (expireTime - nowDate < 0) {
          removeItemFromStorage('accessToken');
          removeItemFromStorage('expireTime');
          window.location.assign('/login');
        }
      }

      return requestConfig;
    });

    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

export default {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHODS.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};
