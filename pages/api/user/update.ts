// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, headers, method } = req;
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(baseUrl + 'profile', {
            method,
            body: JSON.stringify(body),
            headers: { 'Authorization': headers['authorization'] || '', 'Content-type': 'application/json' }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        res.status(200).json(data.data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
