import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const headersObj = Object.fromEntries(
            Object.entries(req.headers) as [string, string][]
        );
        const response = await fetch(baseUrl + 'trips', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: headersObj
        });

        console.log(response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        res.status(201).json(data.data);
    } catch (error: any) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}