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
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        // Convert IncomingHttpHeaders to a regular object
        const headersObj = Object.fromEntries(
            Object.entries(req.headers) as [string, string][]
        );
        const response = await fetch(baseUrl + 'register', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: headersObj
        });

        if (!response.ok) {
            throw new Error('error fetching data');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.message);
        }
        res.status(200).json(data.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
