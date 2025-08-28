const useFormatPhone = () => (phone) => {
	if (!phone) return '';
	const cleaned = phone.replace(/\D/g, '');
	return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
};

export default useFormatPhone;