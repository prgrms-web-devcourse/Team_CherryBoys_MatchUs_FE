import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { HTTP_METHODS } from '@/consts';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.helltabus.com',
  timeout: 5000,
});

if (process.env.NODE_ENV === 'production') {
  // TODO: 배포환경에서 백엔드에서 토큰을 받는 로직에 대해서 논의 필요
}

if (process.env.NODE_ENV === 'development') {
  axiosInstance.defaults.headers.common.token = process.env.DUMMY_TOKEN ?? '';
}

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: AxiosRequestConfig): Promise<any> => {
    _axiosInstance.interceptors.response.use((response) => {
      if (!response.data) return response;
      return response.data.data;
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
