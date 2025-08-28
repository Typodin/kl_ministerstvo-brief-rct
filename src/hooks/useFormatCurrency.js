const useFormatCurrency = () => (value) => {
	if (typeof value !== 'number') return '';
	return new Intl.NumberFormat('ru-RU').format(value) + ' руб';
};

export default useFormatCurrency;