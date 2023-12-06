// Next.js API route for place search: pages/api/places/search.js
import { Place } from '@/interfaces/place';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { locale, trendNow } = req.query;
    console.log(trendNow);
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseUrl}places?change_language=${locale}${trendNow ? '&trend_now=1' : ''}`);

        if (!response.ok) {
            throw new Error('Error Fetching Data');
        }

        const data = await response.json();
        if (data.error) {
            throw new Error('Error Fetching Data');
        }
        // Search for places based on the provided text
        const places = data.data;
        const categories: any[] = [];

        // Restructure the places based on categories
        const categorizedPlaces: any = {};
        places.forEach((place: Place) => {
            const categoryName: string = place?.category?.name;
            if (!categorizedPlaces[categoryName]) {
                categorizedPlaces[categoryName] = [];
                categories.push(place.category);
            }
            categorizedPlaces[categoryName].push(place);
        });
        categories.unshift({ name: locale === 'ar' ? 'الكل' : 'all', id: 0, icon: '' });
        categorizedPlaces[categories[0].name] = places;
        res.status(200).json({ categorizedPlaces, categories });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
