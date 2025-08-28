import axiosInstance from './axiosInstance';

/**
 * Мероприятие
 * @param {number|string} eventId
 */
export async function getEventData(eventId) {
	const url = `/${eventId}/web/brief`;
	try {
		const response = await axiosInstance.get(url);
		return response.data;
	} catch (error) {
		console.error('Ошибка загрузки данных мероприятия:', error);
		throw error;
	}
}