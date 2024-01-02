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
    const { locale } = req.query;
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(baseUrl + `register?change_language=${locale}`, {
            method,
            body: JSON.stringify(body),
            headers: { 'Authorization': headers['authorization'] || '', 'Content-type': 'application/json' }
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
