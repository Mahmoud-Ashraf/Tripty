// Next.js API route for place search: pages/api/places/search.js
import { Place } from '@/interfaces/place';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { locale } = req.query;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { headers } = req;

    try {
        const response = await fetch(`${baseUrl}subscriptions/check?change_language=${locale}`, {
            headers: { 'Authorization': headers['authorization'] || '' }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        const subscription = data.data;
        res.status(200).json(subscription);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
