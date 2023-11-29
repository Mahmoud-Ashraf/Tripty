// Next.js API route for place search: pages/api/places/search.js
import { Place } from '@/interfaces/place';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, locale } = req.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
        // if (typeof text !== 'string') {
        //     throw new Error('Invalid text parameter');
        // }
        const response = await fetch(`${baseUrl}places/${id}?change_language=${locale}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        // Search for places based on the provided text
        const place = data.data;

        // const categories = Array.from(categoriesSet).map(category => (category));
        // Respond with the categorized places
        res.status(200).json({ place });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
