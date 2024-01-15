// Next.js API route for place search: pages/api/places/search.js
import { Place } from '@/interfaces/place';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, locale, long, lat } = req.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { headers } = req;

    try {
        const response = await fetch(`${baseUrl}trips/${id}?change_language=${locale}`, {
            headers: { 'Authorization': headers['authorization'] || '' }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.message);
        }
        if (!data.data) {
            throw new Error('No trip found');
        }
        res.status(200).json({ trip: data.data });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
