// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
        const response = await fetch(baseUrl + 'languages');
        const data = await response.json();
        res.status(200).json(data.data);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
