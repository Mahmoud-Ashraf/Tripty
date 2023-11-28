// Next.js API route for place search: pages/api/places/search.js
import { Place } from '@/interfaces/place';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { text, locale } = req.query;
    try {
        if (typeof text !== 'string') {
            throw new Error('Invalid text parameter');
        }
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(baseUrl + `places?change_language=${locale}&text=${text}`, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        // Search for places based on the provided text
        const places = data.data;
        const categories: any[] = [];

        // Restructure the places based on categories
        const categorizedPlaces: any = {};
        places.forEach((place: Place) => {
            const categoryName: string = place?.category?.name;
            // categoriesSet.add(place.category);
            if (!categorizedPlaces[categoryName]) {
                categorizedPlaces[categoryName] = [];
                categories.push(place.category);
            }
            categorizedPlaces[categoryName].push(place);
        });

        // const categories = Array.from(categoriesSet).map(category => (category));
        // Respond with the categorized places
        res.status(200).json({ categorizedPlaces, categories });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
