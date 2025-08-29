export default function useTelLink() {
	return function formatTelLink(phone) {
		if (!phone) return '';
		return `tel:${phone.replace(/[^\d+]/g, '')}`;
	};
}