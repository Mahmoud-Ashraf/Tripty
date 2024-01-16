import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, headers, method } = req;
    const { locale, long, lat } = req.query;

    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(baseUrl + `trips?change_language=${locale}`, {
            method,
            body: JSON.stringify(body),
            headers: { 'Authorization': headers['authorization'] || '', 'Content-type': 'application/json' }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message);
        }
        res.status(201).json(data.data);
    } catch (error: any) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}