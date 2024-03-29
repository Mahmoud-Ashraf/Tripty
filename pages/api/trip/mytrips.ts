// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { locale, long, lat } = req.query;
    const { headers } = req;

    try {
        const response = await fetch(baseUrl + `trips?change_language=${locale}`, {
            headers: { 'Authorization': headers['authorization'] || '' }
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.message);
        }
        if (!data.data || data.data.length === 0) {
            throw new Error('No trips found');
        }
        res.status(200).json(data.data);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
