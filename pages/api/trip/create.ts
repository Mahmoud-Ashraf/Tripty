import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(baseUrl + 'trips', {
            method: 'POST',
            body: req.body,
            headers: {
                'Authorization': 'Bearer 25|C2HIokiAYxGSZFWCYl7IWC4ielpX9DBg4PRvMSkob2c78ec2',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        res.status(201).json(data.data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}