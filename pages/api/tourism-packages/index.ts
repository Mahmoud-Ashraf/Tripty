// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { locale } = req.query;
    try {
        const response = await fetch(baseUrl + `tourism-packages?change_language=${locale}&per_page=30`);
        if (!response.ok) {
            throw new Error('fetch tourism packages failed');
        }
        const data = await response.json();
        if (!data.data) {
            throw new Error('something went wrong');
        }
        res.status(200).json(data.data);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
