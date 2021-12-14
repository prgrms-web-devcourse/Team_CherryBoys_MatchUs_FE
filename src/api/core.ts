/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { useHistory } from 'react-router-dom';
import { HTTP_METHODS } from '@/consts';
import { getItemFromStorage, removeItemFromStorage } from '@/utils/storage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://ec2-3-34-109-111.ap-northeast-2.compute.amazonaws.com/',
  timeout: 5000,
});

if (process.env.NODE_ENV === 'production') {
  // TODO: 배포환경에서 백엔드에서 토큰을 받는 로직에 대해서 논의 필요
}

if (process.env.NODE_ENV === 'development') {
  const token = getItemFromStorage('accessToken');
  axiosInstance.defaults.headers.common.token = token || '';
}

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  (config: AxiosRequestConfig): Promise<any> => {
    _axiosInstance.interceptors.response.use((response) => {
      if (!response.data) return response;
      return response.data.data;
    });

    _axiosInstance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
      const token = getItemFromStorage('accessToken');

      if (token) {
        const expireTime: number = getItemFromStorage('expireTime');

        const nowDate = new Date().getTime();

        if (nowDate - expireTime < 0) {
          removeItemFromStorage('accessToken');
          removeItemFromStorage('expireTime');
          window.history.pushState('', '', '/login');
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
