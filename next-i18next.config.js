const fetchLanguages = async () => {
    try {
        const response = await fetch('/api/langs');
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching languages:', error);
        return [];
    }
};
module.exports = {
    i18n: {
        locales: ['ar', 'en'],
        defaultLocale: 'en',
    },
};