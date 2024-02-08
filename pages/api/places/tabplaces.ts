import type { NextApiRequest, NextApiResponse } from 'next';
import { URL } from 'url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { locale, trendNow, long, lat, categoryId, text, with_discounts, page, perPage } = req.query;
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        console.log(`${baseUrl}places?per_page=${!!perPage ? perPage : '40'}&change_language=${locale}${!!long ? `&long=${long}` : ''}${!!lat ? `&lat=${lat}` : ''}&category_id=${categoryId}${!!with_discounts ? '&with_discounts=1' : ''}${!!trendNow ? '&trend_now=1' : ''}${!!text ? `&text=${text}` : ''}${!!page ? `&page=${page}` : ''}`);
        const placesReq = await fetch(`${baseUrl}places?per_page=${!!perPage ? perPage : '40'}&change_language=${locale}${!!long ? `&long=${long}` : ''}${!!lat ? `&lat=${lat}` : ''}&category_id=${categoryId}${!!with_discounts ? '&with_discounts=1' : ''}${!!trendNow ? '&trend_now=1' : ''}${!!text ? `&text=${text}` : ''}${!!page ? `&page=${page}` : ''}`);
        if (!placesReq.ok) {
            throw new Error('error fetching tab places');
        }
        const places = await placesReq?.json();

        if (places.error) {
            throw new Error(places.message);
        }
        // console.log(places);
        res.status(200).json({ places: places.data, pagination: places.meta });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
