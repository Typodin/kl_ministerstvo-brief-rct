import axios from 'axios';

//const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.erp.m-catering.ru/api/v1/sales/sk/events';
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.erp.m-catering.ks01.ru/api/v1/sales/sk/events/';

const axiosInstance = axios.create({
	baseURL,
	timeout: 30000,
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		console.error('Ошибка:', error);
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.error('Ошибка:', error);
		return Promise.reject(error);
	}
);

export default axiosInstance;