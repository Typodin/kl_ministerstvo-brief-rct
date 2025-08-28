const useFormatNumber = () => (value) => {
	if (typeof value !== 'number') return '';
	return new Intl.NumberFormat('ru-RU').format(value);
};

export default useFormatNumber;