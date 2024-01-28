import type { NextApiRequest, NextApiResponse } from 'next';
import { URL } from 'url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { locale, trendNow, long, lat, categoryId, text } = req.query;
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const placesReq = await fetch(`${baseUrl}places?per_page=40&change_language=${locale}${!!long ? `&long=${long}` : ''}${!!lat ? `&lat=${lat}` : ''}&category_id=${categoryId}${!!trendNow ? '&trend_now=1' : ''}${!!text ? `&text=${text}` : ''}`);
        if (!placesReq.ok) {
            throw new Error('error fetching tab places');
        }
        const places = await placesReq?.json();

        if (places.error) {
            throw new Error(places.message);
        }
        res.status(200).json({ places: places.data });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
